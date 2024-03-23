import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [page, setPage] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setProducts(data);
          setIsLoading(false); // Update loading state after fetching
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch products only if products state is empty
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products]); // Include products in dependency array to prevent unnecessary re-fetching
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <div className="App">
      {isLoading ? ( // Display loading message while fetching data
        <div>Loading...</div>
      ) : (
        <div className="products">
          {products.slice(page * 5 - 5, page * 5).map((product, id) => (
            <div key={id} className="product_single">
              <img src={product.category.image} alt={product.category.name} />
              <span>{product.title}</span>
            </div>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination_disabled"}
          >
            {" "}
            ◀️{" "}
          </span>

          {[...Array(products.length / 10)].map((e, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination_selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination_disabled"}
            onClick={() => selectPageHandler(page + 1)}
          >
            {" "}
            ▶️{" "}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;

// http://universities.hipolabs.com/search?country=United+States
// https://fakestoreapi.com/products
// https://dummyjson.com/products?limit=100
// https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json
