FROM node:16-alpine AS deps

WORKDIR /usr/src/web
COPY package.json package-lock.json ./
RUN apk add --no-cache libc6-compat && \
    npm ci


FROM node:16-alpine AS builder

WORKDIR /usr/src/web
COPY . ./
COPY --from=deps /usr/src/web/node_modules ./node_modules
RUN npm run build


FROM node:16-alpine AS runner

WORKDIR /usr/src/web
ENV NODE_ENV=development
COPY --from=builder /usr/src/web/build ./build
COPY --from=builder /usr/src/web/node_modules ./node_modules
CMD ./node_modules/.bin/serve -s build