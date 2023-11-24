FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS prod-stage
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/app/
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]