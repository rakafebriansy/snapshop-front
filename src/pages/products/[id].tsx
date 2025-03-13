import React, { useContext } from 'react'
import Center from '../../components/Center';
import Header from '../../components/Header';
import styled from 'styled-components';
import { Product, ProductDoc } from '../../models/Product';
import { mongooseConnect } from '../../lib/mongoose';
import Box from '../../components/Box';
import ProductImages from '../../components/ProductImages';
import Button from '../../components/Button';
import CartIcon from '../../components/icons/CartIcon';
import { CartContext } from '../../contexts/CartContext';

const Title = styled.h1`
    font-size: 1.5em;
`;

const ColWrapper = styled.div`
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
    grid-template-columns: .8fr 1.2fr;
`;

const PriceRow = styled.div`
    display: flex;
    gap: 1rem;
    alignItems: center;
`

export async function getServerSideProps(context: any) {
    await mongooseConnect();
    const { id } = context.query;
    const product: ProductDoc | null = await Product.findById(id);
    return {
        props: {
            productString: product ? JSON.stringify(product) : '{}'
        }
    }
}

const ProductDetailPage: React.FC<{ productString: string }> = ({ productString }) => {
    const product: ProductDoc = JSON.parse(productString);
    const { addProduct } = useContext(CartContext);
    return (
        <>
            <Header />
            <Center>
                <ColWrapper>
                    <Box>
                        <ProductImages images={product.imageUrls} />
                    </Box>
                    <div className="">
                        <Title>{product.name}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div style={{ display: 'flex', alignItems: 'center' }}>${product.price}</div>
                            <Button primary onClick={() => addProduct(product._id)}><CartIcon /> Add to cart</Button>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
        </>
    );
}
export default ProductDetailPage;