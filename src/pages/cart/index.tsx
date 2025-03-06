import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header';
import styled from 'styled-components';
import Center from '../../components/Center';
import Button from '../../components/Button';
import { CartContext } from '../../contexts/CartContext';
import { ProductDoc } from '../../models/Product';
import CartService from '../../services/cart';
import Table from '../../components/Table';
import { Types } from 'mongoose';

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    padding: 1rem;
    gap: 1rem;
`;

const Box = styled.div`
    background-color: #FFF;
    border-radius: 0.625rem;
    padding: 1.875rem;
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

const CartPage: React.FC = () => {

    const { cartProducts, addProduct, removeProduct } = useContext(CartContext)!;
    const [products, setProducts] = useState<ProductDoc[]>([]);

    const addProductQty = (productId: Types.ObjectId) => {
        addProduct(productId);
    }

    const reduceProductQty = (productId: Types.ObjectId) => {
        removeProduct(productId);
    }

    useEffect(() => {
        const getProducts = async () => {
            const products: ProductDoc[] = await CartService.store({ ids: cartProducts });
            setProducts(products);
        }
        if (cartProducts.length > 0) {
            getProducts();
        }
    }, [cartProducts]);

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
                            </tbody>
                        </Table>
                    )}
                </Box>
                {!!products.length && (
                    <Box>
                        <h2>Order Information</h2>
                        <input type="text" placeholder='Address' />
                        <input type="text" placeholder='Address 2' />
                        <Button block black size='l'>Continue to payment</Button>
                    </Box>
                )}
            </ColumnsWrapper>
        </div>
    );
}
export default CartPage;