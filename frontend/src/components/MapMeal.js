import React, { useEffect } from 'react'
import { useRef } from 'react'
import * as d3 from 'd3';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

export default function MapMeal() {


    return (

        <>

            <div>

                <div className='map-1'>

                    <MapContainer
                        className='shadow-5-strong'
                        center={[12.9716, 77.5946]}
                        // crs = {L.CRS.EPSG3857}
                        zoom={13}
                        zoomControl={true}
                        preferCanvas={false}>

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        <Marker position={[12.9770, 77.5773]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>

                        <Circle center={[12.9716, 77.5946]} pathOptions={{"color" : "red", "opacity" : "0.4"}} radius={1000} />

                        <Circle center={[12.9783, 77.6408]} pathOptions={{"color" : "red", "opacity" : "0.4"}} radius={1000} />

                        <Circle center={[13.0206, 77.6479]} pathOptions={{"color" : "green", "opacity" : "0.4"}} radius={1000} />

                        
                    </MapContainer>


                </div>

            </div >

        </>
    )
}
