import "./Checkout.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout(){
    // Access cart items from Redux store
    const store = useSelector(store => store.cart.items);
    const orderTotal = store.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const navigate = useNavigate();
    let delivery = 0;

    const [address, setAddress] = useState("");
    const [instructions, setInstructions] = useState("");
    const [error, setError] = useState("");

    // Handle order confirmation

    function confirmAndProceed(){
        if (address.trim() === "") {
            setError("Please fill out address (and delivery instructions if any).");
            return;
        }
        setError("");
        navigate("/orderConfirmed");
    }

    // Navigate back to cart page
    
    function gotoCart(){
        navigate("/cart");
    }
    
    return(
        <>
        <section className="checkoutPage">
            <article className="checkoutPageDetails">
                <h2>Checkout cart</h2>
                <div className="cartSum">
                    <h4>Total items in cart: </h4>
                    <div className="cartsumitem">
                    <span>No of items:</span><span className="checkoutItems">{store.length} item(s)</span></div>
                    <div className="cartsumitem">
                    <span>Delivery:</span><span className="itemDelivery">{delivery === 0 ? "Free delivery" : `Rs. ${delivery.toFixed(2)}`}</span></div>
                    <div className="cartsumitem">
                    <span>Order Total:</span><span className="orderTotal">{`Rs. ${(orderTotal + delivery).toFixed(2)}`}</span></div>
                </div>
                <div className="cartSum">
                    <h4>Enter your delivery address along with contact info below:</h4>
                    <textarea value={address} placeholder="Enter your delivery address here..." rows={5} onChange={(e) => setAddress(e.target.value)}></textarea>
                    <p>Add delivery instruction(if any)</p>
                    <textarea value={instructions} placeholder="Add delivery instructions..." rows={5} onChange={(e) => setInstructions(e.target.value)}></textarea>
                </div>
                <div className="cartPay">
                    <h4>Payment option</h4>
                    <div>
                    <input type="radio" name="paymentopt" id="paymentopt" defaultChecked/><label htmlFor="paymentopt">Pay on delivery  ( Cash / UPI / Cards )</label></div>
                    <span>We accept payments at the time of delivery only!</span>
                </div>
                <p className="checkoutMsg">*Note: Address input is required*</p>
                <span className="checkoutMsg">{error ? error : ""}</span>
                <button className="confirmOrder" onClick={confirmAndProceed}>Confirm and place your order</button>
                <button className="confirmOrder" onClick={gotoCart}>Go back to cart</button>
            </article>
        </section>
        </>
    )
}

export default Checkout;