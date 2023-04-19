import { gql } from '@apollo/client'
import React from 'react'
import client from '../../../lib/apolloClient'

type product = {
    id: string
    name: string
    description: string
    price: number
    slug: string
    image: {
        url: string
    }
}

type products = {
    products: product[]
}

export default function ProductsPage({products} : products ) {
    console.log(products);
  return (
    <div>ProductsPage</div>
  )
}

export async function getStaticProps() {
    const { data: hygraphData } = await client.query({
        query: gql`
        query {
            products {
                title,
                description {
                html
                }
                slug
                stock
                productImage {
                url
                }
            }
}
        `,
    });
    
    return {
        props: {
        products: hygraphData.products,
        },
    }
    }