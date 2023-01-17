import "./Description.css";
import img from './logo.png'

import { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
// importing custom map
import Map from "./Map";

function Description() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyCJMLOaYcxqrwd4JZ0hWNYXjYpqbX-J-k8",
        libraries: ["places"],
    });

    // position states
    const originRef = useRef(null);
    const destinationRef = useRef(null);
    const waypointRef = useRef(null);
    const [mode, setMode] = useState('DRIVING')

    const [distance, setDistance] = useState(null);
    const [waypoints, setWaypoints] = useState([]);

    // map data to show route
    const [directionResponse, setDirectionResponse] = useState(null);

    // function to calculate route
    const calculateRoute = async () => {
        if (
            originRef.current.value === null ||
            destinationRef.current.value === null
        ) {
            return;
        }

        const directionService = new google.maps.DirectionsService(); // eslint-disable-line
        const results = await directionService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            waypoints: waypoints,
            travelMode: google.maps.TravelMode[mode], // eslint-disable-line
        });

        setDirectionResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
    };

    const clearRoute = () => {
        window.location.reload(false);
    };

    const handleWaypoint = () => {
        const waypoint = {
            location: waypointRef.current.value,
            stopover: true,
        };

        // set null
        waypointRef.current.value = null;

        const currentWaypoints = [...waypoints];
        currentWaypoints.push(waypoint);
        setWaypoints(currentWaypoints);
    };

    const ChangeMode = (e) => {
        setMode(e.target.value)
    }

    return isLoaded ? (
        <div className="description row">
            <div className="bg-white col-12">
                <img className="d-flex img__logo" src={img} alt="Graviti-logo" />
            </div>
            <div className="description__content__intro col-12">
                Lets calculate <span className='font-weight-bold'>distance</span> from Google maps
            </div>
            <div className="description__map">
                <Map directionResponse={directionResponse} />
            </div>
            <div className="description__content">

                <div className="description__content__origin">
                    <label className="origin__text">Origin</label>
                    <Autocomplete>
                        <input
                            type="text"
                            placeholder="origin"
                            ref={originRef}
                            className="origin__input"
                        />
                    </Autocomplete>
                </div>
                <div className="description__content__destination">
                    <label className="destination__text">Stop</label>
                    <Autocomplete>
                        <input
                            type="text"
                            placeholder="Add Waypoint"
                            ref={waypointRef}
                            className="waypoint__input"
                        />
                    </Autocomplete>
                    <button type="button" onClick={handleWaypoint} className='btn btn-dark add__waypoint'>
                        Add
                    </button>
                </div>
                <div className="description__content__submit d-flex flex-row-reverse">
                    <button type="submit" onClick={calculateRoute} className='btn-primary calculate__button'>
                        Calculate
                    </button>

                    <button type="button" onClick={clearRoute} className='btn-dark clear__button'>
                        Clear
                    </button>
                </div>
                <br />
                <div className="description__content__destination">
                    <label className="destination__text">Destination</label>
                    <Autocomplete>
                        <input
                            type="text"
                            placeholder="destination"
                            ref={destinationRef}
                            className="destination__input"
                        />
                    </Autocomplete>
                </div>
                <label className="travel__mode">Travel Mode</label>
                <select class="form-control select__mode" onChange={ChangeMode}>
                    <option value="DRIVING">Driving</option>
                    <option value="WALKING">Walking</option>
                    <option value="BICYCLING">Bicycling</option>
                    <option value="TRANSIT">Transit</option>
                </select>
                <br />
                <br />

                {distance !== null ? (
                    <div className="show__text">
                        <div className="wrap">
                            <div className="heading__distance font-weight-bold">Distance</div>
                            <div className="show__distance">{distance}</div>
                        </div>
                        <div className="description__content__distance">
                            {`The distance between ${destinationRef.current.value} and ${originRef.current.value} via
                  the selected route is ${distance}`}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    ) : null;
}

export default Description;
