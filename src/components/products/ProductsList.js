import { useState, useEffect } from "react"


export const ProductsList =({}) => {

    const [products, setProducts] = useState([])
    //useEffect to get initial state of products
    
    useEffect(() => {
      fetch(`http://localhost:8089/products`)
      .then(response => response.json())
      .then((data) => {
      return setProducts(data)
      })
    
    }, [])

    return (
        <>
         <h2>Product List</h2>
        <div
          id="product-container"
          className="products-list">
           
          {products.map((product) => {
            return (
              <div key={product.id} className="product-card">
                <div>{product.name}</div>
                <div>{product.price}</div>
                               
            </div>
            )
          })}
        </div>
        </>
      )
    }