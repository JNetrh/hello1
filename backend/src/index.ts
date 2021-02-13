import 'core-js/stable';
import './env';

import http from 'http';

import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../common/consts';

import DummyGreetingDataSource from './dataSources/greetingDataSource';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { Context } from './types';

const isProduction = process.env.NODE_ENV === 'production';

const skipAuth =
  process.env.SKIP_AUTH === 'true' || (!isProduction && process.env.SKIP_AUTH !== 'false');

const greetingDataSource = new DummyGreetingDataSource();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    const dataSources: Context['dataSources'] = {
      greeting: greetingDataSource,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return dataSources as any;
  },
  context: ({ connection }) => {
    if (connection) {
      return {
        ...connection.context,
      };
    }

    return {};
  },
  playground: process.env.PLAYGROUND === 'true',
  introspection: process.env.PLAYGROUND === 'true',
});

const app = express();

app.disable('x-powered-by');
app.use(cors());

app.use((req, res, next) => {
  if (skipAuth) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const accessToken = authorization.split(' ')[1];

  try {
    jwt.verify(accessToken, JWT_SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).end();
  }
});

const httpServer = http.createServer(app);

apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(4000, () => console.log('\n🚀 API listening on port 4000'));
