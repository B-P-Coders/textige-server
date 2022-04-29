FROM node:16.14.0
ADD . /textige
WORKDIR /textige
RUN corepack enable
RUN yarn install
CMD ["yarn", "start"]