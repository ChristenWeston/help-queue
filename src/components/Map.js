import React, { useState, useRef } from "react";
import { 
    GoogleMap, 
    withScriptjs, 
    withGoogleMap, 
    Marker,
    InfoWindow,
    DirectionsRenderer,
    GroundOverlay,
    Polygon,
    Polyline,
    Waypoint
} from "react-google-maps";
import properties from "./Properties.json";

function MapComponent() {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const paths = [
      { lat: 45.52180183501188, lng: -122.62568532656492 },
      { lat: 45.47710287706964, lng: -122.63684331637737 },
      { lat: 45.52661252732071, lng: -122.67332135870465 },
      { lat: 45.52180183501188, lng: -122.62568532656492 }
    ]
    
    const options = {
      fillColor: "lightblue",
      fillOpacity: 1,
      strokeColor: "red",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1
    }
    
    const onLoad = polygon => {
      console.log("polygon: ", polygon);
    }
    
        const [map, setMap] = useState(/** @type google.maps.Map */ (null))
        const [directionsResponse, setDirectionsResponse] = useState(null)
        const [waypoints, setWaypoints] = useState([]);
        const [distance, setDistance] = useState('')
        const [duration, setDuration] = useState('')
      //2606 SE 78th Ave Portland, OR 97206
      //6236 SE Stephens St Portland, OR 97206
      // 5925 Locust St Kansas City, MO 64110
        /** @type React.MutableRefObject<HTMLInputElement> */
        const originRef = useRef()
        /** @type React.MutableRefObject<HTMLInputElement> */
        const destiantionRef = useRef()
        /** @type React.MutableRefObject<HTMLInputElement> */
        const waypointsRef = useRef()
      
      async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
          return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: originRef.current.value,
          destination: destiantionRef.current.value,
          waypoints: [
            {
              location: 'Joplin, MO',
              stopover: false
            },{
              location: 'Oklahoma City, OK',
              stopover: true
            }],
          optimizeWaypoints: true,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        console.log("Results: " + results);
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
      }
      
      function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destiantionRef.current.value = ''
        waypointsRef.current.value = ''
      }

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
                        url: "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
                        //https://i.imgur.com/FpHIBa7.png
                        //https://cdn-icons-png.flaticon.com/512/7880/7880087.png
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

    <Polygon
      onLoad={onLoad}
      paths={paths}
      options={options}
    />
      <Polyline
      path={[{ lat: 45.47559825717784, lng: -122.53564893387593 }, { lat: 45.512660385980794, lng: -122.59435712512872 }]}
    />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <input type='text' placeholder='Origin' ref={originRef} />
          <input
            type='text'
            placeholder='Destination'
            ref={destiantionRef}
            />
          <input
            type='text'
            placeholder='Waypoints'
            ref={waypointsRef}
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