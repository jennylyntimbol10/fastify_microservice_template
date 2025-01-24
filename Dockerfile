FROM node:18.14.0-alpine3.17 as builder

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node package*.json ./
COPY --chown=node . .

RUN ["/bin/sh", "-c", "npm install && npm run build && ls -lrt"]



FROM node:18.14.0-alpine3.17
ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

RUN ["/bin/sh", "-c", "npm -g install npm@latest"]

USER node
RUN mkdir -p /home/node/app && \
    mkdir -p /home/node/app/dist && \
    mkdir -p /home/node/app/config
WORKDIR /home/node/app

COPY --from=builder --chown=node /home/node/app/package*.json ./
COPY --from=builder --chown=node  /home/node/app/dist/ ./dist/
COPY --chown=node --from=builder /home/node/app/config ./config/

RUN ["/bin/sh", "-c", "npm ci"]

EXPOSE 3000
CMD [ "node", "dist/server.js" ]