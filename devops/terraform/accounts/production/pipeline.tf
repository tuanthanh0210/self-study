#module "pipelinebase" {
#  source = "../../modules/pipelinebase"
#
#  project = local.project
#  env     = local.env
#}
#
#
#module "codepipeline" {
#  for_each = { for github in local.github_repos : github["name"] => github }
#
#  source = "../../modules/pipeline-api"
#
#  project                = local.project
#  env                    = local.env
#  codebuild_image        = local.codebuild_image
#  codebuild_compute_type = local.codebuild_compute_type
#  bucketName             = module.pipelinebase.s3_bucket
#  codepipelineRoleArn    = module.pipelinebase.codepipeline_role_arn
#  gitBranch              = each.value.branch
#  gitRepo                = each.value.name
#  organization           = each.value.organization
#  codebuildRoleArn       = module.pipelinebase.codebuild_role_arn
#  codedeployRoleArn      = module.pipelinebase.codedeploy_role_arn
#  lambda_endpoint        = module.pipelinebase.lambda_endpoint
#  lambda_secret          = module.pipelinebase.secret_key
#  buildspec_file         = "./buildspec/${each.value.name}.tftpl"
#  services               = try(each.value.services, [])
#  buildspec_variables    = each.value.buildspec_variables
#}
