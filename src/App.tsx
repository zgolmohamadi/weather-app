import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords);
            },
            error => {
                console.log("Error: ", error)
            },{ enableHighAccuracy: true });
}
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position:any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  
  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <>
      <div>
       
     </div>
    </>
  )
}

export default App
