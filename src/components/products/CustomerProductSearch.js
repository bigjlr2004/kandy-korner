export const CustomerProductSearch = ({ updateCustomerSearchTerms }) => {
    return (
        <>
            <div>
                <div className="list_heading">
                    <input className="customer_search"
                        type="text"
                        placeholder="What candy are you looking for?"
                        onChange={
                            (changeEvent) => {
                                updateCustomerSearchTerms(changeEvent.target.value)
                            }
                        }
                    />
                </div>
            </div>
        </>
    )
}