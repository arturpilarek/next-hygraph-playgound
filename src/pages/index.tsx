import { gql } from '@apollo/client'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import client from '../../lib/apolloClient'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  streamDemos: any
}

export default function Home({ streamDemos} : Props) {

  console.log(streamDemos);

  return (
    <div>
    <Head>
      <title>Hygraph playground</title>
      <meta name="description" content="Hygraph playground" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="flex flex-col items-center min-h-screen p-24">
      <h1 className="pb-6 text-6xl font-bold">Hello World</h1>
      <div>
        <h3>List of podcasts</h3>
        <ul> 
          {streamDemos.map((streamDemo: any) => (
            <li key={streamDemo.id}>
              <Link href={`streams/${streamDemo.slug}`}><h4>{streamDemo.title}</h4></Link>
            </li>
              ))}
          </ul>
      </div>
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
    slug
  }
}
    `,
  });

  const { streamDemos } = hygraphData;

  return {
    props: {
      streamDemos,
    },
 };
}