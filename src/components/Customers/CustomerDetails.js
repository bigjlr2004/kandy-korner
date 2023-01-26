import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CustomerDetails = () => {
    const [customer, setCustomer] = useState({})
    const navigate = useNavigate()
    const { customerId } = useParams()

    useEffect(
        () => {
            fetch(`http://localhost:8089/customers/${customerId}?&_expand=user`)
                .then(response => response.json())
                .then((dataObject) => {
                    setCustomer(dataObject)
                })

        }, [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        fetch(`http://localhost:8089/customers/${customer.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                loyaltyNumber: `${customer.loyaltyNumber}`
            })
        }).then(() => {
            setFeedback("Customer profile successfully saved")
        })
    }
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
            setTimeout(() => navigate("/customers"), 1000)
        }
    }, [feedback])

    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <form>
                <div key={customer.id} className="item-card">
                    <div>
                        {customer?.user?.fullName}
                    </div>
                    <div>Customer Email: {customer?.user?.email}</div>
                    <div className="form-group">
                        <label htmlFor="description">Loyalty Rewards Number:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={customer.loyaltyNumber}
                            onChange={
                                (event) => {
                                    const copy = { ...customer }
                                    copy.loyaltyNumber = event.target.value
                                    setCustomer(copy)
                                }
                            } />
                    </div>
                    <button
                        onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                        className="btn btn-primary">
                        Update
                    </button>
                </div>
            </form></>
    )
}