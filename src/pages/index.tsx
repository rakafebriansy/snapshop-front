import Featured from "../components/Featured";
import Header from "../components/Header";
import NewProducts from "../components/NewProducts";
import { mongooseConnect } from "../lib/mongoose";
import { Product, ProductDoc } from "../models/Product";

type HomePropsType = {
  featuredProduct: string;
  newProducts: string;
}

export default function Home ({ featuredProduct, newProducts }: HomePropsType) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps(): Promise<{ props: HomePropsType }> {
  await mongooseConnect();
  const featuredProduct: ProductDoc | null = await Product.findOne().sort({ _id: -1 });;
  const newProducts: ProductDoc[] | null = await Product.find({}, null, { sort: { '_id': -1 } });
  
  if (!featuredProduct || !newProducts) {
    throw new Error('Product is not found.');
  }
  return {
    props: {
      featuredProduct: JSON.stringify(featuredProduct),
      newProducts: JSON.stringify(newProducts)
    }
  };
}