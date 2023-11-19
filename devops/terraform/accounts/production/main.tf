module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "4.0.2"
  name = format("%s-%s", local.project, local.env)
  cidr = local.vpc.vpc_cidr

  azs             = local.vpc.azs
  private_subnets = local.vpc.private_subnets
  public_subnets  = local.vpc.public_subnets

  enable_nat_gateway = local.vpc.enable_nat_gateway
}
