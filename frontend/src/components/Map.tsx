import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map({ onLocationSelect }: { onLocationSelect?: (location: any) => void }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;
    
    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
              tileSize: 256,
              attribution: 'Esri'
            }
          },
          layers: [
            {
              id: 'simple-tiles',
              type: 'raster',
              source: 'raster-tiles',
              minzoom: 0,
              maxzoom: 22
            }
          ]
        },
        center: [78.6569, 11.1271], // Tamil Nadu center
        zoom: 6.5
      });
      
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      map.current.addControl(new maplibregl.FullscreenControl(), 'top-right');

      map.current.on('load', () => {
        if (!map.current) return;
        
        map.current.addSource('hotspots', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              { type: 'Feature', geometry: { type: 'Point', coordinates: [80.2707, 13.0827] }, properties: { no2: 65.4, name: 'Chennai', sat: 59.8, conf: 88.5, temp: 32, hum: 65, wind: 12, elev: 6 } },
              { type: 'Feature', geometry: { type: 'Point', coordinates: [76.9558, 11.0168] }, properties: { no2: 38.1, name: 'Coimbatore', sat: 35.2, conf: 92.1, temp: 28, hum: 55, wind: 15, elev: 411 } },
              { type: 'Feature', geometry: { type: 'Point', coordinates: [78.1198, 9.9252] }, properties: { no2: 45.2, name: 'Madurai', sat: 41.5, conf: 90.3, temp: 34, hum: 40, wind: 8, elev: 101 } },
              { type: 'Feature', geometry: { type: 'Point', coordinates: [77.7172, 11.3410] }, properties: { no2: 42.6, name: 'Erode', sat: 38.9, conf: 91.4, temp: 31, hum: 45, wind: 10, elev: 183 } },
              { type: 'Feature', geometry: { type: 'Point', coordinates: [78.1460, 11.6643] }, properties: { no2: 40.5, name: 'Salem', sat: 37.1, conf: 89.2, temp: 30, hum: 48, wind: 14, elev: 278 } },
              { type: 'Feature', geometry: { type: 'Point', coordinates: [78.6816, 10.7905] }, properties: { no2: 35.8, name: 'Trichy', sat: 32.4, conf: 93.6, temp: 33, hum: 50, wind: 9, elev: 88 } },
              { type: 'Feature', geometry: { type: 'Point', coordinates: [77.3411, 11.1085] }, properties: { no2: 48.3, name: 'Tiruppur', sat: 44.1, conf: 90.8, temp: 29, hum: 52, wind: 16, elev: 295 } },
              { type: 'Feature', geometry: { type: 'Point', coordinates: [77.7132, 8.7139] }, properties: { no2: 30.2, name: 'Tirunelveli', sat: 28.5, conf: 94.2, temp: 32, hum: 60, wind: 18, elev: 47 } },
            ]
          }
        });

        map.current.addLayer({
          id: 'hotspots-layer',
          type: 'circle',
          source: 'hotspots',
          paint: {
            'circle-radius': [
              'interpolate', ['linear'], ['zoom'],
              5, 15,
              10, 45
            ],
            'circle-color': [
              'interpolate', ['linear'], ['get', 'no2'],
              30, '#22c55e',
              40, '#eab308',
              50, '#f97316',
              60, '#ef4444',
              70, '#9333ea'
            ],
            'circle-opacity': 0.6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
        
        // Add labels
        map.current.addLayer({
          id: 'hotspots-label',
          type: 'symbol',
          source: 'hotspots',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-offset': [0, 1.5],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': '#1f2937',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1
          }
        });

        map.current.on('click', 'hotspots-layer', (e) => {
          if (e.features && e.features.length > 0 && onLocationSelect) {
            onLocationSelect(e.features[0].properties);
          }
        });

        map.current.on('mouseenter', 'hotspots-layer', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });

        map.current.on('mouseleave', 'hotspots-layer', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
      });
    }

    return () => {
      // Cleanup happens on unmount, but MapLibre might need specific cleanup
      if (map.current) {
        // map.current.remove(); // Removing this sometimes causes issues in React strict mode, but let's keep it clean
      }
    };
  }, [onLocationSelect]);

  return <div ref={mapContainer} className="w-full h-full absolute inset-0" />;
}
