
FROM node:slim AS dependencies
# RUN apt-get update && apt-get install -y libc6
WORKDIR /fecoder
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install pnpm -g
RUN pnpm i 

FROM node:slim AS builder
RUN apt update
RUN apt install openssl -y
WORKDIR /fecoder
COPY --from=dependencies /fecoder/node_modules ./node_modules
COPY . .
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install pnpm -g
RUN pnpm generate
RUN pnpm build 


FROM node:slim AS runner
RUN apt update
RUN apt install openssl -y
WORKDIR /fecoder
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=builder /fecoder/public ./standalone/public
COPY --from=builder /fecoder/.next/standalone ./standalone
COPY --from=builder /fecoder/.next/static ./standalone/.next/static
RUN ls ./standalone/node_modules
EXPOSE 3000
ENV PORT 3000
# ENV HOSTNAME "0.0.0.0"
CMD node ./standalone/server.js



