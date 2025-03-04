import React from 'react'
import { ProductDoc } from '../models/Product';
import styled from 'styled-components';
import Button from './Button';
import CartIcon from './icons/CartIcon';

type ProductBoxType = {
    product: ProductDoc
}

const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
    padding: 0.625rem;
    text-align: center;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    height: 14rem;
    img {
        height: 8rem;
        background-color: #FFF;
        width: 10rem;
        max-height: 9rem;
    }
`;

const Title = styled.h2`
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
    text-align: start;
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
    return (
        <ProductWrapper>
            <WhiteBox>
                <img src={product.imageUrls[0]} alt="" />
                <ProductInfoBox>
                    <Title>{product.name}</Title>
                    <PriceRow>
                        <Price>${product.price}</Price>
                        <div>
                            <Button primary outlined> <CartIcon /></Button>
                        </div>
                    </PriceRow>
                </ProductInfoBox>
            </WhiteBox>
        </ProductWrapper>
    );
}
export default ProductBox;