variable "project" {
  type        = string
  description = "Project name"
}

variable "env" {
  type        = string
  description = "Environment name"
}

variable "redis_type" {
  type = string
}

variable "redis_engine_version" {
  type = string
}

variable "redis_number_of_nodes" {
  type = string
}

variable "redis_port" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(any)
}
variable "security_group_ids" {}