import "./ProductItem.css";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addtoCart} from "../utils/cartSlice";

function ProductItem({item}){
    const dispatch = useDispatch();

    // Function to add the current item to the cart
    // Uses the item's minimumOrderQuantity as the default quantity.
    
    function addItemtoCart(item){
        dispatch(addtoCart({...item, quantity: item.minimumOrderQuantity}));
        alert(`${item.title} added to cart.`);
    }

    return(
        <article className="productItem">
            <Link to={`/productDetail/${item.id}/${encodeURIComponent(item.title.toLowerCase().split(" ").join("-"))}`}>
                <div className="itemThumb">
                    <img src={item.thumbnail} alt={item.title}/>
                </div>
            </Link>
            <div className="itemInfo">
                <h3 className="itemBrand">{item.brand}</h3>
                <h4 className="itemTitle"><Link className="itemTitleLink" to={`/productDetail/${item.id}/${encodeURIComponent(item.title.toLowerCase().split(" ").join("-"))}`}>{item.title}</Link></h4>
                <div>
                    <span className="itemRating">{item.rating} star </span>
                    <span className="itemReview">({item.reviews?.length || 0} reviews)</span>
                </div>
                <div>
                    <span className="itemPrice">Rs. {item.price}  </span>
                    <span className="itemDiscount"> ({item.discountPercentage})%off </span>
                </div>
                <span className="itemShip">{item.shippingInformation}</span>
                <button className="addCartButton" onClick={e => addItemtoCart(item)}>Add to cart</button>
            </div>
        </article>
    )
}

export default ProductItem;