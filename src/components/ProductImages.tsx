import React, { useState } from 'react'
import styled from 'styled-components';

const BigImage = styled.img`
    max-width: 100%;
`;

const ImageButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem
`;
const ImageButton = styled.div`
    border: 2px solid #EEE;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 5rem;
    cursor: pointer;
    border-radius: 5px;
    background-color: #CCC;
    ${props => props.active ? 'border-color: red;': 'opacity: .7;'}
`;

const ProductImages: React.FC<{ images: string[] }> = ({ images }) => {

    const [activeImage, setActiveImage] = useState<string>(images[0]);

    return (
        <>
            <BigImage src={activeImage} />
            <ImageButtons >
                {images.map((image,i) => (
                    <ImageButton active={image === activeImage} key={i} onClick={() => setActiveImage(image)}>
                        <BigImage src={image} />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    );
}
export default ProductImages;