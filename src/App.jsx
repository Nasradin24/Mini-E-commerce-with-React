import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './context/Context';
import axios from 'axios';
import './App.css';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import Basket from './pages/Basket';

function App() {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [basket, setBasket] = useState([]);

    const addToCart = (product) => {
        setCartCount(cartCount + 1);
        setBasket([...basket, product]);
    };

    const baseUrl = import.meta.env.VITE_API;

    async function fetchProduct() {
        try {
            const response = await axios.get(baseUrl);
            const list = response.data ? response.data : [];
            setProducts(list);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    const data = {
        products,
        cartCount,
        addToCart,
        basket
    };

    return (
        <Context.Provider value={data}>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/product-detail/:id' element={<ProductDetail />} />
                <Route path='/basket' element={<Basket />} />
            </Routes>
        </Context.Provider>
    );
}

export default App;