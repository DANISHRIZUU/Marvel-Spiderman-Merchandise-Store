import { data } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cart/')
        .then((res) => res.json())
        .then((data) => setCart(data))
        .catch((err) => console.error("Error fetching data", err));
    }, []);
    return (
        <>
          <div className="navbar">
            <img src="/src/assets/marvel.svg" alt="Marvel Logo" />
            <h1>Spider-Man Merchandise</h1>
          </div>
          <div className="cart-container">
            
                {cart && cart.map(item => (
                    <div key={item.id} className="cart-item">
                        {item.costume.image && (
                            <img className="cart-img" src={`http://127.0.0.1:8000/${item.costume.image}`} alt={item.costume.name} />
                            )}
                            <div className="cart-product-name">
                              <h4>{item.costume.name}</h4>
                            </div>
                            <div className="cart-price">
                              <p>${item.costume.price}</p>
                            </div>
                            <button className="buy-btn">
                              Buy
                            </button>
                    </div>
                    
                ))}

          </div>
          <button className="buy-all-btn">Buy All</button>
        </>
    )

}