FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production
COPY . .
RUN mkdir -p /app/data
ENV LINE_ACCESS_TOKEN=""
ENV LINE_CHANNEL_SECRET=""

CMD [ "npm", "run","start" ]