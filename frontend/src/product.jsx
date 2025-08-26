import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Product from './components/Product'

export default function ProductPage {
    return(
        <>
        <Router>
            <Routes>
                <Route path="/product/:id" element={<Product/>} />
            </Routes>
        </Router>
        <Product/>
        </>
    );
}