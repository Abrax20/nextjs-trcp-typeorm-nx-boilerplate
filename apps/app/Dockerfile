FROM node:18-alpine AS deps
WORKDIR /app

# set timezone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# install system dependencies
RUN apk add --no-cache make gcc g++ python3 git libc6-compat

COPY package.json tsconfig.json tsconfig.base.json .env env.mjs .env.example package-lock.json yarn.lock jest.config.ts jest.preset.js .npmrc .yarnrc nx.json ./

RUN yarn global add nx@16.3.2
RUN yarn install --check-files --frozen-lockfile && yarn cache clean

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache make gcc g++ python3 git libc6-compat

RUN npm install -g nx@16.3.2
RUN nx build app

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apk add --no-cache make gcc g++ python3 git libc6-compat

COPY .env .
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
