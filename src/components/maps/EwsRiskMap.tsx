import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import geojsonData from "../../data/Sleman-kepanewon.json";
import { riskData } from "../../data/riskDummy";

const getColor = (risk: number) => {
  if (risk > 0.8) return "#d73027";
  if (risk > 0.6) return "#fc8d59";
  if (risk > 0.4) return "#fee08b";
  return "#91cf60";
};

export default function EwsRiskMap() {
  const style = (feature: any) => {
    const risk = riskData[feature.properties.wadmkc] || 0;

    return {
      fillColor: getColor(risk),
      weight: 1,
      color: "#ffffff",
      fillOpacity: 0.7,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const nama = feature.properties.wadmkc;
    const risk = riskData[nama] || 0;

    layer.bindPopup(`
      <b>${nama}</b><br/>
      Risk Score: ${(risk * 100).toFixed(1)}%
    `);
  };

  return (
    <MapContainer
      center={[-7.716, 110.355]}
      zoom={11}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON
        data={geojsonData as any}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
}
