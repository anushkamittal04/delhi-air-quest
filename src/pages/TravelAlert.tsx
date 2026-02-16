import { useState } from "react";
import { DELHI_LOCATIONS, AQI_INFO, getAqiCategory } from "@/data/mockData";
import { Navigation, Clock, AlertTriangle, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TravelAlert = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<null | { aqi: number; cat: string }>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate prediction
    const predicted = 180 + Math.floor(Math.random() * 120);
    setResult({ aqi: predicted, cat: getAqiCategory(predicted) });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Travel Alerts</h1>
        <p className="text-muted-foreground mt-1">Plan your commute around air quality</p>
      </div>

      {/* Form */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <form onSubmit={handleCheck} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-1.5 block">Origin</label>
              <Select value={origin} onValueChange={setOrigin}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  {DELHI_LOCATIONS.map((l) => (
                    <SelectItem key={l.name} value={l.name}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground mb-1.5 block">Destination</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {DELHI_LOCATIONS.map((l) => (
                    <SelectItem key={l.name} value={l.name}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-card-foreground mb-1.5 block">Travel Time</label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="max-w-xs bg-background" required />
          </div>
          <Button type="submit" className="gradient-hero border-0 text-primary-foreground font-semibold" disabled={!origin || !destination}>
            <Navigation className="w-4 h-4 mr-2" />
            Check Air Quality
          </Button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-scale-in space-y-4">
          <div className={`${AQI_INFO[result.cat].color} rounded-2xl p-6 shadow-elevated`}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-xl font-display font-bold">Travel Advisory</h2>
            </div>
            <p className="text-4xl font-display font-extrabold mb-1">AQI {result.aqi}</p>
            <p className="text-sm opacity-90 font-medium">{AQI_INFO[result.cat].label} air quality predicted</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="font-display font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Recommendations
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {result.aqi > 200 && (
                <>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-aqi-severe" /> Consider traveling earlier when AQI tends to be lower</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-aqi-severe" /> Wear an N95 mask during your commute</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-aqi-severe" /> Use an AC vehicle with recirculated air</li>
                </>
              )}
              {result.aqi > 100 && result.aqi <= 200 && (
                <>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-aqi-poor" /> Carry a mask as a precaution</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-aqi-poor" /> Avoid prolonged outdoor exposure</li>
                </>
              )}
              {result.aqi <= 100 && (
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-aqi-good" /> Air quality is acceptable. Have a safe trip!</li>
              )}
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Consider public transport to reduce emissions</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelAlert;
