locals {
  ecs_service = [
    {
      name                          = "api"
      auto_scaling_target_value_cpu = 70
      auto_scaling_target_value_ram = 80
      container_port                = 3000
      command                       = []
      subnet_ids                    = module.vpc.private_subnets
      desired_count                 = 1
      max_containers                = 5
      min_containers                = 1
      task_cpu                      = 1024
      task_ram                      = 2048
      use_load_balancer             = true
      domain                        = "api.nft.sunloft.io"
      priority                      = "1"
      healthcheck_path              = "/"
    },
    {
      name                          = "crawler"
      auto_scaling_target_value_cpu = 100
      auto_scaling_target_value_ram = 100
      command                       = ["node","dist/console.js","crawl-nft-contract"],
      subnet_ids                    = module.vpc.public_subnets
      desired_count                 = 1
      max_containers                = 1
      min_containers                = 1
      task_cpu                      = 512
      task_ram                      = 1024
      use_load_balancer             = false
    },
    {
      name                          = "crawler-meta-data"
      container_name                = "api"
      auto_scaling_target_value_cpu = 100
      auto_scaling_target_value_ram = 100
      command                       = ["node","dist/console.js","crawl-nft-metadata"],
      subnet_ids                     = module.vpc.public_subnets
      desired_count                 = 1
      max_containers                = 1
      min_containers                = 1
      task_cpu                      = 256
      task_ram                      = 512
      use_load_balancer             = false
    }

  ]
}

module "ecr"{
  source = "../../modules/ecr"
  for_each = toset(local.ecr)
  env     = local.env
  project = local.project
  service = each.key
}

module "ecs_base" {
  source  = "../../modules/ecs-base"
  env     = local.env
  project = local.project
  vpc_id  = module.vpc.vpc_id
}


module "ecs" {
  source                        = "../../modules/ecs"
  for_each                      = { for service in local.ecs_service : service["name"] => service }
  container_name                = try(each.value.container_name,null)
  account_id                    = local.accountid
  vpc_id                        = module.vpc.vpc_id
  env                           = local.env
  subnet_ids                    = each.value.subnet_ids
  project                       = local.project
  region                        = local.region
  assign_public_ip              = true
  auto_scaling_target_value_cpu = try(each.value.auto_scaling_target_value_cpu, 100)
  auto_scaling_target_value_ram = try(each.value.auto_scaling_target_value_ram, 100)
  command                       = each.value.command
  container_port                = try(each.value.container_port, 80)
  desired_count                 = each.value.desired_count
  ecs_cluster_id                = module.ecs_base.ecs_cluster_id
  ecs_cluster_name              = module.ecs_base.ecs_cluster_name
  use_load_balancer             = each.value.use_load_balancer
  max_containers                = each.value.max_containers
  min_containers                = each.value.min_containers
  name                          = each.key
  role_auto_scaling             = module.ecs_base.role_auto_scaling
  role_ecs_service              = module.ecs_base.role_ecs_service
  role_execution                = module.ecs_base.role_execution
  sg_ecs_task                   = module.ecs_base.sg_ecs_task
  sg_lb                         = try(module.loadbalancer.security_group_load_balancer, null)
  task_cpu                      = each.value.task_cpu
  task_ram                      = each.value.task_ram
  domain                        = try(each.value.domain, null)
  listener_arn                  = try(module.loadbalancer.listener_arn, null)
  priority                      = try(each.value.priority, null)
  healthcheck_path              = try(each.value.healthcheck_path, null)
}