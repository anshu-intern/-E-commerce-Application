import "./Cart.css";
import emptyCart from "../assets/emptycart.jpg"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { incCartQuantity, decCartQuantity, removefromCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Cart(){
    const [itemCount,setitemCount] = useState(0);
    const [subtotal,setsubtotal] = useState(0);
    const [qtyError,setQtyError] = useState({});

    const itemIncart = useSelector(store => store.cart.items);
    const dispatch = useDispatch();

    // Update totals, Count and clear errors when cart changes.

    useEffect(() => {
        setsubtotal(itemIncart.reduce((total, item) => total + item.price*item.quantity, 0));
        setitemCount(itemIncart.length);
        setQtyError({});
    },[itemIncart])

    // Handle increasing quantity

    function increaseQuantity(item){
         if (item.quantity >= item.stock){
            setQtyError(e => ({...e,[item.id] : `Only ${item.stock} items in stock.`}));
        } else{
            setQtyError(e => ({...e,[item.id] : false}));
            dispatch(incCartQuantity(item));
        }
    }
    
    // Handle decreasing quantity

    function decreaseQuantity(item){
        if (item.quantity === item.minimumOrderQuantity){
            setQtyError(e => ({...e,[item.id] : `Minimum order quantity is ${item.minimumOrderQuantity}.`}));
        } else{
            setQtyError(e => ({...e,[item.id] : false}));
            dispatch(decCartQuantity(item));
        }
        
    }

    // Remove item from cart

    function deleteItem(item){
        dispatch(removefromCart(item));
        alert(`${item.title} removed from cart!`);
    }
    
    return(
        <section className="cartSection">
            {
                itemCount === 0 ? (
                <div className="emptycartHead">
                <h3>Your ShoppyGlobe cart is empty</h3>
                <p>Browse and add items to your cart.</p>
                <img className="enptyCarticon" src={emptyCart} alt={"Empty Cart"}/>
                </div>) : (<><article className="cartItemsList">
                <div className="cartHead"><h2>Shopping Cart</h2><p className="cartHeadprice">Price (in rupee)</p></div>
                {
                    itemIncart.map((item,index) => (
                        <div key={index} className="cartItem">
                            <img src={item.images[0]} alt={item.title}/>
                            <div className="cartItemDesc">
                                <h3>{item.title}</h3>
                                <div>
                                    <span>{item.availabilityStatus} - </span>
                                    <span>{item.stock}</span>
                                </div>
                                
                                <span>{item.shippingInformation}</span>
                                <div>
                                    <div>
                                    <div className="cartquantitubutton"><button onClick={e => decreaseQuantity(item)}> - </button><p className="cartquantityvalue">{item.quantity}</p><button onClick={e => increaseQuantity(item)}> + </button></div>
                                    <span className="cartQtyError">{qtyError[item.id] ? qtyError[item.id] :''}</span>
                                    </div>
                                    <button className="cartRemovebutton" onClick={e => deleteItem(item)}>Remove from Cart</button>
                                </div>
                            </div>
                            <div className="cartDescPrice">
                                <h4>Rs. {item.price}</h4>
                                <span>({item.discountPercentage}% off)</span>
                            </div>
                        </div>
                    ))
                }

                <div className="cartTotal">
                    <p className="cartTotalText">
                     Subtotal  {`(${itemCount} ${(itemCount > 1) ? "items": "item" })`}: <span className="cartTotalAmount"> Rs. {subtotal.toFixed(2)} </span>
                    </p>
                </div> </article>
                <article className="cartCheckout">
                    <div className="cartCheckoutDiv">
                        <p className="cartTotalText">
                             Subtotal  {`(${itemCount} ${(itemCount > 1) ? "items": "item" })`}: <span className="cartTotalAmount"> Rs. {subtotal.toFixed(2)} </span>
                       </p>
                        <Link to={"/cart/checkout"}><button>Proceed to checkout</button></Link>
                    </div>
                </article>
                </>)
            } 
        </section>
    )
}

export default Cart;