import React, { useState, useEffect, useRef } from "react";
import { 
    GoogleMap, 
    withScriptjs, 
    withGoogleMap, 
    Marker,
    InfoWindow,
    DirectionsRenderer,
    DirectionsStatus,
    useJsApiLoader,
    Autocomplete
} from "react-google-maps";
import properties from "./Properties.json";

const center = { lat: 48.8584, lng: 2.2945 }

function Directions() {
//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_KEY}`,
//     libraries: ['places'],
//   })

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
}

export default Directions;