import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data';
import SuggestedProduct from "../components/Products/SuggestedProduct"
const ProductDetailsPage = () => {
    const { name } = useParams();
    const [data, setData] = useState(null);
    const productName = name.replace(/-/g, "");

    useEffect(() => {
        // Find the product data based on the product name
        const product = productData.find((i) => i.name === productName);
        // Set the product data to state
        setData(data);
    }, [productName]); // Add productName to dependency array to re-run effect when it changes

    // Check if data is null or undefined before rendering ProductDetails
    if (!data) {
        // Return a loading indicator or appropriate message
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header/> 
            {/* Pass the data prop to the ProductDetails component */}
            <ProductDetails data={data}/>
            {
                data && <SuggestedProduct data={data} />
            }
            <Footer/>
        </div>
    );
};

export default ProductDetailsPage;
