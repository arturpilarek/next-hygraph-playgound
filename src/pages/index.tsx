import { gql } from '@apollo/client'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import client from '../../lib/apolloClient'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  hygraphData: any
}

export default function Home({ hygraphData} : Props) {

  console.log(hygraphData);

  return (
    <div>
    <Head>
      <title>Hygraph playground</title>
      <meta name="description" content="Hygraph playground" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-6xl font-bold">Hello World</h1>
    </main>
    </div>
  )
}

export async function getStaticProps() {
  const { data: hygraphData } = await client.query({
    query: gql`
query MyQuery {
  streamDemos {
    id
    title
    publishedAt
    guestName
    coverImage {
      id
    }
    description {
      raw
    }
  }
}
    `,
  });

  console.log(hygraphData);

  return {
    props: {
      hygraphData,
    },
 };
}