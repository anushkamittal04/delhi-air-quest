import { useState } from "react";
import { DELHI_LOCATIONS } from "@/data/mockData";
import { Navigation, AlertTriangle, Shield, CalendarIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";


interface AqiResult {
  predicted_pm25: number;
  aqi_category: string;
  travel_advice: string;
}

const TravelAlert = () => {
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [result, setResult] = useState<AqiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !destination) return;

    const dateTimeStr = `${format(date, "yyyy-MM-dd")} ${time}`;

    setLoading(true);
    setResult(null);
    try {
      const params = new URLSearchParams({ destination, time: dateTimeStr });
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/predict-aqi?${params.toString()}`,
        { headers: { "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      setResult({
        predicted_pm25: json.predicted_pm25,
        aqi_category: json.aqi_category,
        travel_advice: json.travel_advice,
      });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to fetch AQI prediction", variant: "destructive" });
    } finally {
      setLoading(false);
    }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-1.5 block">Travel Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground mb-1.5 block">Travel Time</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="gradient-hero border-0 text-primary-foreground font-semibold"
            disabled={!destination || !date || loading}
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Navigation className="w-4 h-4 mr-2" />}
            {loading ? "Checking..." : "Check Air Quality"}
          </Button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-scale-in space-y-4">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-elevated">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-display font-bold text-card-foreground">Travel Advisory</h2>
            </div>
            <p className="text-4xl font-display font-extrabold mb-1 text-foreground">
              PM2.5: {result.predicted_pm25}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Category: <span className="font-bold text-foreground">{result.aqi_category}</span>
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 shadow-card">
            <h3 className="font-display font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Travel Advice
            </h3>
            <p className="text-sm text-muted-foreground">{result.travel_advice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelAlert;
