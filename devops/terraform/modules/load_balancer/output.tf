output "load_balancer_dns_name" {
  value = aws_lb.lb.dns_name
}

output "load_balancer_zone_id" {
  value = aws_lb.lb.zone_id
}

output "security_group_load_balancer" {
  value = aws_security_group.sg_lb.id
}

output "listener_arn" {
  value = aws_lb_listener.lb_listener_https.arn
}