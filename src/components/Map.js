import React,{useState}from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import mapStyles from "./MapStyles.js";

// Calculating haversine formula
// function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//     var R = 6371; // Radius of the earth in km
//     var dLat = deg2rad(lat2-lat1);  // deg2rad below
//     var dLon = deg2rad(lon2-lon1);
//     var a =
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon/2) * Math.sin(dLon/2)
//       ;
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     var d = R * c; // Distance in km
//     return d;
//   }

//   function deg2rad(deg) {
//     return deg * (Math.PI/180)
//   }

// End of Calculating haversine formula

const libraries = ["places"];
const mapContainerStyle = {
  width: "50vw",
  height: "60vh",
  borderRadius:"20px" ,

};
const center = {
  lat: 44.787197,
  lng: 20.457273,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
// const [markers , setMarkers] = useState ([])
function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyChFizztYVGGWGdzNY0_v5q3WcYkPMAfow",
    libraries,
  });
  if (loadError) return "Error loading maps ";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={props.markercenter}
        options={options}
        setMarkers
      >
          <Marker position={props.markercenter} />
          
      </GoogleMap>
    </div>
  );
}

export default Map;
