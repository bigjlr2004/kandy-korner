import { useState, useEffect } from "react"

export const LocationsList =() => {

  const [locations, setLocation] = useState([])
  //useEffect to get initial state of locations
  
  useEffect(() => {
    fetch(`http://localhost:8089/locations`)
    .then(response => response.json())
    .then((data) => {
    return setLocation(data)
    })
  
  }, [])

    return (
        <div
          id="items-container"
          className="locations-list">
          {locations.map((location) => {
            return (
              <div key={location.id} className="item-card">
                <div>{location.name}</div>
                <div>{location.address}</div>
                <div>Square Footage: {location.squareFootage} ft.</div>               
            </div>
            )
          })}
        </div>
      )
    }