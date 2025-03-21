import React from 'react'
import { ProductDoc } from '../models/Product';
import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';
import ProductsGrid from './ProductsGrid';

type NewProductsType = {
    products: string
}

const Title = styled.h2`
    font-size: 2rem;
    margin: 2rem 0 1.5rem;
    font-weight: 400;
`;

const NewProducts: React.FC<NewProductsType> = ({ products }) => {
    const parsedProducts: ProductDoc[] = JSON.parse(products);

    return (
        <>
            <Center>
                <Title>New Arrivals</Title>
                <ProductsGrid>
                    {parsedProducts && parsedProducts.length > 0 && parsedProducts.map(product => (
                        <ProductBox product={product} />
                    ))}
                </ProductsGrid>
            </Center>
        </>
    );
}
export default NewProducts;