export default interface Product {
    id: number;
    title: string;
    price: number;
    description: {
        html: string;
    }
    shortDescription: string;
    stock: number;
    slug: string;
    productImage: {
        url: string;
    };
}