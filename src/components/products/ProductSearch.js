export const ProductSearch = ({ updateSearchTerms }) => {
    return (
        <>
            <div>
                <div className="list_heading">Kandy List
                    <input className="search"
                        type="text"
                        placeholder="Enter search terms"
                        onChange={
                            (changeEvent) => {
                                updateSearchTerms(changeEvent.target.value)
                            }
                        }
                    />
                </div>
            </div>
        </>
    )
}