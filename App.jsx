import React, { useState } from "react";
import MapView from "./assets/MapView";
import { Container, Nav, Navbar } from "react-bootstrap";
function App() {
  const [tourist, setTourist] = useState(null);
  const [activePage, setActivePage] = useState("map");

  const [stats, setStats] = useState({
    incidentsByType: [
      { type: "Safe", value: 0 },
      { type: "Geo-fence Violation", value: 0 },
      { type: "Incidents", value: 0 },
    ],
    incidentsOverTime: [],
  });
  const [hotspots, setHotspots] = useState([]);

  const recordIncident = (type, position) => {
    setStats((prev) => {
      const updated = prev.incidentsByType.map((x) =>
        x.type === type ? { ...x, value: x.value + 1 } : x
      );
      const timeLabel = new Date().toLocaleTimeString();
      const newTimeEntry = {
        time: timeLabel,
        safe: type === "Safe" ? 1 : 0,
        warning: type === "Geo-fence Violation" ? 1 : 0,
        danger: type === "Incidents" ? 1 : 0,
      };
      return {
        incidentsByType: updated,
        incidentsOverTime: [...prev.incidentsOverTime, newTimeEntry].slice(-10),
      };
    });
    setHotspots((prev) => [...prev, { type, position, count: 1 }]);
  };
}