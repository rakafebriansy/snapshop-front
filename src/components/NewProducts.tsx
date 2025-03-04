import React from 'react'
import { ProductDoc } from '../models/Product';
import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';

type NewProductsType = {
    products: string
}

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1.25rem;
    padding-top: 1.25rem;
`;

const NewProducts: React.FC<NewProductsType> = ({ products }) => {
    const parsedProducts: ProductDoc[] = JSON.parse(products);

    return (
        <>
            <Center>
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