import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
    width: 100%;
    padding: 0.3rem;
    margin-bottom: 0.3rem;
    border: 1px solid #CCC;
    border-radius: 0.3rem;
    box-sizing: border-box;
`;

const Input: React.FC = (props) => {
    return (
        <StyledInput {...props} />
    );
}
export default Input;