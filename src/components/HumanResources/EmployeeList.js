import { useEffect, useState } from "react"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    useEffect(
        () => {
            fetch("http://localhost:8089/employees/?&_expand=user&_expand=location")
                .then(response => response.json())
                .then((data) => {
                    return setEmployees(data)

                })
        }, [])


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