import { useEffect, useState } from "react";

export default function Product{
    const { id } = useParams();
    const [ products, setProducts ] = useState([]);

     useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/view/${id}`) // yahan se data uthaae ga  
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching data:", err));
    }, [id]);
    if (!product) return <p>Loading....</p>

    return (
        <><div className="navbar">
            <img src="/src/assets/marvel.svg" alt="Marvel Logo"></img>
            <h1>Spider-Man Merchandise</h1>
        </div>
        </>
    )
}