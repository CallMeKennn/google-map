import React, { useEffect, useMemo, useState } from 'react'
import { useMapEvents, GeoJSON } from 'react-leaflet';


const ProvinceSearch = ({ positionNewSearch }: any) => {
    const [province, setProvince] = useState<any>(positionNewSearch);
    const map = useMapEvents({});
    useEffect(() => {
      if (positionNewSearch) {
        setProvince(positionNewSearch);
        // Zoom vào vị trí mới
        map.flyTo(positionNewSearch, 9.5);
      }
  
    }, [positionNewSearch, map]);
  
    const boundary = useMemo(() => {
      const data: any = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: province?.geometry?.type,
              coordinates: province?.geometry?.coordinates,
            },
            properties: {
              name: province?.name,
            },
          },
        ],
      };
  
      return data;
    }, [province]);
  
    return (
      <GeoJSON
        data={boundary}
        style={{
          color: "blue",
          weight: 2,
          fillColor: "lightblue",
          fillOpacity: 0.2,
        }}
      />
    );
}

export default ProvinceSearch