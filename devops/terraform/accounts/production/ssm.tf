#resource "aws_ssm_parameter" "github_token" {
#  name  = "GITHUB_TOKEN"
#  type  = "SecureString"
#  value = data.sops_file.secrets.data["github_token"]
#}
resource "aws_secretsmanager_secret" "rds_credentail" {
  name = format("%s-%s-rds-credentail",local.env,local.project)

}
resource "aws_secretsmanager_secret_version" "this" {
  secret_id     = aws_secretsmanager_secret.rds_credentail.id
  secret_string = jsonencode(data.sops_file.secrets.data)
}