# Go AI: one small container. The database lives on the /data volume; back it up with `npm run backup`.
FROM node:24-alpine
RUN apk add --no-cache tzdata && mkdir -p /data && chown node:node /data
WORKDIR /app
COPY package.json ./
COPY server ./server
COPY app ./app
ENV NODE_ENV=production PORT=3500 DB=/data/goai.db TZ=Asia/Kuala_Lumpur
VOLUME /data
EXPOSE 3500
USER node
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3500/api/health || exit 1
CMD ["node", "server/server.js"]
