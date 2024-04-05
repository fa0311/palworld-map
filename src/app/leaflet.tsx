import L from "leaflet";
import { Player } from "palworld-openapi";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const toGamePossition = (x: number, y: number) => {
  const ratio = 458.355;
  const signX = x > 0 ? 0 : 1;
  const signY = y > 0 ? 0 : 1;
  const gameX = x / ratio;
  const gameY = y / ratio;
  return [gameX + signX, gameY + signY] as [number, number];
};

const toMakerPossition = (x: number, y: number) => {
  const size = 256;
  const mapRatio = 7.8;
  const signX = x > 0 ? 0 : 1;
  const signY = y > 0 ? 0 : 1;
  const makerX = (x - signX) / mapRatio - size / 2;
  const makerY = (y - signY) / mapRatio + size / 2;
  return [makerX, makerY] as [number, number];
};

const fromPinPossition = (pin: PinData): PinData => {
  const scale = 11;
  const data = toMakerPossition(pin.loc[0] * scale, pin.loc[1] * scale);
  return {
    ...pin,
    loc: data,
  };
};

type TileLayerProps = {
  players: Player[];
};

type PinData = {
  mapId: string;
  id: string;
  loc: [number, number];
  type: string;
  name: string;
  pinImage: string;
  articleUrl: string;
  overrideIcon: string;
  originalID: string;
};

export const Leaflet = ({ players }: TileLayerProps) => {
  const [pinData, setPinData] = useState<PinData[]>([]);
  const fieldBossData = useMemo(() => {
    return pinData
      .filter((pin) => pin.type === "fieldboss")
      .map(fromPinPossition);
  }, [pinData]);
  const fasttravelData = useMemo(() => {
    return pinData
      .filter((pin) => pin.type === "fasttravel")
      .map(fromPinPossition);
  }, [pinData]);
  const ore = useMemo(() => {
    return pinData
      .filter((pin) => ["coal", "metal", "quartz", "suflur"].includes(pin.type))
      .map(fromPinPossition);
  }, [pinData]);

  const dungeon = useMemo(() => {
    return pinData
      .filter((pin) => pin.type === "dungeon")
      .map(fromPinPossition);
  }, [pinData]);

  const originX = 122500;
  const originY = -158100;
  const size = 256;

  const getPinData = async () => {
    const res = await fetch("/pin_data.json");
    const data = await res.json();
    setPinData(data);
  };

  useEffect(() => {
    getPinData();
  }, []);

  return (
    <MapContainer
      zoom={0}
      style={{ height: "100vh", width: "100%" }}
      crs={L.CRS.Simple}
      bounds={[
        [0, size],
        [-size, 0],
      ]}
      maxBounds={[
        [0, size],
        [-size, 0],
      ]}
    >
      <TileLayer
        url="map/{z}/{y}_{x}.png"
        minZoom={0}
        maxZoom={8}
        maxNativeZoom={4}
        tileSize={256}
        noWrap={true}
        bounds={[
          [0, size],
          [-size, 0],
        ]}
      />
      {players.map((player, key) => {
        const [gameX, gameY] = toGamePossition(
          player.locationX + originX,
          player.locationY + originY
        );

        const [makerX, makerY] = toMakerPossition(gameX, gameY);
        return (
          <Marker key={key} position={[makerX, makerY]}>
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
      {fieldBossData.map((pin, key) => {
        return (
          <Marker
            key={key}
            position={[pin.loc[0], pin.loc[1]]}
            icon={L.icon({ iconUrl: pin.overrideIcon, iconSize: [32, 32] })}
          >
            <Popup>
              <div>
                <h2>{pin.name}</h2>
                <p>{pin.loc[0]}</p>
                <p>{pin.loc[1]}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
      {fasttravelData.map((pin, key) => {
        const url =
          "https://img.gamewith.jp/img/c23c0e1d46b8fbe838a3ed9bb1ccaa56.png";
        return (
          <Marker
            key={key}
            position={[pin.loc[0], pin.loc[1]]}
            icon={L.icon({ iconUrl: url, iconSize: [32, 32] })}
          >
            <Popup>
              <div>
                <h2>{pin.name}</h2>
                <p>{pin.loc[0]}</p>
                <p>{pin.loc[1]}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
      {ore.map((pin, key) => {
        return (
          <Marker
            key={key}
            position={[pin.loc[0], pin.loc[1]]}
            icon={L.icon({ iconUrl: pin.overrideIcon, iconSize: [32, 32] })}
          >
            <Popup>
              <div>
                <h2>{pin.name}</h2>
                <p>{pin.loc[0]}</p>
                <p>{pin.loc[1]}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
      {dungeon.map((pin, key) => {
        const url =
          "https://img.gamewith.jp/article_tools/palworld/gacha/map_pin_dungeon.png";
        return (
          <Marker
            key={key}
            position={[pin.loc[0], pin.loc[1]]}
            icon={L.icon({ iconUrl: url, iconSize: [32, 32] })}
          >
            <Popup>
              <div>
                <h2>{pin.name}</h2>
                <p>{pin.loc[0]}</p>
                <p>{pin.loc[1]}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};
