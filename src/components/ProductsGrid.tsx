import React from 'react'
import styled from 'styled-components';


const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1.25rem;
`;

const ProductsGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <StyledProductsGrid>
            {children}
        </StyledProductsGrid>
    );
}
export default ProductsGrid;