import "./ProductList.css";
import searchIcon from "../assets/searchIcon.png";
import ProductItem from "./ProductItem";
import useProducts from "../hooks/useProducts";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductList(){
   const API = `https://dummyjson.com/products`;

   // Custom hook to fetch products, returns products, loading and error state
   const {products, loading, error} = useProducts(API);

   const [cat, setCat] = useState([]);
   const [searchItem, setSearchItem] = useState('');
   const [list, setList] = useState([]);
   const {category} = useParams();
   const location = useLocation();

   // Effect to update product list based on product, category and route changes

   useEffect(() => {
    if(category === "all" || !category )
    {
        setCat(products);
        setList(products);
    }
    else{
        let arr = products.filter(a => a.category.toLowerCase() === category.toLowerCase() );
        setCat(arr);
        setList(arr);
    }
    setSearchItem('');
   },[products,category,location.key]);

   // Show loading or error states
   if(loading) return(<><h1>Loading...</h1><br/><h2>Please wait...</h2></>);
   if(error) return(<><h1>Error loading contents</h1><br/><p>Error: {error.toString()}</p></>);

   // Function to filter products based on search input
   
   function handleSearch(){
    const filterItem = cat.filter(item => item.title.toLowerCase().includes(searchItem.toLowerCase()));
    setList(filterItem);
   }

    return(
        <section className="productList">
                <div className="productListSearch">
                    <input type="text" placeholder="Search ShoppyGlobe for your favourite products..." onChange={e => setSearchItem(e.target.value)} onKeyDown={e => {if(e.key ==='Enter') handleSearch()}} value={searchItem}/>
                    <button className="search" onClick={handleSearch} onKeyDown={e => {if(e.key ==='Enter') handleSearch()}}><img className="searchIcon" src={searchIcon}/></button>
                </div>
                {
                        list.length === 0 ? <h1>No items found!</h1> : (
                            <>
                            <div className="productListhead">
                                <h3 className="productListCat">{!category? "All" : category}</h3>
                                <h4>Results</h4>
                                <p>Check each product page for detailed options. Price and other details may vary based on product size and colour or other options.</p>
                            </div>
                            <div className="productListmain">
                                {
                                    list.map((prod,index) => (<ProductItem key={prod.id} item={prod} />))
                                }
                            </div>
                            <h3 className="productListFoot">That's all we have for today. We keep updating our products daily. Check for new products tomorrow!</h3>
                            </>
                        )
                }    
        </section>
    )
}

export default ProductList;