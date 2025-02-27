import React from 'react'
import Center from './Center';
import styled from 'styled-components';
import Button from './Button';
import { ProductDoc } from '../models/Product';
import ButtonLink from './ButtonLink';

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
                                <Button primary size='l'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={'1.2rem'}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>

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