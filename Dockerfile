# build Angular app
FROM node:20-alpine AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build --configuration=production

# serve app w/ Nginx
FROM nginx:alpine

# remove default Nginx static folder
RUN rm -rf /usr/share/nginx/html/*

# copy built Angular app to Nginx static folder
COPY --from=build /app/dist/medstore-frontend/browser /usr/share/nginx/html

# copy custom nginx config (good practice)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]