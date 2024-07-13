FROM --platform=linux/amd64 node:22-alpine

WORKDIR /app

COPY . /app

RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile
RUN pnpm run build

EXPOSE 80

CMD [ "pnpm", "run", "start:prod"]
