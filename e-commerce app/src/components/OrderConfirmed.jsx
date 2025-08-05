import { useEffect, useState } from "react";
import "./OrderConfirmed.css";
import { useNavigate } from "react-router-dom";
import confirmicon from "../assets/orderconfirmed.avif";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {clearCart} from "../utils/cartSlice";

function OrderConfirmed(){
    const navigate = useNavigate();
    const store = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    const [processing,setProcessing] = useState(false);

    useEffect(()=> {
        // After 2 seconds, set processing to true and clear the cart
        const load = setTimeout(()=>{
            setProcessing(true)
            dispatch(clearCart());
        },2000);

        // After 7 seconds, navigate user back to homepage
        const timer = setTimeout(()=>{
            navigate("/home")
        },7000);

        // Cleanup timers
        return () => {
            clearTimeout(load);
            clearTimeout(timer);
        }

    },[dispatch,navigate]);

    return(
        <>
        { !processing ? <section className="orderConfirmWait"><h1>Please wait...</h1><p>Your order is being confirmed!</p></section> :
        <div className="orderConfirmed">
            <h2>Thank you for shopping with us!</h2>
        <h1>Your order is confirmed!</h1>
        <br/>
        <h3>You will be redirected to homepage within 5 seconds.</h3>
        <img className="orderConfirmimg" src={confirmicon} alt={"Order confirmed"}/>
        </div>
        }
        </>
    )

}

export default OrderConfirmed;