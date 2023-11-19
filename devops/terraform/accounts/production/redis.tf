module "redis" {
  source = "../../modules/redis"
  env    = local.env
  project = local.project
  redis_engine_version = "6.2"
  redis_number_of_nodes = 1
  redis_port = 6379
  redis_type = "cache.t4g.small"
  security_group_ids = ["${module.ecs_base.sg_ecs_task}"]
  subnet_ids = module.vpc.public_subnets
  vpc_id = module.vpc.vpc_id
}