import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import sendRequest from '../../../core/tools/remote/request';
import { requestMehods } from "../../../core/enums/requestMethods";
import markIcon from "../../../assets/icons/marker.png";

function BranchesMap() {
  const [stations, setStaions] = useState();
  const [activeStation, setActiveStation] = useState(null);

  const markerIcon = new Icon({
    iconUrl: markIcon,
    iconSize: [50, 50]
  });

  const loadStaions = async () => {
    try {
      const res = await sendRequest(requestMehods.GET, "/view_stations", {});
      
      if (res.data.message === "success") {
        setStaions(res.data.data);
      }
    } catch (e) {
      console.error(e);
    } 
  }

  useEffect(() => {
    loadStaions();
    console.log(stations);
  }, []);
  return (
    <div className="map-section section flex column center gap-40">
      <h1 className='secondary-text'>BROWSE OUR <span className='primary-text'>BRANCHES</span></h1>
      <MapContainer center={[33.8547, 35.8623]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        {stations?.map(station => (
          <Marker
            key={station.id}
            position={[
              station.latitude,
              station.longitude
            ]}
            onClick={() => {
              setActiveStation(station);
            }}
            icon={markerIcon}
          />
        ))}
        
        
      </MapContainer>
    </div>
  );
}


export default BranchesMap;