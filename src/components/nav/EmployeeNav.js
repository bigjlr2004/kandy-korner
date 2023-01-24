import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = ({ locations, setLocation }) => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    const HandleDisplayButtonClick = () => {
        return fetch(`http://localhost:8089/locations`)
            .then(response => response.json())
            .then((data) => {
                setLocation(data)
            })



    }
    const navigate = useNavigate()

    return (

        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Home</Link></li>

            <li className="navbar__item">
                <Link className="navbar__link" to="locations">Locations</Link></li>
            <li className="navbar__item">
                <Link className="navbar__link" to="products">Products </Link>    </li>
            <li className="navbar__item">
                <Link className={`navbar__link ${(!kandyUserObject.staff) ? "active" : ""}`} to="addProduct">Add Product </Link>    </li>
            <li className="navbar__item">
                <Link className={`navbar__link ${(!kandyUserObject.staff) ? "active" : ""}`} to="newEmployee">Human Resources </Link>    </li>


            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}