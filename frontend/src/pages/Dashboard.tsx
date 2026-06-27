import { useState } from "react";
import { DELHI_LOCATIONS, AQI_INFO, getAqiCategory } from "@/data/mockData";
import { Wind, Heart, MapPin, Thermometer, Droplets, Eye, Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Default: Lodhi Road as "current location" (best AQI / representative)
const DEFAULT_LOCATION_IDX = 7;

const Dashboard = () => {
  const [selectedIdx, setSelectedIdx] = useState(DEFAULT_LOCATION_IDX);
  const [addedLocations, setAddedLocations] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingIdx, setPendingIdx] = useState<string>("");

  const loc = DELHI_LOCATIONS[selectedIdx];
  const cat = getAqiCategory(loc.aqi);
  const info = AQI_INFO[cat];

  const stats = [
    { icon: Thermometer, label: "Temperature", value: "28°C" },
    { icon: Droplets, label: "Humidity", value: "62%" },
    { icon: Wind, label: "Wind Speed", value: "12 km/h" },
    { icon: Eye, label: "Visibility", value: "3.2 km" },
  ];

  const handleAddLocation = () => {
    const idx = Number(pendingIdx);
    if (pendingIdx !== "" && !addedLocations.includes(idx) && idx !== DEFAULT_LOCATION_IDX) {
      setAddedLocations((prev) => [...prev, idx]);
    }
    setDialogOpen(false);
    setPendingIdx("");
  };

  const removeLocation = (idx: number) => {
    setAddedLocations((prev) => prev.filter((i) => i !== idx));
    if (selectedIdx === idx) setSelectedIdx(DEFAULT_LOCATION_IDX);
  };

  // Available locations to add (not already added, not default)
  const availableToAdd = DELHI_LOCATIONS
    .map((l, i) => ({ ...l, idx: i }))
    .filter((l) => l.idx !== DEFAULT_LOCATION_IDX && !addedLocations.includes(l.idx));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Air Quality Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time AQI monitoring for Delhi</p>
      </div>

      {/* Main AQI Card — current location */}
      <div className={`${info.color} rounded-2xl p-8 text-center shadow-elevated transition-all duration-500`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-4 h-4 opacity-80" />
          <p className="text-sm font-medium uppercase tracking-wider opacity-90">{loc.name} · Current Location</p>
        </div>
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

      {/* My Locations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-display font-semibold text-foreground">My Locations</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-primary/40 text-primary hover:bg-primary/5"
                disabled={availableToAdd.length === 0}
              >
                <Plus className="w-4 h-4" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Add a Location</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <Select value={pendingIdx} onValueChange={setPendingIdx}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableToAdd.map((l) => (
                      <SelectItem key={l.idx} value={String(l.idx)}>
                        {l.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  className="w-full gradient-hero border-0 text-primary-foreground"
                  onClick={handleAddLocation}
                  disabled={pendingIdx === ""}
                >
                  Add to Dashboard
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {addedLocations.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            <Plus className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No extra locations added yet.</p>
            <p className="text-xs mt-1 opacity-70">Tap "Add Location" to monitor more stations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {addedLocations.map((i) => {
              const l = DELHI_LOCATIONS[i];
              const c = getAqiCategory(l.aqi);
              const inf = AQI_INFO[c];
              return (
                <div
                  key={l.name}
                  className={`bg-card rounded-xl border p-4 text-left transition-all hover:shadow-elevated relative group ${
                    i === selectedIdx ? "border-primary ring-2 ring-primary/20" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => removeLocation(i)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted"
                    aria-label="Remove location"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <p className="text-sm font-medium text-card-foreground pr-6">{l.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl font-display font-bold text-card-foreground">{l.aqi}</span>
                    <span className={`${inf.color} text-xs px-2 py-1 rounded-full font-medium`}>
                      {inf.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
