# Base image with dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Set timezone and install system dependencies
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    apk add --no-cache make gcc g++ python3 git libc6-compat

# Copy configs and install dependencies
COPY package.json tsconfig.json tsconfig.base.json .env jest.config.ts jest.preset.js .npmrc nx.json env.mjs yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --frozen-lockfile

# Builder stage
FROM deps AS builder
COPY . .
RUN yarn nx build agent

# Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

# Environment settings
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

# Add user for security and install system dependencies
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    apk add --no-cache make gcc g++ python3 git libc6-compat

# Copy built app and dependencies
COPY .env .
COPY --from=builder /app/dist/apps/agent /app/
COPY --from=deps /app/node_modules ./node_modules

# Use the created user
USER nextjs

EXPOSE 3000
CMD ["yarn", "start"]
