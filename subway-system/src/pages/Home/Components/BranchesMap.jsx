import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import sendRequest from '../../../core/tools/remote/request';
import { requestMehods } from "../../../core/enums/requestMethods";
import markIcon from "../../../assets/icons/marker.png";
import { useMapEvents } from "react-leaflet";

function BranchesMap() {
  const [allStations, setAllStaions] = useState();
  const [stations, setStations] = useState();
  const [searchText, setSearchText] = useState();

  const markerIcon = new Icon({
    iconUrl: markIcon,
    iconSize: [50, 50]
  });

  const loadStaions = async () => {
    try {
      const res = await sendRequest(requestMehods.GET, "/view_stations", {});
      
      if (res.data.message === "success") {
        setAllStaions(res.data.data);
        setStations(res.data.data);
      }
    } catch (e) {
      console.error(e);
    } 
  }

  useEffect(() => {
    const filteredStations = allStations?.filter((station) => station.name.includes(searchText));
    setStations(filteredStations);
  }, [searchText]);

  useEffect(() => {
    loadStaions();
  }, []);

  return (
    <div className="map-section section flex column center gap-40">
      <h1 className='secondary-text'>BROWSE OUR <span className='primary-text'>BRANCHES</span></h1>
      <input onChange={(e) => setSearchText(e.target.value)} className="map-search semi-rounded"
        placeholder="Find a station" />
      <MapContainer center={[33.8547, 35.8623]} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
        
          {stations !== null && (
          stations?.map(station => (
              <Marker
                key={station.id}
                position={ [station.latitude, station.longitude] }
                icon={markerIcon}>
                <Popup>
                    <h2>{station.name}</h2>
                    <p>{station.operating_hours}</p>
                    <p>{station.facilities}</p>
                </Popup>
              </Marker>
          ))
          )}
      </MapContainer>
    </div>
  );
}


export default BranchesMap;