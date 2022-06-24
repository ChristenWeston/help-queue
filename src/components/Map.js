import React, { useState, useRef } from "react";
import { 
    GoogleMap, 
    withScriptjs, 
    withGoogleMap, 
    Marker,
    InfoWindow,
    DirectionsRenderer
} from "react-google-maps";
import properties from "./Properties.json";
import MapDirectionsRenderer from './Directions';

function MapComponent() {
    const [selectedProperty, setSelectedProperty] = useState(null);

    // function Directions() {
      
        const [map, setMap] = useState(/** @type google.maps.Map */ (null))
        const [directionsResponse, setDirectionsResponse] = useState(null)
        const [distance, setDistance] = useState('')
        const [duration, setDuration] = useState('')
      
        /** @type React.MutableRefObject<HTMLInputElement> */
        const originRef = useRef()
        /** @type React.MutableRefObject<HTMLInputElement> */
        const destiantionRef = useRef()
      
      async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
          return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: originRef.current.value,
          destination: destiantionRef.current.value,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
      }
      
      function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
      }
      // }

    return (
        <GoogleMap 
            defaultZoom={12}
            defaultCenter={{ lat: 45.50369791922873, lng: -122.58457242648787 }}
        >
            {properties.map(property => (
                <Marker 
                    key={property.id} 
                    position={{
                        lat: property.lat, 
                        lng: property.lng
                    }}
                    icon={{
                        url: "https://i.imgur.com/FpHIBa7.png",
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                    onClick ={() => {
                        setSelectedProperty(property);
                    }}
                />
            ))}

            {selectedProperty && (
                <InfoWindow
                    position={{
                        lat: selectedProperty.lat, 
                        lng: selectedProperty.lng
                    }}
                    onCloseClick={() => {
                        setSelectedProperty(null);
                    }}
                >
                    <div>
                        <h4>{selectedProperty.name}</h4>
                    </div>
                </InfoWindow>

            )}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <input type='text' placeholder='Origin' ref={originRef} />
          <input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            <button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </button>
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

function Map() {
    return (
        <WrappedMap 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height:"100%"}} />}
            containerElement={<div style={{ height:"100%"}} />}
            mapElement={<div style={{ height:"100%"}} />}
        />
    )
}

export default Map;