FROM node:18.16.0-alpine3.18 as builder
WORKDIR /app

# set timezone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# install system dependencies
RUN apk add --no-cache make gcc g++ python3 git

COPY package.json tsconfig.json tsconfig.base.json .env .env.example package-lock.json yarn.lock jest.config.ts jest.preset.js .npmrc .yarnrc nx.json .env env.mjs ./
RUN yarn global add nx@14.8.6
RUN yarn install --check-files --frozen-lockfile && yarn cache clean

# copy source files
COPY libs/  ./libs/
COPY scripts/  ./scripts/
COPY apps/ ./apps/

# build
RUN yarn build backend

FROM node:18.16.0-alpine3.18
WORKDIR /app
ENV NODE_ENV=production

# set timezone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# copy build
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/config /app/config
COPY --from=builder /app/dist/apps/backend /app/
# COPY --from=builder /app/licenses.txt /app/licenses.txt

# copy aux files
COPY package.json ./
# COPY certs/  ./build/certs/

# Setup version env vars
ARG GIT_COMMIT
ARG GIT_VERSION
ENV GIT_COMMIT=$GIT_COMMIT
ENV GIT_VERSION=$GIT_VERSION

# change user
# USER node

# expose ports
EXPOSE 8080
EXPOSE 8040
CMD ["node", "main.js"]
