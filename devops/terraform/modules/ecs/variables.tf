variable "project" {
  type        = string
  description = "Project name"
}

variable "env" {
  type        = string
  description = "Environment name"
}

variable "region" {
  type        = string
  description = "Region"
}

variable "account_id" {
  type = string
}

variable "name" {
  type = string
}

variable "container_port" {
  type    = number
  default = 80
}

variable "desired_count" {
  type = string
}

variable "task_cpu" {
  type = string
}

variable "task_ram" {
  type = string
}

variable "min_containers" {
  type = string
}

variable "max_containers" {
  type = string
}

variable "auto_scaling_target_value_cpu" {
  type = string
}

variable "auto_scaling_target_value_ram" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(any)
}

variable "sg_ecs_task" {
  type = string
}

variable "sg_lb" {
  type = string
}

variable "role_auto_scaling" {
  type = string
}

variable "role_execution" {
  type = string
}

variable "role_ecs_service" {
  type = string
}

variable "ecs_cluster_id" {
  type = string
}

variable "ecs_cluster_name" {
  type = string
}
variable "command" {}
variable "assign_public_ip" {}
variable "use_load_balancer" {}
variable "listener_arn" {
  default = null
}
variable "priority" {
  default = null
}
variable "domain" {
  default = null
}
variable "healthcheck_path" {
  default = null
}
variable "container_name" {
  default = null
}