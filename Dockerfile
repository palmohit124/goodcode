# Based on openresty/openresty:xenial
FROM toolsnexus.marchex.com:5000/marchex/openresty:latest

## Copy our nginx config
COPY nginx/default.nginx /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy our built angular artifacts from dist folder to nginx public folder
COPY dist /usr/share/nginx/html
