resource "aws_ssm_parameter" "ssm" {
  for_each = var.source_services
  name     = "/${var.env}/${var.project}/${each.key}/env"
  type     = "SecureString"
  value    = "env"
  tier     = "Advanced"
  tags = {
    environment = "${var.env}"
  }
  lifecycle {
    ignore_changes = [value]
  }
}

