import Featured from "../components/Featured";
import Header from "../components/Header";
import { mongooseConnect } from "../lib/mongoose";
import { Product, ProductDoc } from "../models/Product";

type HomeProps = {
  product: string
}

export default function Home ({ product }: HomeProps) {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
}

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  await mongooseConnect();
  const product: ProductDoc | null = await Product.findOne().sort({ _id: -1 });;
  if (!product) {
    throw new Error('Product is not found.');
  }
  return {
    props: {
      product: JSON.stringify(product)
    }
  };
}