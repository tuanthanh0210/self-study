module "s3_admin" {
  source = "../../modules/s3-cloudfront"

  project     = local.project
  env         = local.env
  domain      = local.admin_domain
  cf_cert_arn = local.acm_cloufront_arn
  name        = "admin"
}
module "s3_statics" {
  source = "../../modules/s3-cloudfront"

  project     = local.project
  env         = local.env
  domain      = local.static_domain
  cf_cert_arn = local.acm_cloufront_arn
  name        = "static"
}