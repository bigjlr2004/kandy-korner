import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8089/customers/?&_expand=user`)
            .then(response => response.json())
            .then((data) => {
                return setCustomers(data)
            })
    }, [])
    return (
        <div
            id="items-container"
            className="locations-list">
            {customers.map((customer) => {
                return (
                    <div key={customer.id} className="item-card">
                        <div>
                            <Link to={`${customer.id}`}>{customer?.user?.fullName}</Link>
                        </div>
                        <div>Loyalty Rewards Number: {customer.loyaltyNumber}</div>
                    </div>
                )
            })}
        </div>
    )
}