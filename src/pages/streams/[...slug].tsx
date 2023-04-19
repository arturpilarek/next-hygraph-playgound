import { gql } from '@apollo/client';
import React from 'react';
import client from '../../../lib/apolloClient';

export default function StreamPage({ streamDemo} : {streamDemo: any}) {
  console.log(streamDemo);
  return (
    <div>
      <h1>{streamDemo.title}</h1>
      <p>{streamDemo.publishedAt}</p>
      <p>{streamDemo.guestName}</p>
      {/* We are using dangerouslySetinnnerHTML to render html from props, it's working like innerHTML in vanilla js */}
      <div dangerouslySetInnerHTML={{ __html: streamDemo.description.html }} />
      <img src={streamDemo.coverImage.url}></img>
    </div>
  )
}
 export async function getStaticPaths() {
  // This function gets called at build time on server-side. It gets all paths we want to pre-render based on streams from hygraph
  const { data} = await client.query({
    query: gql`
      query MyQuery {
        streamDemos {
          slug
        }
      }
    `,
  });

    const { streamDemos } = data;

    const paths = streamDemos.map((streamDemo: any) => ({
      params: { slug: [streamDemo.slug] },
    }))

    return { paths, fallback: false }

 }

 type Params = {
  params: {
    slug: string[]
  }
}

export async function getStaticProps({ params } : Params) {
  const slug = params.slug[0];

  const { data: hygraphData } = await client.query({
    query: gql`
      query StreamQuery($slug: String!) {
        streamDemos (where: {slug: $slug}) {
          id
          title
          publishedAt
          guestName
          coverImage {
            url
          }
          description {
            html
          }
          slug
        }
      }
    `,
    variables: {
      slug,
    },
  });

  const streamDemo = hygraphData.streamDemos[0];

  return {
    props: {
      streamDemo,
    },
  };
}
