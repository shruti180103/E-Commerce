import React from 'react'
import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {LoginPage, SignupPage,HomePage, ProductPage,BestSellingPage,EventsPage,FAQPage} from "./Routes.js";
import ProductCard from './components/Route/ProductCard/ProductCard.jsx';

const App = () => {
  return (
  <BrowserRouter> 
  <Routes>
    <Route path = "/" element={<HomePage/>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/sign-up" element={<SignupPage />} />
    <Route path="/products" element = {<ProductPage/>}/>
    <Route path="/best-Selling" element = {<BestSellingPage/>}/>
    <Route path="/events" element = {<EventsPage/>}/>
    <Route path="/faq" element = {<FAQPage/>}/>

  </Routes>
  </BrowserRouter>
  )
}

export default App 