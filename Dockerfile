FROM node:16 AS node

FROM node AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx tsc --project .

FROM node
WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/dist /app/dist
RUN npm ci --only=production



RUN mkdir -p /app/data
ENV LINE_ACCESS_TOKEN=""
ENV LINE_CHANNEL_SECRET=""

CMD [ "npm", "run","start" ]