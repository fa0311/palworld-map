"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { type Player } from "palworld-openapi";
import { useEffect, useState } from "react";

const Leaflet = dynamic(() => import("./leaflet").then((m) => m.Leaflet), {
  ssr: false,
});

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

  return <Leaflet players={players} />;
}
