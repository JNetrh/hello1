import '../styles/globals.css';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../utils/apollo-client';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default withData(MyApp);

// https://www.prisma.io/blog/how-to-use-create-react-app-with-graphql-apollo-62e574617cff
// https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-mysql
// https://nextjs.org/docs/basic-features/typescript
// https://medium.com/@selvaganesh93/setup-next-js-with-typescript-integration-dece94e43cf5
