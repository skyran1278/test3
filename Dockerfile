FROM node:22-alpine

COPY . /app
WORKDIR /app/

RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile
RUN pnpm run build

EXPOSE 80

CMD [ "pnpm", "run", "start:prod"]
