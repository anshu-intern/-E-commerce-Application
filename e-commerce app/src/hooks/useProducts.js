//// Custom hook to fetch product data from an API.

import { useState, useEffect } from "react";

function useProducts(apiURL){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try{
                const resp = await fetch(apiURL);
                const resp_json = await resp.json();
                setError(null);
                setProducts(resp_json.products);
            } catch(err) {
                setError(err || `failed to fetch data!`);
                setProducts([]);
            } finally {
                setLoading(false);
            } 
        }

        fetchData();
        
    },[apiURL]);

    return {products, loading, error};
}

export default useProducts;