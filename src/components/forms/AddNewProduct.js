import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const AddNewProductForm = () => {
    const [types, setType] = useState([])
    const navigate = useNavigate()

    const [userChoices, setUserChoices] = useState({
        name: '',
        price: '',
        typeId: 0
    })

    useEffect(() => {
        fetch(`http://localhost:8089/types`)
            .then(response => response.json())
            .then((data) => {
                return setType(data)
            })

    }, [])

    const handleAddCandy = (event) => {
        event.preventDefault()
        if (
            userChoices.name &&
            userChoices.price &&
            userChoices.typeId
        ) {
            fetch('http://localhost:8089/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userChoices),
            }).then(() => {
                fetch('http://localhost:8089/products') // After posting a new item, we made a fetch call to get the products from out database
                    .then((res) => res.json())
                    .then((data) => {
                        navigate('/products')
                        setUserChoices({
                            name: '',
                            price: '',
                            typeId: 0
                        })
                    })

            })
        } else { alert(`Please complete the form`) }

    }



    return (
        <form className="product-form">
            <h2>Kandy Korner Newbie</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={userChoices.name}
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.name = event.target.value
                            setUserChoices(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price: </label>
                    <input
                        required
                        id="price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="Price for example 2.50"
                        value={userChoices.price}
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.price = event.target.value
                            setUserChoices(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div id="candy-type-selector">
                    <select
                        className="type-box"
                        value={userChoices.typeId}
                        id="type-select"
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.typeId = parseInt(event.target.value)
                            setUserChoices(copy)
                        }
                        }
                    >
                        <option>Choose a Kandy Type</option>
                        {types.map((type) => {
                            return (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            )
                        })}
                    </select>
                </div>

            </fieldset>
            <button
                className="btn"
                onClick={(event) => {
                    handleAddCandy(event)
                }}
            >
                Add Candy
            </button>



        </form>
    )
}
