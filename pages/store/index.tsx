import { getProducts } from "../../services/productService";
import Layout from "./../../components/layout";

type Data = {
  products: any[];
};

export default function Index({ products }: Data) {
  return (
    <Layout>
      <h1>Here all the products, Home Page</h1>
      <div>
        {products &&
          products.map((product: any) => (
            <li key={product.id}>{product.title}</li>
          ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await getProducts();

  return {
    props: {
      products: res,
    },
  };
}
