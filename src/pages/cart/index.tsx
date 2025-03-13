import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header';
import styled from 'styled-components';
import Button from '../../components/Button';
import { CartContext } from '../../contexts/CartContext';
import { ProductDoc } from '../../models/Product';
import CartService from '../../services/cart';
import Table from '../../components/Table';
import { Types } from 'mongoose';
import Input from '../../components/Input';
import OrderService from '../../services/order';
import Center from '../../components/Center';
import { useRouter } from 'next/router';
import Box from '../../components/Box';

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    padding: 1rem;
    gap: 1rem;
`;

const ProductInfoCell = styled.td`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    `;

const ProductImageBox = styled.div`
    padding: 0.625rem;
    border-radius: 0.625rem;
    background-color: #F0F0F0;
    border: 1px solid rgba(0,0,0,0.1);
    img {
        max-height: 3rem;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 0.3rem;
`;

const CartPage: React.FC = () => {

    const { cartProducts, addProduct, removeProduct, setCartProducts } = useContext(CartContext)!;
    const [products, setProducts] = useState<ProductDoc[]>([]);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [streetAddress, setStreetAddress] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    const addProductQty = (productId: Types.ObjectId) => {
        addProduct(productId);
    }

    const reduceProductQty = (productId: Types.ObjectId) => {
        removeProduct(productId);
    }

    const goToPayment = async () => {
        try {
            const response: { url: string } = await OrderService.store({
                name, email, city, postalCode, streetAddress, country, products: cartProducts.toString()
            });
            window.location = response.url as string & Location;
        } catch (e) {
            alert(e);
        }
    }

    const clearCart = () => {
        setCartProducts([]);
    }

    useEffect(() => {
        const getProducts = async () => {
            const products: ProductDoc[] = await CartService.store({ ids: cartProducts });
            setProducts(products);
        }
        if (cartProducts.length > 0) {
            getProducts();
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (window.location.href.includes('success')) {
            clearCart();
        }
    }, [isClient]);

    if (!isClient) return null;

    if (window.location.href.includes('success')) {
        return (<>
            <Header></Header>
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h1>Thanks for your order!</h1>
                        <p>We will email you when you order will be sent.</p>
                    </Box>
                </ColumnsWrapper>
            </Center>
        </>);
    }

    return (
        <div>
            <Header />
            <ColumnsWrapper>
                <Box>
                    <h2>Cart</h2>
                    {!products.length && (
                        <div>Your cart is empty.</div>
                    )}
                    {products.length > 0 && (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => {
                                    const qty = cartProducts.filter(id => id === product._id).length;
                                    return (
                                        <tr>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.imageUrls[0]} />
                                                </ProductImageBox>
                                                {product.name}
                                            </ProductInfoCell>
                                            <td>
                                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center' }}>
                                                    <Button onClick={() => reduceProductQty(product._id)}>-</Button>
                                                    <QuantityLabel>{qty}</QuantityLabel>
                                                    <Button onClick={() => addProductQty(product._id)}>+</Button>
                                                </div>
                                            </td>
                                            <td>${product.price * qty}</td>
                                        </tr>
                                    );
                                }
                                )}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Total: ${total}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </Box>
                {!!products.length && (
                    <Box>
                        <h2>Order Information</h2>
                        <Input type="text" name="name" placeholder='Name' value={name} onChange={(e: any) => setName(e.target.value)} />
                        <Input type="text" name="email" placeholder='Email' value={email} onChange={(e: any) => setEmail(e.target.value)} />
                        <CityHolder>
                            <Input type="text" name="city" placeholder='City' value={city} onChange={(e: any) => setCity(e.target.value)} />
                            <Input type="text" name="postalCode" placeholder='Postal Code' value={postalCode} onChange={(e: any) => setPostalCode(e.target.value)} />
                        </CityHolder>
                        <Input type="text" name="streetAddress" placeholder='Street Address' value={streetAddress} onChange={(e: any) => setStreetAddress(e.target.value)} />
                        <Input type="text" name="country" placeholder='Country' value={country} onChange={(e: any) => setCountry(e.target.value)} />
                        <Button type="button" block black size='l' onClick={goToPayment}>Continue to payment</Button>
                    </Box>
                )}
            </ColumnsWrapper>
        </div>
    );
}
export default CartPage;