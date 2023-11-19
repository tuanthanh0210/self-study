module "rds" {
  source = "terraform-aws-modules/rds/aws"
  version = "5.9.0"
  identifier = "${local.env}-${local.project}"
  engine               = "postgres"
  engine_version       = "14"
  family               = "postgres14"
  major_engine_version = "14"
  instance_class       = "db.t4g.small"

  allocated_storage     = 20
  storage_type = "gp3"

  max_allocated_storage = 100

  create_random_password = false

  db_name  = "nftmarathon"
  username = data.sops_file.secrets.data["rds_user"]
  password = data.sops_file.secrets.data["rds_password"]
  port     = 5432

  multi_az = false
  # db_subnet_group_name   = module.vpc.database_subnet_group
  # DB subnet group
  create_db_subnet_group = true
  subnet_ids             = module.vpc.public_subnets
  vpc_security_group_ids = [module.ecs_base.sg_ecs_task]

  backup_retention_period         = "30"
#  enabled_cloudwatch_logs_exports = ["general"]
#  create_cloudwatch_log_group     = true

  skip_final_snapshot = true
#  final_snapshot_identifier = "${local.env}-${local.project}-${formatdate("YYYYMMDDhhmmss", timestamp())}"
  deletion_protection = false

  performance_insights_enabled          = true
  performance_insights_retention_period = 7
  monitoring_role_name   = "${local.env}-${local.project}-rds-monitoring"
  create_monitoring_role = true
  monitoring_interval    = 60

}