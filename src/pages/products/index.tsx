import { gql } from '@apollo/client'
import React from 'react'
import client from '../../../lib/apolloClient'
import Product from '../../../types/product'
import ProductList from '@/components/products/ProductList'

type products = {
    products: Product[]
}

export default function ProductsPage({products} : products ) {
    console.log(products);
  return (
    <section>
        <h2 className="sr-only">Products</h2>
        <ProductList products={products} />
    </section>
  )
}

export async function getStaticProps() {
    const { data: hygraphData } = await client.query({
        query: gql`
        query {
            products {
                id,
                title,
                description {
                html
                }
                shortDescription
                slug
                price
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