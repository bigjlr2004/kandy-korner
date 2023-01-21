import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../LocationsList"
import { NavBar } from "../nav/NavBar"
import { ProductsList } from "../products/ProductsList"
import { AddNewProductForm } from "../forms/AddNewProduct"

export const ApplicationViews = () => {
	return <>

		<Routes>
			<Route
				path="/"
				element={
					<>
						<NavBar />
						<Outlet />

					</>
				}
			>
				{ } <Route index element=
					{<div className="front_image">
						<img src="https://scontent.cdninstagram.com/v/t51.29350-15/321607807_469614698683208_5679838161625164981_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=wB2MvUDsL_IAX-nEoZh&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AfAZwfuGjlXd5WFQi0DAek_cJ5Ecomx4F_WLToRBeD_ADw&oe=63CE4965"
							alt="Kandy Korner Picture"></img></div>} />
				<Route path="locations" element={<LocationsList />} />
				<Route path="products" element={<ProductsList />} />
				<Route path="addProduct" element={<AddNewProductForm />} />
			</Route>
		</Routes>


	</>
}

