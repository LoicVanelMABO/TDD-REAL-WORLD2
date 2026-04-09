FROM node:20-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
