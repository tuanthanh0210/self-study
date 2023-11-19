
module "loadbalancer" {
  source = "../../modules/load_balancer"

  dns_cert_arn      = local.acm_alb_arn
  env               = local.env
  project           = local.project
  public_subnet_ids = module.vpc.public_subnets
  vpc_id            = module.vpc.vpc_id
}