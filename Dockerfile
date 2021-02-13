FROM node:14 AS builder



COPY . /srv
WORKDIR /srv/backend
RUN yarn
RUN yarn build

# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate

RUN cp -r --parents src/modules/**/*.graphql build
RUN mkdir app
RUN ls -la
WORKDIR /srv
RUN ls -la
COPY ./backend/prisma ./backend/app
WORKDIR /srv/backend
RUN cp package.json yarn.lock app/ \
  && cd app \
  && NODE_ENV=production yarn \
  && npx prisma generate




# COPY package.json yarn.lock ./
# COPY prisma ./prisma/
# COPY prisma ./prisma/app
# COPY prisma ./
# ENV NODE_ENV development
# RUN ls -la
# RUN yarn
# COPY . .
# Generate prisma client, leave out if generating in `postinstall` script
# RUN npx prisma generate
# RUN ls -la
# RUN pwd

# RUN cp -r --parents src/modules/**/*.graphql build
# RUN mkdir app \
#   && cp package.json yarn.lock app/ \
#   && cd app \
#   && NODE_ENV=production yarn

# RUN yarn build


# Create app directory
# WORKDIR /srv/api

# RUN mkdir app
# COPY package*.json ./
# COPY prisma ./prisma/
# COPY prisma ./prisma/app

# RUN pwd
# RUN ls -la

# ENV NODE_ENV development
# RUN yarn

# COPY backend .
# RUN ls -la


# RUN yarn prettier:diff
# RUN yarn lint --max-warnings=0
# RUN yarn build
# RUN cp -r --parents src/modules/**/*.graphql build
# RUN cp package.json yarn.lock app/ \
#   cd app \
#   && NODE_ENV=production yarn

# COPY . .

# RUN yarn build

FROM node:14

ENV NODE_ENV production
WORKDIR /srv


COPY --from=builder /srv/backend/build .
COPY --from=builder /srv/backend/app .

# COPY --from=builder /srv/backend/build .
# COPY --from=builder /srv/backend/ .
# COPY --from=builder /srv/backend .
# COPY --from=builder /srv/backend/app .
# RUN mv src .

EXPOSE 4000
CMD [ "yarn", "start" ]
