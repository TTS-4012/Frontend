FROM node:lts-slim as build
WORKDIR /app

COPY package* .
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.25
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
