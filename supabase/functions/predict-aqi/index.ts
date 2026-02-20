import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const destination = url.searchParams.get("destination");
  const time = url.searchParams.get("time");

  if (!destination || !time) {
    return new Response(JSON.stringify({ error: "Missing destination or time" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const apiUrl = `https://biased-darien-interfemoral.ngrok-free.dev/predict_aqi?destination=${encodeURIComponent(destination)}&time=${encodeURIComponent(time)}`;

  const res = await fetch(apiUrl, {
    headers: { "ngrok-skip-browser-warning": "true" },
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
