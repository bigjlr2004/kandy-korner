import { useEffect, useState } from "react"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    const getAllEmployees = () => {
        fetch("http://localhost:8089/employees/?&_expand=user&_expand=location")
            .then(response => response.json())
            .then((data) => {
                return setEmployees(data)

            })
    }

    useEffect(
        () => {
            getAllEmployees()
        }, [])

    const deleteButton = (userId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8089/users/${userId}`, {
                method: "DELETE"
            })
                .then(() => {
                    getAllEmployees()
                })

        }} className="ticket__finish">Delete</button>

    }


    return (
        <>
            <div className="list_heading">
                Kandy Korner Employee List
            </div>
            <div className="employee-card">
                {employees.map((employee) => {
                    return (
                        <div key={employee.id}>
                            <div >{employee?.user?.fullName}</div>
                            {deleteButton(employee.userId)}
                            <ul>
                                <li>Location: {employee?.location?.name}</li>
                                <li>Started: {employee.startDate}</li>
                            </ul>
                        </div>

                    )
                }
                )}

            </div>

        </>

    )

}