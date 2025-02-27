import Link from 'next/link';
import React from 'react'
import styled from 'styled-components';
import { ButtonStyle } from '../styles/Button';

const ButtonLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children, ...rest }) => {
    const StyledLink = styled(Link)`
        ${ButtonStyle}
    `;

    return (
        <StyledLink href={href} {...rest}>{children}</StyledLink>
    );
}
export default ButtonLink;