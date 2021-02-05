import path from 'path';

import { gql } from 'apollo-server-express';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.resolve(__dirname, './modules/**/*.graphql'), {
  recursive: true,
});

const common = gql`
  scalar Date
`;

const typeDefs = mergeTypes([common, ...typesArray], { all: true });

export default typeDefs;
