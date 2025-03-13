import React, { useContext } from 'react'
import { ProductDoc } from '../models/Product';
import styled from 'styled-components';
import Button from './Button';
import CartIcon from './icons/CartIcon';
import Link from 'next/link';
import { CartContext } from '../contexts/CartContext';

type ProductBoxType = {
    product: ProductDoc
}

const ProductWrapper = styled.div`

`;

const WhiteBox = styled(Link)`
    padding: 0.625rem;
    text-align: center;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    img {
        height: 8rem;
        background-color: #FFF;
        width: 10rem;
        max-height: 9rem;
    }
`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
    text-align: start;
    color: black;
    text-decoration: none;
`;

const ProductInfoBox = styled.div`
    gap: 0.5rem;
    display: flex;
    align-items: start; 
    flex-direction: column;
    width: 100%; 
    `;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%; 
`;

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const ProductBox: React.FC<ProductBoxType> = ({ product }) => {
    const url = '/products/' + product._id;

    const { addProduct } = useContext(CartContext)!;

    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <img src={product.imageUrls[0]} alt="" />
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{product.name}</Title>
                <PriceRow>
                    <Price>${product.price}</Price>
                    <div>
                        <Button primary outlined onClick={() => addProduct(product._id)}> <CartIcon /></Button>
                    </div>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}
export default ProductBox;