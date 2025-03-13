import React from 'react'
import Header from '../../components/Header';
import styled from 'styled-components';
import Center from '../../components/Center';
import { mongooseConnect } from '../../lib/mongoose';
import { Product, ProductDoc } from '../../models/Product';
import ProductsGrid from '../../components/ProductsGrid';
import ProductBox from '../../components/ProductBox';

const Title = styled.h1`
    font-size: 1.5em;
`;

export async function getServerSideProps() {
    await mongooseConnect();
    const products: ProductDoc[] = await Product.find({}, null, { sort: { '_id': -1 } });
    return {
        props: {
            productsString: JSON.stringify(products)
        }
    }
}

const ProductsPage: React.FC<{ productsString: string }> = ({ productsString }) => {
    const products: ProductDoc[] = JSON.parse(productsString)
    return (
        <>
            <Header />
            <Center>
                <Title>All Products</Title>
                <ProductsGrid>
                    {products && products.length > 0 && products.map(product => (
                        <ProductBox product={product} />
                    ))}
                </ProductsGrid>
            </Center>
        </>
    );
}

export default ProductsPage;