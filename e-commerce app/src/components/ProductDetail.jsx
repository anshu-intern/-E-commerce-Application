import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import useProducts from "../hooks/useProducts";
import { useEffect, useState } from "react";
import userIcon from "../assets/usericon.jpg";
import gobackicon from "../assets/gobackicon.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart } from "../utils/cartSlice";

function ProductDetail(){
    const [item, setItem] = useState(null);
    const {id , name} = useParams();
    const {products,loading,error} = useProducts("https://dummyjson.com/products");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selQty,setSelQty] = useState(1);

    // On products or id change, find the matching product and set to state

    useEffect(()=> {
        const res = products.find(item => item.id === Number(id));
        setItem(res || null);
        setSelQty(res?.minimumOrderQuantity || 1);
    },[id,products])

    // Show loading, error, or not found UI as needed

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.toString()}</h1>;
    if (!item) return <h1>Oops! Item not found...</h1>;

    // Generate quantity options starting from minimumOrderQuantity up to min + 20

    const quantityOpt = [];
    const min = item.minimumOrderQuantity || 1;
    const max = min + 20 || 20;

    for( let i = min ; i < max  ; i++)
    {
        quantityOpt.push(
                <option key={i} value={i}>
                    {i}
                </option>
        );
    }

    // Dispatch add to cart with selected quantity and alert user

    function addSelItemToCart(item){
        dispatch(addtoCart({
            ...item,
            quantity: selQty
        }));
        alert(`${item.title} added to cart.`);
    }

    return(
        <section className="productDetail">
            <article className="productDetailmain">
                <div className="productDetailImage">
                    {item.images.map((img,idx) =>  (<img key={idx} src={img} alt={item.title}/>))}
                </div>
                <div className="productDetailDesc">
                    <div className="goBack" onClick={() => navigate(-1)}>
                        <img className="productgoBack" src={gobackicon} alt={"GoBackIcon"}/>
                        <span>Go back</span>
                    </div>
                    <div>
                        <h3>{item.category}</h3>
                        <h2>{item.title}</h2>
                        <p>{item.brand}</p>
                        <p>Rating: {item.rating}</p>
                    </div>
                    <hr/>
                    <div>
                        <span className="productDetailDiscount">-{item.discountPercentage}%</span>
                        <span className="productDetailPrice">Rs. {item.price}</span>
                    </div>
                    <div>
                        <span>{item.availabilityStatus} - </span>
                        <span>{item.stock}</span>
                    </div>
                    <div>
                        <span>Minimum order quantity:{` ${item.minimumOrderQuantity}`}</span>
                    </div>
                    <ul className="productDetailInfo">
                        <li>{item.warrantyInformation}</li>
                        <li>{item.shippingInformation}</li>
                        <li>{item.returnPolicy}</li>
                    </ul>
                    <div>
                        <p>
                            {item.description}
                        </p>
                    </div>
                    <hr/>
                    <div className="productSpecification">
                        <h3>Product specifications:</h3>
                        <span>Brand: {item.brand}</span>
                        <span>Category: {item.category}</span>
                        <span>Weight: {item.weight}units</span>
                        <span>Dimensions: {item.dimensions.height}-h x {item.dimensions.width}-w x {item.dimensions.depth}-d</span>
                        <span>Warranty: {item.warrantyInformation}</span>
                        <span>SKU: {item.sku}</span>
                    </div>
                    <hr/>
                    <div className="productSpecification">
                        <span>Tags:       {item.tags?.join(", ")}</span><br/>
                        <span>Created at: {item.meta.createdAt}</span><br/>
                        <span>Updated at: {item.meta.updatedAt}</span><br/>
                        <span>Barcode:    {item.meta.barcode}</span><br/>
                        <span>QR code:</span><img src={item.meta.qrCode} alt={`${item.title} QR code`}/> 	
                    </div>
                    <hr/>
                    <div className="productDetailReview" id="review">
                        <h3>Customer reviews:</h3>
                            {
                                item.reviews.map((rev,idx) => (
                                <div key={idx} className="productDetailReviewItem">
                                    <div className="reviewuser">
                                        <img src={userIcon} height={"20px"} alt={"User"}/>
                                        <h5>Anonymous user {`${idx+1}`}</h5>
                                    </div>
                                    <h4>{rev.comment}</h4>
                                    <p>Rating: {rev.rating} star</p>
                                    <p>Reviewed on: {rev.date}</p>
                                </div>))
                            }
                    </div>
                </div>
                <div className="productDetailAction">
                    <div>
                        <span className="productDetailPrice">Rs. {item.price}</span>
                    </div>
                    <div>
                        <span>{item.availabilityStatus} - </span>
                        <span>{item.stock}</span>
                    </div>
                    <div>
                        <span>{item.shippingInformation}</span>
                    </div>
                        <label htmlFor="selQty">Quantity:</label>
                        <select value={selQty} onChange={e => setSelQty(Number(e.target.value))} name="selQty">
                            {quantityOpt}
                        </select>
                
                    <button onClick={(e) => addSelItemToCart(item)}>Add to cart</button>
                </div>
            </article>
        </section>
    )
}

export default ProductDetail;