import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import centreIcon from '../assets/centre.png';


function CentreButton({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const customControl = L.control({ position: 'bottomright' });
    
    customControl.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      div.style.marginRight ='30px';
      div.innerHTML = `
        <button
          style="
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: left;
            justify-content: left;
            transition: all 0.2s ease;
            background-image: url('${centreIcon}');
            background-repeat: no-repeat;
            background-position: center;
            background-size: 20px 20px;
          "
          title="Center Map"
        >
        </button>
      `;

      // Handle click event
      L.DomEvent.on(div, 'click', (e) => {
        L.DomEvent.stopPropagation(e); // Prevent map click
        map.setView(center, zoom);
      });

      // Add hover effects
      const button = div.querySelector('button');
      L.DomEvent.on(button, 'mouseenter', () => {
        button.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        button.style.borderColor = '#3b82f6';
        button.style.transform = 'translateY(-1px)';
      });

      L.DomEvent.on(button, 'mouseleave', () => {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        button.style.borderColor = '#e2e8f0';
        button.style.transform = 'translateY(0)';
      });

      return div;
    };

    customControl.addTo(map);

    // Cleanup function
    return () => {
      map.removeControl(customControl);
    };
  }, [map, center, zoom]);

  return null; // This component doesn't render anything in React
}

export default CentreButton;