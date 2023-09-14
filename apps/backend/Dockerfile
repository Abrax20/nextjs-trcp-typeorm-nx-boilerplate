# Base image with dependencies
FROM node:18.16.0-alpine3.18 AS deps
WORKDIR /app

# Set timezone and install system dependencies
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    apk add --no-cache make gcc g++ python3 git

# Copy configs and install dependencies
COPY package.json tsconfig.json tsconfig.base.json .env jest.config.ts jest.preset.js .npmrc nx.json env.mjs yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --frozen-lockfile

# Builder stage
FROM deps AS builder
COPY . .
RUN yarn build backend

# Runner stage
FROM node:18.16.0-alpine3.18 AS runner
WORKDIR /app

# Environment settings
ENV NODE_ENV=production
ENV TZ=Europe/Berlin

# Set timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copy built files and dependencies
COPY --from=builder /app/dist/apps/backend /app/
COPY --from=deps /app/node_modules ./node_modules

# Expose ports
EXPOSE 8080 8040

CMD ["node", "main.js"]
