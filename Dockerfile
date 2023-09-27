FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 80
ENTRYPOINT PORT=80 npm start
