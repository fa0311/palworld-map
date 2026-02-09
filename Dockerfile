FROM node:22-alpine                                                                                                                                                                         
                                                                                                                                           
ENV PNPM_HOME=/usr/local/share/pnpm                                                                                                                                                         
ENV PATH=$PNPM_HOME:$PATH                                                                                                                                                                   

RUN apk add --no-cache git

WORKDIR /app

RUN git clone https://github.com/fa0311/palworld-map.git . 
RUN npm install -g pnpm
RUN pnpm install \
 && pnpm run build

EXPOSE 3000
ENTRYPOINT ["pnpm", "run", "start"]
