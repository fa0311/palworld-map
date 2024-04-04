import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import * as leaflet from "react-leaflet";

type MarkerProps = Parameters<typeof leaflet.Marker>;

export const Marker = (...props: MarkerProps) => {
  return (
    <Marker
      position={props[0].position}
      icon={
        new L.Icon({
          iconUrl: markerIcon.src,
          iconRetinaUrl: markerIcon2x.src,
          shadowUrl: markerShadow.src,
        })
      }
      {...props}
    />
  );
};
