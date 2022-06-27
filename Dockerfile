FROM node:16 AS node

FROM node AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx tsc --project .

FROM node
WORKDIR /app

COPY package*.json /app/
#COPY --from=builder /app/dist /app/dist
#COPY --from=builder /app/index.js /app/index.js
COPY --from=builder /app/ /app/
RUN npm ci --only=production
RUN mkdir -p /app/data
ENV LINE_ACCESS_TOKEN=""
ENV LINE_CHANNEL_SECRET=""
EXPOSE 5000/tcp

CMD [ "npm", "run","start" ]