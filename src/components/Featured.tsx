import React, { useContext } from 'react'
import Center from './Center';
import styled from 'styled-components';
import Button from './Button';
import { ProductDoc } from '../models/Product';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import { CartContext } from '../contexts/CartContext';

const Bg = styled.div`
    background-color: #222;
    color: #FFF;
    padding: 3.125rem 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 2rem;
`;

const Description = styled.p`
    color: #AAA;
    font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 2rem;
    img {
        max-width: 100%;
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 1rem;
    gap: 1rem;
`;

const Featured: React.FC<{ product: string }> = ({ product }) => {
    const productObj: ProductDoc = JSON.parse(product);

    const { addProduct } = useContext(CartContext)!;

    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{productObj.name}</Title>
                            <Description>{productObj.description}</Description>
                            <ButtonsWrapper>
                                <ButtonLink href={`/products/${productObj._id}`} white outlined size='l'>Read more</ButtonLink>
                                <Button primary size='l' onClick={() => addProduct(productObj._id)}>
                                    <CartIcon />
                                    Add to cart</Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src={'/hero.webp'} />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
}
export default Featured;