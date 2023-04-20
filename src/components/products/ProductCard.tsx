  import Product from "../../../types/product"
  
  export default function ProductCard({product} : {product: Product})  {
    return (
              <div
                key={product.id}
                className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group"
              >
                <div className="bg-gray-200 aspect-h-4 aspect-w-3 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <img
                    src={product.productImage.url}
                    alt={product.title}
                    className="object-cover object-center w-full h-full sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`/products/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{product.shortDescription}</p>
                  <div className="flex flex-col justify-end flex-1">
                    <p className="text-base font-medium text-gray-900">{product.price}$</p>
                  </div>
                </div>
              </div>
            )
  }
  