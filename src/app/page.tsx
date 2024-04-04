"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { type Player } from "palworld-openapi";
import { useEffect, useState } from "react";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});
// const Marker = dynamic(() => import("./leaflet").then((m) => m.Marker), {
//   ssr: false,
// });

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);

  const getPlayers = async () => {
    const response = await fetch("/status");
    const data = await response.json();
    setPlayers(data);
  };

  useEffect(() => {
    getPlayers();
    const interval = setInterval(getPlayers, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="map/{z}/{y}_{x}.png"
        minZoom={0}
        maxZoom={8}
        maxNativeZoom={4}
      />
      {/* 119 -795  */}
      {players.map((player, key) => {
        const originX = 123568.58;
        const originY = -158230.75;
        const ratioX = 446.456;
        const ratioY = 471.172;
        const mapRatioX = 4123.552;
        const mapRatioY = 2540.461;
        const signX = player.locationX + originX > 0 ? 0 : 1;
        const signY = player.locationY + originY > 0 ? 0 : 1;
        console.log(player.locationY + originY);
        console.log({ signX, signY });
        console.log(player.locationX + originX, player.locationY + originY);
        const gameX = (player.locationX + originX + signX * ratioX) / ratioX;
        const gameY = (player.locationY + originY + signY * ratioY) / ratioY;
        const makerX = (player.locationX + originX) / mapRatioX;
        const makerY = (player.locationY + originY) / mapRatioY;

        console.log({ makerX, makerY });

        return (
          <Marker key={key} position={[makerX, makerY]}>
            {/* 250 -355 */}
            <Popup>
              <div>
                <h2>{player.name}</h2>
                <p>{gameX}</p>
                <p>{gameY}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
