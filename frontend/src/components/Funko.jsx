import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../App.css'
import swal from 'sweetalert2'

export default function Funko() {
    const [funkos, setFunkos] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()
     useEffect(() => {
        fetch("http://127.0.0.1:8000/api/funko")
        .then((res) => res.json())
        .then((data) => setFunkos(data))
        .catch((err) => console.log("cant fetch data", err));
     }, []);

const AddFunkoToCart = (productId, productName) => {
  const token = localStorage.getItem("access")

  if(!token) {
    swal.fire({
      text: "You need to login to add items in your cart",
      title: "Login Required",
      icon: "warning",
      confirmButtonColor: "#880808"
    }).then(() => {
      navigate("/")
    });
    return
  }
  

  fetch("http://127.0.0.1:8000/api/cart/add/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include",
    body: JSON.stringify({
      funko_id: productId,
      quantity: 1
    }),
  })
    .then((res) => {
      if (res.status == 401) {
        swal.fire({
          title: "Login Required",
          text: "Login to add items in cart",
          icon: "warning",
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
          title: "Success",
          icon: "success",
          text: `${productName} is added to cart`,
          confirmButtonColor: "#880808"
        })
      
      console.log("Respone: ", data)
      }
    })
    .catch((err) => console.error("Error", err))

}
 return(
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
        <button className="cart-btn" onClick={() => {
          handleAddToCart(costume.id);
        }}>
          <img src="./src/assets/icons8-cart-30.svg" className="cart-img"/></button>
        </Link>
        <h1>Spider-Man Merchandise</h1>
        
        
      </div>

      <div className="funkos-container">
        <div className="funkos-grid">
            {funkos.map (funko => (
                <div key={funko.id} className="funko-card">
                    {funko.image && (
                        <img
                            src={`http://127.0.0.1:8000/${funko.image}`}
                            alt={funko.name}
                            className="funko-img"/>
                    )}
                    <div className="funko-title">
                        <h3 className="funko-name">{funko.name}</h3>
                    </div>
                    <div className="funko-info">
                        <p className="funko-price">${funko.price}</p>
                        <p className="funko-type">{funko.product_type}</p>
                    </div>
                    <button className="add-funko-btn" onClick={() => AddFunkoToCart(funko.id, funko.name)}>Add To Cart</button>
                </div>
            ))}
        </div>
      </div>
    </>
 )
}