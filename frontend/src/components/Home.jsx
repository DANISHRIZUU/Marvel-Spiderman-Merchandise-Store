import { useEffect, useState } from "react"


export default function Home() {
    const [ costumes, setCostumes] = useState([]);

      useEffect(() => {
    fetch("http://127.0.0.1:8000/api/costumes/") // tumhara Django endpoint
      .then((res) => res.json())
      .then((data) => setCostumes(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);


    
  return (
    <>
      <div className="navbar">
        <img src="/src/assets/marvel.svg" alt="Marvel Logo"/>
        <h1>Spider-Man Merchandise</h1>
        
      </div>
      <h2>Available Costumes</h2>
      <div className="products-container">
        

        <div className="products-grid">
          {costumes.map(costume => (
            <div key={costume.id} className="product-card">
              {costume.image && (
                <img 
                  src={costume.image}
                  alt={costume.name}
                  className="product-image"
                />
              )}
              <div className="product-title">
                <h3 className="product-name">{costume.name}</h3>
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
                    : `Out of Stock`
                  }
                </p>
              </div>
              <div className="product-footer">
                <button className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
