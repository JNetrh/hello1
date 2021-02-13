import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import { USER_BY_ID } from '../graphql/user.graphql';

export default function Home() {
  const { data, loading, error } = useQuery(USER_BY_ID, { variables: { id: 1 } });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  console.log(data);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{data.greeting?.name ?? 'No user found with given id'}</h1>
    </div>
  );
}
