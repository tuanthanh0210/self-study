FROM node:18.18.2 as builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx as runner
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /app/nginx-default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80