import React from 'react'
import styled from 'styled-components';

const StyledBox = styled.div`
background-color: #FFF;
border-radius: 0.625rem;
padding: 1.875rem;
`;

const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <StyledBox>
            {children}
        </StyledBox>
    );
}
export default Box;