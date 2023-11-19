resource "aws_elasticache_parameter_group" "cache_parameter_group" {
  name   = "${var.env}-${var.project}"
  family = "redis6.x"
}

resource "aws_elasticache_subnet_group" "cache_subnet_group" {
  name       = "${var.env}-${var.project}"
  subnet_ids = var.subnet_ids
}

resource "aws_elasticache_cluster" "example" {
  cluster_id           = "${var.env}-${var.project}"
  engine               = "redis"
  node_type            = var.redis_type
  engine_version       = var.redis_engine_version
  port                 = var.redis_port
  num_cache_nodes      = var.redis_number_of_nodes
  parameter_group_name = aws_elasticache_parameter_group.cache_parameter_group.name
  subnet_group_name    = aws_elasticache_subnet_group.cache_subnet_group.name
  security_group_ids   = var.security_group_ids
}