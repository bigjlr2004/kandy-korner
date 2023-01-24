import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeHireForm = () => {
    const navigate = useNavigate()
    const [locations, setLocations] = useState([])
    const [newUser, setNewUser] = useState({

        fullName: "",
        email: "",
        isStaff: "True"

    })
    const [newEmployee, setNewEmployee] = useState({
        userId: "",
        startDate: "",
        payRate: "",
        locationId: "",
    })

    useEffect(() => {
        fetch(`http://localhost:8089/locations`)
            .then(response => response.json())
            .then((data) => {
                return setLocations(data)
            })
    }, [])

    const handleAddEmployee = (event) => {
        event.preventDefault()
        if (
            newEmployee.startDate &&
            newEmployee.payRate &&
            newEmployee.locationId &&
            newUser.fullName &&
            newUser.email
        ) {
            fetch('http://localhost:8089/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            }).then((response) => response.json())
                .then((returnedData) => {
                    const copy = { ...newEmployee }
                    copy.userId = returnedData.id
                    setNewEmployee(copy)
                    console.log(copy)
                    console.log(newEmployee)
                    fetch('http://localhost:8089/employees', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(copy),
                    })
                    navigate("/employees")
                })





        } else { alert(`Please complete the form`) }

    }


    return (

        <div className="employeeForm">
            <form autoComplete="off" className="product-form">
                <h2>Kandy Korner New Employee</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name"> Employee Name: </label>
                        <input
                            required
                            id="fullName"
                            type="text"
                            className="form-control"
                            placeholder="Employee Name"
                            value={newUser.fullName}
                            onChange={(event) => {
                                const copy = { ...newUser }
                                copy.fullName = event.target.value
                                setNewUser(copy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email"> Email Address: </label>
                        <input
                            required
                            id="email"
                            type="text"
                            className="form-control"
                            placeholder="example@example.com"
                            value={newUser.email}
                            onChange={(event) => {
                                const copy = { ...newUser }
                                copy.email = event.target.value
                                setNewUser(copy)
                            }}
                        />
                    </div>
                </fieldset>       <fieldset>
                    <div className="form-group">
                        <label htmlFor="startdate"> Start Date: </label>
                        <input
                            required
                            id="startDate"
                            type="date"
                            className="form-control"
                            placeholder="Start Date"
                            value={newEmployee.startDate}
                            onChange={(event) => {
                                const copy = { ...newEmployee }
                                copy.startDate = event.target.value
                                setNewEmployee(copy)
                            }}
                        />
                    </div>
                </fieldset>       <fieldset>
                    <div className="form-group">
                        <label htmlFor="payrate"> Pay Rate: </label>
                        <input
                            required
                            id="payrate"
                            type="number"
                            className="form-control"
                            placeholder="Pay Rate"
                            min="0"
                            value={newEmployee.payRate}
                            onChange={(event) => {
                                const copy = { ...newEmployee }
                                copy.payRate = event.target.value
                                setNewEmployee(copy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div id="candy-type-selector">
                        <select
                            className="type-box"
                            value={newEmployee.location}
                            id="location-select"
                            onChange={(event) => {
                                const copy = { ...newEmployee }
                                copy.locationId = parseInt(event.target.value)
                                setNewEmployee(copy)
                            }
                            }
                        >
                            <option>Choose a Location</option>
                            {locations.map((location) => {
                                return (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                </fieldset>
                <button
                    className="btn"
                    onClick={(event) => {
                        handleAddEmployee(event)
                    }}
                >
                    Add Employee
                </button>



            </form>
        </div>

    )
}