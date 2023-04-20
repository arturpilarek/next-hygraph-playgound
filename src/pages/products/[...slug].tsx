import { gql } from '@apollo/client'
import { CheckIcon } from '@heroicons/react/20/solid'
import client from '../../../lib/apolloClient'
import Product from '../../../types/product'

type productPageProps = {
    product: Product
}

export default function ProductPage({product} : productPageProps) {

    console.log(product)

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          {/* <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {product.breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <a href={breadcrumb.href} className="font-medium text-gray-500 hover:text-gray-900">
                      {breadcrumb.name}
                    </a>
                    {breadcrumbIdx !== product.breadcrumbs.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="flex-shrink-0 w-5 h-5 ml-2 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav> */}

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.title}</h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">{product.price}$</p>
            </div>
            <div className="mt-4 space-y-6">
              <div className="text-base text-gray-500" dangerouslySetInnerHTML={{ __html: product.description.html }}/>
            </div>

            <div className="flex items-center mt-6">
              <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true" />
              <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="overflow-hidden rounded-lg aspect-h-1 aspect-w-1">
            <img src={product.productImage.url} alt={product.title} className="object-cover object-center w-full h-full" />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <form>
              <div className="mt-10">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add to bag
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
    
    const { data } = await client.query({
        query: gql`
            query {
                products {
                    slug
                }
            }
        `
    })

    const { products } = data
    
    const paths = products.map((product: Product) => ({
        params: { slug: [product.slug] },
    }))

    return { paths, fallback: false }
}

type Params = {
    params: {
      slug: string[]
    }
  }

export async function getStaticProps({ params }: Params) {
    const slug = params.slug[0]
    
    const { data : productsBySlug } = await client.query({
        query: gql`
        query ProductQuery($slug: String!) {
          products (where: {slug: $slug}) {
            id
            title
            productImage {
              url
            }
            description {
              html
            }
            slug
            stock
            price
          }
        }
      `,
        variables: {
            slug
        }
    })
    return {
        props: {
            product: productsBySlug.products[0] 
        }
    }
}


