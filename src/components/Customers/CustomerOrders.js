import { useEffect, useState } from "react"

export const CustomerOrders = () => {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFiltered] = useState([])
    const [userName, setUserName] = useState()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    useEffect(() => {
        fetch(`http://localhost:8089/purchases/?&_expand=user&_expand=product`)
            .then(response => response.json())
            .then((orderData) => {
                setOrders(orderData)
            })
        fetch(`http://localhost:8089/users/${kandyUserObject.id}`)
            .then(response => response.json())
            .then((returnedUser) => {
                setUserName(returnedUser.fullName)
            })

    }, [])
    useEffect(() => {
        const filteredArray = orders.filter(order => order.userId === kandyUserObject.id)
        setFiltered(filteredArray)

    }, [orders])


    return <>
        <div className="user__purchase">{userName} you purchased the following items.</div>
        <div
            id="product-container"
            className="products-list">


            {filteredOrders.map((order) => {
                return (
                    <div key={order.id} className="product-card">
                        <div className="product-card-name">{order.product.name}</div>
                        <div>$ {order.product.price}</div>

                    </div>
                )
            })}
        </div>
    </>

}