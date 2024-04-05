import L from "leaflet";
import { Player } from "palworld-openapi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type TileLayerProps = {
  players: Player[];
};

export const Leaflet = ({ players }: TileLayerProps) => {
  const originX = 122500;
  const originY = -158100;
  const ratio = 458.355;
  const size = 256;
  const mapRatio = 7.8;

  const toGamePossition = (x: number, y: number) => {
    const signX = x > 0 ? 0 : 1;
    const signY = y > 0 ? 0 : 1;
    const gameX = x / ratio;
    const gameY = y / ratio;
    return [gameX + signX, gameY + signY] as [number, number];
  };

  const toMakerPossition = (x: number, y: number) => {
    const signX = x > 0 ? 0 : 1;
    const signY = y > 0 ? 0 : 1;
    const makerX = (x - signX) / mapRatio - size / 2;
    const makerY = (y - signY) / mapRatio + size / 2;
    return [makerX, makerY] as [number, number];
  };

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

      <Marker position={toMakerPossition(-29, -544)} />
    </MapContainer>
  );
};
