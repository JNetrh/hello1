import gql from 'graphql-tag';

export const USER_BY_ID = gql`
  query greeting($id: ID!) {
    greeting(id: $id) {
      id
      name
      email
    }
  }
`;
