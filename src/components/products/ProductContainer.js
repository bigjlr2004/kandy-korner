import { useState } from "react"
import { ProductSearch } from "./ProductSearch"
import { ProductsList } from "./ProductsList"

export const ProductContainer = () => {
    const [searchTerms, updateSearchTerms] = useState("")

    return <>
        <ProductSearch updateSearchTerms={updateSearchTerms} />
        <ProductsList searchTerms={searchTerms} />
    </>
}