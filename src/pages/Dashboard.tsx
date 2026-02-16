import { useState } from "react";
import { DELHI_LOCATIONS, AQI_INFO, getAqiCategory } from "@/data/mockData";
import { Wind, Heart, MapPin, Thermometer, Droplets, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const loc = DELHI_LOCATIONS[selectedIdx];
  const cat = getAqiCategory(loc.aqi);
  const info = AQI_INFO[cat];

  const stats = [
    { icon: Thermometer, label: "Temperature", value: "28°C" },
    { icon: Droplets, label: "Humidity", value: "62%" },
    { icon: Wind, label: "Wind Speed", value: "12 km/h" },
    { icon: Eye, label: "Visibility", value: "3.2 km" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Air Quality Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time AQI monitoring for Delhi</p>
      </div>

      {/* Location selector */}
      <Select value={String(selectedIdx)} onValueChange={(v) => setSelectedIdx(Number(v))}>
        <SelectTrigger className="w-full max-w-xs bg-card">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DELHI_LOCATIONS.map((l, i) => (
            <SelectItem key={l.name} value={String(i)}>{l.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Main AQI Card */}
      <div className={`${info.color} rounded-2xl p-8 text-center shadow-elevated transition-all duration-500`}>
        <p className="text-sm font-medium uppercase tracking-wider opacity-90">Current AQI</p>
        <p className="text-7xl md:text-8xl font-display font-extrabold mt-2 mb-2">{loc.aqi}</p>
        <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-sm font-semibold">
          {info.label}
        </span>
      </div>

      {/* Health Advice */}
      <div className="bg-card rounded-xl border border-border p-5 shadow-card flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Heart className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-card-foreground">Health Advice</h3>
          <p className="text-muted-foreground text-sm mt-1">{info.advice}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4 shadow-card text-center">
            <s.icon className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-lg font-display font-bold text-card-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* All Locations */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-3">All Monitoring Stations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DELHI_LOCATIONS.map((l, i) => {
            const c = getAqiCategory(l.aqi);
            const inf = AQI_INFO[c];
            return (
              <button
                key={l.name}
                onClick={() => setSelectedIdx(i)}
                className={`bg-card rounded-xl border p-4 text-left transition-all hover:shadow-elevated ${
                  i === selectedIdx ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                <p className="text-sm font-medium text-card-foreground">{l.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-display font-bold text-card-foreground">{l.aqi}</span>
                  <span className={`${inf.color} text-xs px-2 py-1 rounded-full font-medium`}>
                    {inf.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
