FROM node:20-alpine AS build

WORKDIR /cms

COPY package*.json ./
RUN npm install

COPY . .
ARG NODE_BUILD_OPTIONS="--max-old-space-size=3072"
RUN NODE_OPTIONS="${NODE_BUILD_OPTIONS}" npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]



