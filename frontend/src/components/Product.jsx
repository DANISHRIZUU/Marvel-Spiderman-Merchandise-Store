import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import '../App.css'
import swal from "sweetalert2";


export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/view/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

const handleAddToCart2 =(productId) => {
    
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
                    text: `${product.name} is added to cart`,
                    icon: 'success',
                    confirmButtonColor: "#880808"
                  });
        console.log("Response:", data);
        }
        
      })
      .catch((err) => console.error("Error:",  err));
}
    

  if (!product) return <p>Loading....</p>;

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
        <img src="/src/assets/marvel.svg" alt="Marvel Logo" />
        </Link>
        <h1>Spider-Man Merchandise</h1>
      </div>

      

      <div className="costume-container">
        <div className="costume-grid">
          <div className="costume-card">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="costume-image"
              />
            )}

            <div className="costume-title">
              <h3 className="costume-name">{product.name}</h3>
            </div>

            <div className="costume-info">
              <p className="costume-description">{product.description}</p>
              <p className="costume-price">Price: ${product.price}</p>
              <p className="costume-size">Size: {product.size}</p>
              <p className="costume-material">Material: {product.material}</p>

              {product.is_from_movie && (
                <p className="costume-movie">Movie: {product.movie_name}</p>
              )}

              <p className="costume-stock">
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : `Out of Stock`}
              </p>

              <div className="costume-footer">
                <button className="add-to-cart-btn" onClick={() => {
                  handleAddToCart2(product.id, product.name)
                }}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}