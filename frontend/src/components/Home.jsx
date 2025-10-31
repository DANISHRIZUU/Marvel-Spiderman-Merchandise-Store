import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import '../App.css'
import swal from "sweetalert2"



export default function Home() {
    const [ costumes, setCostumes] = useState([]);
    const [ showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate();

      useEffect(() => {
    fetch("http://127.0.0.1:8000/api/costumes/") // tumhara Django endpoint
      .then((res) => res.json())
      .then((data) => setCostumes(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  
const handleAddToCart =(productId, productName) => {
    
    const token = localStorage.getItem("access");
    
    if(!token) {
      swal.fire({
        title: "Login Required",
        icon: "warning",
        text: "Login To Add Items In Your Cart",
        confirmButtonColor: "#880808"
      }).then(() => {
        navigate("/")
      });
      return;
    }

    fetch("http://127.0.0.1:8000/api/cart/add/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify({
            costume_id: productId,
            quantity: 1
        }),
    })
      .then((res) => {
        if(res.status == 401) {
          swal.fire({
            title: "Login Required",
            icon: "warning",
            text: "Login to add items in your cart",
            confirmButtonColor: "#880808"
          }).then(() => {
            navigate("/")
          });
        
          return null;
                 
        }
        return res.json();
      })
      .then((data) => {
        if(data) {
          swal.fire({
                    title: 'Yahooo!',
                    text: `${productName} is added to cart`,
                    icon: 'success',
                    confirmButtonColor: "#880808"
                  });
        console.log("Response:", data);
        }
        
      })
      .catch((err) => console.error("Error:",  err));
}
    
  return (
    <>
    
      <div className="navbar">
        <Link to={'/'}>
        <img src="/src/assets/marvel.svg" alt="Marvel Logo"/>
        </Link>
        <Link to={'/login'}>
        <button className="login-btn">Login</button>
        </Link>
        <Link to={'/register'}>
        <button className="register-btn">Register</button>
        </Link>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('access');
        }}>Logout</button>
        <Link to={'/cart/view'}>
        <button className="cart-btn">
          <img src="./src/assets/icons8-cart-30.svg" className="cart-img"/></button>
          </Link>
        <h1>Spider-Man Merchandise</h1>
        
        
      </div>
      
      
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
                handleAddToCart(costume.id, costume.name);
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
        <div className='funko-poster'>
          <img className='poster-img' src='/src/assets/marvels-spider-man-2-review_he96.jpg'/>
          <div className="overlay">
            <img className="funko-logo" src="https://funko.com/on/demandware.static/Sites-FunkoUS-Site/-/default/dw177007c5/images/funko/svg/site-logo.svg"/>
            <Link to={'/funko'}>
            <button className="shopnow-btn">Shop Now</button>
            </Link>
          </div>
                
        </div>
      </div>
      
    </>
  )
}