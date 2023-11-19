resource "aws_ecr_repository" "ecr_repo" {
  name = format("%s-%s-%s",var.env,var.project,var.service)
}