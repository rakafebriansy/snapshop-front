import React from 'react'
import styled, { css } from 'styled-components';
import { ButtonStyle } from '../styles/Button';

type ButtonType = {
    children: React.ReactNode;
};

const StyledButton = styled.button`
    ${ButtonStyle}
`;

const Button: React.FC<ButtonType> = ({ children, ...rest }) => {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    );
}
export default Button;