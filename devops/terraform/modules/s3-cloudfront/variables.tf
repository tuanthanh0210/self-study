variable "project" {
  type        = string
  description = "Project name"
}

variable "env" {
  type        = string
  description = "Environment name"
}

variable "cf_cert_arn" {
  type = string
}

variable "domain" {
  type = string
}
variable "name" {
  description = "module_name"
}
