import { data, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert2";

export default function Cart() {
    const [cart, setCart] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cart/')
        .then((res) => res.json())
        .then((data) => setCart(data))
        .catch((err) => console.error("Error fetching data", err));
    }, []);
    function removeFromCart(id) {
      fetch(`http://127.0.0.1:8000/api/cart/${id}/`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("product removed from cart");
          }
          else {
            console.error("failed to remove item")
          }

        })
        .catch((error) =>{
          console.error("Error:", error)
        });
    }
    function handleBuyAll() {
      if(cart) {
        cart.forEach(item => {
          handleOrderTaking(item)
        })
      }
    }
    function handleOrderTaking(item) {
      // debugging logs
      console.log("order item", item.costume);
      console.log("Costume object:", item.costume);
      console.log("costume id", item?.costume?.id)
      fetch("http://127.0.0.1:8000/api/order/",{
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          "costume_id" : item.costume.id,
          "quantity": 1
        }),
    })
    .then ((res) => res.json())
    .then ((data) => {
      console.log("Response:", data);
    })
    .catch((err) => console.error("Error: ", err));
  }

    const total = cart ? cart.reduce((sum, item) => sum + parseFloat(item.costume.price), 0): 0
    return (
        <>
        
          <div className="navbar">
            <Link to={'/'}>
            <img src="/src/assets/marvel.svg" alt="Marvel Logo" />
            </Link>
            <h1>Spider-Man Merchandise</h1>
          </div>
          <div className="cart-container">
            
                {cart && cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <button className="delete-btn" onClick={() => {
                          removeFromCart(item.id);
                        }}>X</button>
                        {item.costume.image && (
                            <img className="cart-img" src={`http://127.0.0.1:8000/${item.costume.image}`} alt={item.costume.name} />
                            )}
                            <div className="cart-product-name">
                              <h4>{item.costume.name}</h4>
                            </div>
                            <div className="cart-price">
                              <p>${parseInt(item.costume.price)}</p>
                            </div>
                            <button className="buy-btn" onClick={() => {
                              swal.fire({
                                title: "Transaction Successfull!🎉",
                                text: `${item.costume.name} is on the way to your destination, we'll reach out to you soon`,
                                icon: 'success',
                                confirmButtonColor: '#880808'
                              });
                              handleOrderTaking(item);
                            }}>
                              Buy
                            </button>
                    </div>
                    
                ))}

          </div>
          { cart && cart.length > 0 && (
                   <button className="buy-all-btn" onClick={() => {
                    swal.fire({
                      title: "Transaction Successful of All Items!🎉",
                      icon: "success",
                      confirmButtonColor: '#880808'
                    });
                    handleBuyAll();
                   }}>                    Buy All
                  <h5>Total : {"$" + total}</h5></button>           
                            )}
          
          
        </>
    )

}