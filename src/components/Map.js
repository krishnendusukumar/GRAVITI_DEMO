import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

function Map(_props) {
  const { directionResponse } = _props;

  const containerStyle = {
    width: "100%",
    height: "600px",
  };

  const center = {
    lat: 20.5937,
    lng: 78.9629,
  };

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={{
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} />
        {directionResponse !== null ? (
          <DirectionsRenderer directions={directionResponse} />
        ) : null}
        <></>
      </GoogleMap>
    </div>
  );
}

export default Map;
