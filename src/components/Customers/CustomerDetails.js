import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const [customer, setCustomer] = useState({})

    const { customerId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8089/customers/${customerId}?&_expand=user`)
                .then(response => response.json())
                .then((dataObject) => {
                    setCustomer(dataObject)
                })

        }, [])
    return (
        <div key={customer.id} className="item-card">
            <div>
                {customer?.user?.fullName}
            </div>
            <div>Loyalty Rewards Number: {customer.loyaltyNumber}</div>
            <div>Customer Email: {customer?.user?.email}</div>
        </div>
    )
}