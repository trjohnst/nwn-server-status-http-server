FROM node:12.13.0-alpine as builder

COPY ./app /app
WORKDIR /app/src
RUN npm install
RUN npm run build

FROM node:12.13.0-alpine as server

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

WORKDIR /app
RUN npm install --only=production

USER node
EXPOSE 8080
CMD ["npm", "start", "--", "--max-memory-restart", "300M"]