import { useEffect, useState } from "react"

export const CustomerProductsList = ({ searchCustomerTerms }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8089/products/?_sort=name&_order=asc")
                .then(response => response.json())
                .then((data) => {
                    setProducts(data)


                })
        }, [])
    useEffect(
        () => {
            if (searchCustomerTerms) {
                const searchedCandy = products.filter(product => {
                    return product.name.toLowerCase().startsWith(searchCustomerTerms.toLowerCase())

                })

                setFiltered(searchedCandy)
            } else {
                const blank = []
                setFiltered(blank)
            }

        }, [searchCustomerTerms])


    return (<>
        <div
            id="product-container"
            className="products-list">


            {filteredProducts.map((product) => {
                return (
                    <div key={product.id} className="product-card">
                        <div className="product-card-name">{product.name}</div>
                        <div>$ {product.price}</div>

                    </div>
                )
            })}
        </div>
    </>)
}