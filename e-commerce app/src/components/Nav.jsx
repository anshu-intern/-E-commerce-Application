import { useMemo } from "react";
import "./Nav.css";
import useProducts from "../hooks/useProducts";
import { Link } from "react-router-dom";

function Nav(){
    // Fetch products using custom hook
    const {products, loading, error} = useProducts(`https://dummyjson.com/products`);

    // Extract unique categories from products using useMemo for performance optimization
    const category = useMemo(() => {
        if(!products) return [];

        return products.reduce((acc,curItem)=> {
            if(!acc.includes(curItem.category))
            {
                acc.push(curItem.category)
            }
            return acc;
        },[]);
    }, [products]);

    // Show error message if fetching products failed

    if(error)
    {
        return <div>Failed to load categories</div>;
    }

    // Show loading message while products are being fetched

    if(loading){
        return <div>Loading categories...</div>;
    }
    
    
    return(
        <nav>
            <ul className="nav-bar">
                <Link className="navLink" to={"/products/all"}>
                    <div className="list-div">
                        <li className="listItem">All</li>
                    </div>
                </Link>
                {
                    category.map((item,index)=> (
                        <Link key={index} className="navLink" to={`/products/${item}`}>
                            <div className="list-div">
                                <li className="listItem">{item}</li>
                            </div>
                        </Link>
                        )
                    )
                }
            </ul>
        </nav>
    )
}

export default Nav;