resource "aws_codebuild_project" "codebuild" {
  name         = "${var.env}-${var.project}-${var.gitRepo}"
  service_role = var.codebuildRoleArn

  artifacts {
    type = "CODEPIPELINE"
  }
  logs_config {
    cloudwatch_logs {
      group_name = aws_cloudwatch_log_group.codebuild_loggroup.name
    }
  }
  environment {
    compute_type    = var.codebuild_image
    image           = var.codebuild_compute_type
    privileged_mode = true
    type            = "LINUX_CONTAINER"
    dynamic "environment_variable"{

      for_each = var.buildspec_variables
      content {
        name = environment_variable.value.key
        value = environment_variable.value.value
        type = try(environment_variable.value.type,"PLAINTEXT")
      }
    }
  }
  source {
    type      = "CODEPIPELINE"
    buildspec = templatefile("${var.buildspec_file}", {})
  }
}

resource "aws_cloudwatch_log_group" "codebuild_loggroup" {
  name = "${var.env}-${var.project}-${var.gitRepo}"
  retention_in_days = 14
}

resource "aws_codepipeline" "codepipeline" {
  name     = "${var.env}-${var.project}-${var.gitRepo}"
  role_arn = var.codepipelineRoleArn

  artifact_store {
    location = var.bucketName
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "S3"
      version          = "1"
      output_artifacts = ["Source_Artifacts"]

      configuration = {
        S3Bucket    = var.bucketName
        S3ObjectKey = format("%s/%s/%s/metadata.zip", var.organization, var.gitRepo, var.gitBranch)
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["Source_Artifacts"]
      output_artifacts = ["Build_Artifacts"]
      version          = "1"

      configuration = {
        ProjectName = aws_codebuild_project.codebuild.name
      }
    }
  }

  dynamic "stage" {
    for_each = length(var.services) > 0 ? ["1"] : []
    content {
      name = "Deploy"
      dynamic "action" {
        for_each = var.services
        content {
          name            = "Deploy-${action.value}"
          category        = "Deploy"
          owner           = "AWS"
          provider        = "ECS"
          input_artifacts = ["Build_Artifacts"]
          version         = "1"
          configuration = {
            DeploymentTimeout = "20"
            ClusterName       = "${var.env}-${var.project}"
            ServiceName       = "${var.env}-${var.project}-${action.value}"
            FileName          = "artifact.json"
          }
        }
      }
    }
  }
}

## Wire the CodePipeline webhook into a GitHub repository.
resource "github_repository_webhook" "bar" {
  repository = var.gitRepo

  configuration {
    url          = var.lambda_endpoint
    content_type = "json"
    insecure_ssl = false
    secret       = var.lambda_secret
  }

  events = ["push"]
}
