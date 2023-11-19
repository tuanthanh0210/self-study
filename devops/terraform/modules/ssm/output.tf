output "ssm_parameter_names" {
  value = {
    for service_name, ssm_parameter in aws_ssm_parameter.ssm : service_name => ssm_parameter.name
  }
}