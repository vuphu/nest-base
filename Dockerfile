FROM node:26-alpine AS builder
ENV NODE_ENV=build

RUN npm install -g pnpm

USER node
WORKDIR /home/node

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY --chown=node:node . .
RUN pnpm run build
RUN pnpm prune --prod

FROM node:26-alpine
ENV NODE_ENV=production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/dist ./dist
COPY --from=builder --chown=node:node /home/node/node_modules ./node_modules
COPY --from=builder --chown=node:node /home/node/package.json ./package.json
EXPOSE 3000

CMD ["node", "dist/main.js"]
