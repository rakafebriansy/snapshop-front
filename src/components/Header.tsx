import Link from 'next/link';
import React, { useContext } from 'react'
import styled from 'styled-components';
import Center from './Center';
import { CartContext } from '../contexts/CartContext';

const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    color: #FFF;
    text-decoration: none;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.25rem 0;
`;

const NavLink = styled(Link)`
    color: #AAA;
    text-decoration: none;
`;

const StyledNav = styled.nav`
    display: flex;
    gap: 1rem;
`

const Header: React.FC = ({ }) => {
    const { cartProducts, setCartProducts } = useContext(CartContext)!;

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>SnapShop</Logo>
                    <StyledNav>
                        <NavLink href={'/home'}>Home</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}
export default Header;