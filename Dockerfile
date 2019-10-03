FROM node:8.9.4

WORKDIR /usr/src/list2json

COPY . .

RUN npm link

CMD [ "l2j"]