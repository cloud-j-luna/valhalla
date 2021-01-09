FROM node:alpine AS valhalla-build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=valhalla-build /app/dist/valhalla /usr/share/nginx/html
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'