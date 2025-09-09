import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import '../App.css'
import swal from "sweetalert2"

export function handleAddToCart(productId) {
    fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            costume_id: productId,
            quantity: 1
        }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((err) => console.error("Error:",  err));
}
    

export default function Home() {
    const [ costumes, setCostumes] = useState([]);
    const [ showAlert, setShowAlert] = useState(false)

      useEffect(() => {
    fetch("http://127.0.0.1:8000/api/costumes/") // tumhara Django endpoint
      .then((res) => res.json())
      .then((data) => setCostumes(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  

  return (
    <>
    
      <div className="navbar">
        <Link to={'/'}>
        <img src="/src/assets/marvel.svg" alt="Marvel Logo"/>
        </Link>
        <Link to={'/cart/view'}>
        <button className="cart-btn" onClick={() => {
          handleAddToCart(costume.id);
        }}>
          <img src="./src/assets/shopping-cart-outline-svgrepo-com.svg" className="cart-img"/></button>
          </Link>
        <h1>Spider-Man Merchandise</h1>
        
        
      </div>
      <h2>Available Costumes</h2>
      
      <div className="products-container">
        

        <div className="products-grid">
          {costumes.map(costume => (
            
              <div key={costume.id} className="product-card">
                {costume.image && (
                  <Link to={`/product/${costume.id}`}>
                  <img
                    src={costume.image}
                    alt={costume.name}
                    className="product-image" />
                  </Link>
                )}
                  
                <div className="product-title">
                  <Link to={`/product/${costume.id}`}>
                  <h3 className="product-name">{costume.name}</h3>
                  </Link>
                </div>
              
            <div className="product-info">
                <p className="product-price">${costume.price}</p>
                <p className="product-size">Size: {costume.size}</p>
                <p className="product-material">Material: {costume.material}</p>
                {costume.is_from_movie && (
                  <p className="product-movie">Movie: {costume.movie_name}</p>
                )}
                <p className="product-stock">
                  {costume.stock_quantity > 0
                    ? `In Stock (${costume.stock_quantity} available )`
                    : `Out of Stock`}
                </p>
              </div>
              <div className="product-footer">
                <button className="add-to-cart-btn" onClick={() => {
                  swal.fire({
                    title: 'Yahooo!',
                    text: `${costume.name} is added to cart`,
                    icon: 'success',
                    confirmButtonColor: "#880808"
                  });
                handleAddToCart(costume.id);
                }}> 
                  Add to Cart
                </button>
                {showAlert && (
                  <div className="alert alert-primary" role="alert">
                    (`${costume.name}is Added to cart`); 
                  </div>
                )}
                
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  )
}