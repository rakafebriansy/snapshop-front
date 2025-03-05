// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "../../lib/mongoose";
import { Product, ProductDoc } from "../../models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductDoc[]>,
) {
  await mongooseConnect();
  const ids = req.body.ids;
  const products: ProductDoc[] = await Product.find({_id: ids});

  res.status(200).json(products);
}
