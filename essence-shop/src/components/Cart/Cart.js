import { collection, doc, getDoc, getDocs} from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../contexts/ProductContext'
import { useState } from 'react';
import { deleteItemFromCart, deleteUserCart, editCart, editProduct, getCartByUserId } from '../../lib/firebase.fetch'
import { auth, db } from '../../lib/init-firebase'
import CartProducts from './CartProducts';
import { useNavigate } from 'react-router-dom';

const Cart = ({ updateUserData }) => {
    const redirect=useNavigate();
    const [cartProducts, setCartProducts] = useState([]);
    const { badgerCalculator } = useContext(ProductContext);
    const [product, setProduct] = useState({});
    let Product;
    const [totalAmount, setTotalAmount] = useState(0);
    const [productPriceAmount, setProductPriceAmount] = useState(0);
    const [qtyUpdate, setQtyUpdate] = useState('');
    let qtyItem;
    useEffect(() => {
        setTotalAmount(0)
        setProductPriceAmount(0);
        cartProducts.forEach(element => {
            setProductPriceAmount(old => old += element.TotalProductPrice);
        });
        setTotalAmount(productPriceAmount + 20.0);
    }, [product, cartProducts, productPriceAmount])

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                getCartByUserId(user.uid).then((doc) => {
                    setCartProducts(doc);
                })
            } else {
                console.log('User is not signed in to retrieve cart');
            }
        })
        badgerCalculator();
    }, [product])


    //cart product increase amount function
    const cartProductIncrease = (cartProduct) => {
        // set global value for the product
        Product = cartProduct;
        if (Product.qty <= Product.inStock) {
            Product.qty = Product.qty + 1;
            Product.TotalProductPrice = Product.qty * Product.price;
            setProduct(Product);
            //update DB for the product changes
            auth.onAuthStateChanged(user => {
                if (user) {
                    getCartByUserId(user.uid).then(
                        editCart(user.uid, Product.productId, Product)
                    )
                } else {
                    console.log('User is not signed in to retrieve cart');
                }
            })
        }
    }
    const removeProduct = (cartProduct) => {
        deleteItemFromCart(auth.currentUser.uid, cartProduct.productId);
        badgerCalculator();
        auth.onAuthStateChanged(user => {
            if (user) {
                getCartByUserId(user.uid).then((doc) => {
                    setCartProducts(doc);
                })
            } else {
                console.log('User is not signed in to retrieve cart');
            }
        })
    }
    // cart product decrease amount function
    const cartProductDecrease = (cartProduct) => {
        // set global value for the product
        Product = cartProduct;
        if (Product.qty > 1) {
            Product.qty = Product.qty - 1;
            Product.TotalProductPrice = Product.qty * Product.price;
            setProduct(Product);
            //update DB for the product changes
            auth.onAuthStateChanged(user => {
                if (user) {
                    getCartByUserId(user.uid).then(
                        editCart(user.uid, Product.productId, Product)
                    )
                } else {
                    console.log('User is not signed in to retrieve cart');
                }
            })
        }
    }
    const checkoutLogic = async (cartProducts) => {
        let order = cartProducts;
        let userFinishedOrder;
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await getDoc(userRef).then((doc) => {
            userFinishedOrder = doc.data();
        })
        userFinishedOrder.completedOrders = { order };
        updateUserData(userFinishedOrder)
        await cartProducts.forEach(element => {
            const prodRef = collection(db, `products`);
            const snapshot = getDocs(prodRef).then((doc) => {
                doc.forEach((el) => {
                    if (el.id == element.id) {
                        setQtyUpdate(el.id);
                        qtyItem = el.data();
                        qtyItem['inStock'] = qtyItem.inStock - element.qty;
                        editProduct(el.id, qtyItem);
                        qtyItem = {}
                        setQtyUpdate('');

                    }
                })
            })
        })
        await deleteUserCart(auth.currentUser.uid, cartProducts);
        redirect('/');
    }

    return (
        <>
            {!auth.currentUser&& redirect('/login')}
            {cartProducts.length > 0 && (
                <div>
                    <div>
                        <CartProducts
                            cartProducts={cartProducts}
                            cartProductIncrease={cartProductIncrease}
                            cartProductDecrease={cartProductDecrease}
                            totalAmount={totalAmount}
                            productPriceAmount={productPriceAmount}
                            removeProduct={removeProduct}
                            checkoutLogic={checkoutLogic}
                        />
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div>No products to show</div>
            )}


        </>
    )
}

export default Cart