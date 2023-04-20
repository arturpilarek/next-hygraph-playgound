  import Product from "../../../types/product"
  import ProductCard from "./ProductCard"

  type products = {
    products: Product[]
}
  
  export default function ProductList({products} : products) {
    return (
      <div className="bg-white">
        <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    )
  }
  