import "./Header.css";
import Nav from "./Nav";
import carticon from "../assets/carticon-1.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header(){
    // Get all items in cart from Redux store to display the count
    const itemsInCart = useSelector(store => store.cart.items);
    
    return(
        <>
            <header className="header">
                <div>
                    <Link className="headroute" to={"/"}><h1>ShoppyGlobe</h1></Link>
                </div>
                <div className="head-right">
                    <div className="nav-user">
                        <Link className="headroute" to={"/home"}><div className="nav-user-div"><span className="nav-user-span">Home</span></div></Link>
                    </div>
                    <div className="nav-right">
                        <Link className="headroute" to={"/cart"}>
                            <img className="img" src={carticon} />
                            <span className="nav-user-span">Cart</span>
                            <sup className="cartCount">{itemsInCart.length}</sup>
                        </Link>
                    </div>
                </div>
            </header>  

            <Nav/>
        </>   
    )
}

export default Header;