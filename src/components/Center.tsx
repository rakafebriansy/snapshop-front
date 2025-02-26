import React from 'react'
import styled from 'styled-components';

type CenterType = { children: React.ReactNode };

const StyledDiv = styled.div`
    max-width: 50rem;
    margin: auto;
    padding: 0 1.25rem;
`;

const Center: React.FC<CenterType> = ({ children }: CenterType) => {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    );
}
export default Center;