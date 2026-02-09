import L from "leaflet";
import { Player } from "palworld-openapi";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const toGamePos = (x: number, y: number) => {
  const ratio = 459;
  const transl_x = 123888
  const transl_y = -158000
  const gameX = x + transl_x;
  const gameY = y + transl_y;
  return [gameX / ratio, gameY / ratio] as [number, number];
};

const toMakerPos = (x: number, y: number) => {
  const size = 256;
  const mapRatio = 15.6;
  const signX = x > 0 ? 0 : 1;
  const signY = y > 0 ? 0 : 1;
  const makerX = (x - signX) / mapRatio - size / 2;
  const makerY = (y - signY) / mapRatio + size / 2;
  return [makerX, makerY] as [number, number];
};

const fromPinPos = (pin: PinData): PinData => {
  const [gameX, gameY] = toGamePos(pin.loc[0], pin.loc[1]);
  const data = toMakerPos(gameX, gameY);
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
  overrideIcon: string;
};

export const Leaflet = ({ players }: TileLayerProps) => {
  const [pinData, setPinData] = useState<PinData[]>([]);
  const fieldBossData = useMemo(() => {
    return pinData
      .filter((pin) => pin.type === "fieldboss")
      .map(fromPinPos);
  }, [pinData]);
  const fasttravelData = useMemo(() => {
    return pinData
      .filter((pin) => pin.type === "fasttravel")
      .map(fromPinPos);
  }, [pinData]);
  const ore = useMemo(() => {
    return pinData
      .filter((pin) => ["coal", "metal", "quartz", "suflur"].includes(pin.type))
      .map(fromPinPos);
  }, [pinData]);

  const dungeon = useMemo(() => {
    return pinData
      .filter((pin) => pin.type === "dungeon")
      .map(fromPinPos);
  }, [pinData]);

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
        const [gameX, gameY] = toGamePos(
          player.locationX,
          player.locationY
        );

        const [makerX, makerY] = toMakerPos(gameX, gameY);
        return (
          <Marker key={key} position={[makerX, makerY]}>
            <Popup>
              <div>
                <h2>{player.name} - lvl {player.level}</h2>
                <p>{gameY}</p>
                <p>{gameX}</p>
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
