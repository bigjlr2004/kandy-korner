import { useEffect, useState } from "react"

export const CustomerProductsList = ({ searchCustomerTerms }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

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

    const handlePurchaseButtonClick = (event) => {
        event.preventDefault()
        const newPurchase = {
            userId: kandyUserObject.id,
            productId: event.target.value,
            date: new Date()
        }

        return fetch('http://localhost:8089/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPurchase),
        })
            .then(response => response.json())
            .then(() => {

            })

    }



    return (<>
        <div
            id="product-container"
            className="products-list">


            {filteredProducts.map((product) => {
                return (
                    <div key={product.id} className="product-card">
                        <div className="product-card-name">{product.name}</div>
                        <div>$ {product.price}</div>
                        <button value={product.id}
                            onClick={(clickEvent) => { handlePurchaseButtonClick(clickEvent) }}
                            className="btn btn-primary">
                            Purchase
                        </button>
                    </div>
                )
            })}
        </div>
    </>)
}