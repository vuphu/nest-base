FROM node:22-alpine as builder
ENV NODE_ENV build
RUN apk add g++ make python3
USER node
WORKDIR /home/node
COPY --chown=node:node package*.json ./
RUN npm i
COPY --chown=node:node . .
RUN npm run build

FROM node:22-alpine
ENV NODE_ENV production
USER node
WORKDIR /home/node
COPY --from=builder --chown=node:node /home/node/ /home/node/
EXPOSE 5000

CMD ["node", "dist/main.js"]
