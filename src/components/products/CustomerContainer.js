import { useState } from "react"
import { CustomerProductSearch } from "./CustomerProductSearch"
import { CustomerProductsList } from "./CustomerProductsList"


export const CustomerContainer = () => {
    const [searchCustomerTerms, updateCustomerSearchTerms] = useState("")

    return <>
        <CustomerProductSearch updateCustomerSearchTerms={updateCustomerSearchTerms} />
        <CustomerProductsList searchCustomerTerms={searchCustomerTerms} />
    </>
}