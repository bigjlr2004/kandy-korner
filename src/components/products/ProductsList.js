import { useState, useEffect } from "react"



export const ProductsList =({}) => {
  const localKandyUser = localStorage.getItem("kandy_user")
  const kandyUserObject = JSON.parse(localKandyUser)
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [topShelf, setTopShelf] = useState(false)

    useEffect(() => {
      fetch("http://localhost:8089/products/?_sort=name&_order=asc&_expand=type")
      .then(response => response.json())
      .then((data) => {
      return setProducts(data)
      
      })
    
    }, [])

    useEffect(() => {
      if (!topShelf) {
      setFiltered(products)
      } else  {
        const  topShelfArray = products.filter(product => product.price > 2.00)
        console.log(topShelfArray)
        console.log(kandyUserObject.staff)
        setFiltered(topShelfArray)

      }
    }, [products, topShelf])

    return (
        <>
        <div className="heading_container">
         <div className="list_heading">Kandy List</div>
          <button className={`top__btn ${(!kandyUserObject.staff) ? "active" : ""}`} onClick={() => { setTopShelf(true) }}>Top Shelf Candy</button>
          <button className={`top__btn ${(!kandyUserObject.staff) ? "active" : ""}`} onClick={() => { setTopShelf(false) }}>All Candy</button>
        </div>
        <div
          id="product-container"
          className="products-list">
           
          {filteredProducts.map((product) => {
            return (
              <div key={product.id} className="product-card">
                <div className="product-card-name">{product.name}</div>
                <div>{product.type?.name}</div>
                <div>$ {product.price}</div>
                               
            </div>
            )
          })}
        </div>
        </>
      )
    }