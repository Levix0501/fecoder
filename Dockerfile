
FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node:16.17.1-nslt-8.6 AS dependencies
# RUN apt-get update && apt-get install -y libc6
WORKDIR /fecoder
COPY ./fecoder/package.json ./
COPY ./fecoder/pnpm-lock.yaml ./
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install pnpm -g

RUN pnpm i 


FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node:16.17.1-nslt-8.6 AS builder
WORKDIR /fecoder
COPY --from=dependencies /fecoder/node_modules ./node_modules
COPY ./fecoder .
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install pnpm -g
RUN pnpm build 


FROM anolis-registry.cn-zhangjiakou.cr.aliyuncs.com/openanolis/node:16.17.1-nslt-8.6 AS runner
WORKDIR /fecoder
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=builder /fecoder/public ./standalone/public
COPY --from=builder /fecoder/.next/standalone ./standalone
COPY --from=builder /fecoder/.next/static ./standalone/.next/static
RUN ls ./standalone/node_modules
EXPOSE 3000
ENV PORT 3000
CMD node ./standalone/server.js



