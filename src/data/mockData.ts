export const DELHI_LOCATIONS = [
  { name: "Anand Vihar", aqi: 312, category: "severe" as const },
  { name: "ITO", aqi: 198, category: "poor" as const },
  { name: "Dwarka", aqi: 145, category: "moderate" as const },
  { name: "Connaught Place", aqi: 220, category: "poor" as const },
  { name: "Rohini", aqi: 280, category: "severe" as const },
  { name: "Nehru Place", aqi: 165, category: "poor" as const },
  { name: "Vasant Kunj", aqi: 95, category: "moderate" as const },
  { name: "Lodhi Road", aqi: 48, category: "good" as const },
];

export const AQI_INFO: Record<string, { label: string; color: string; advice: string }> = {
  good: {
    label: "Good",
    color: "aqi-good",
    advice: "Air quality is satisfactory. Enjoy outdoor activities!",
  },
  moderate: {
    label: "Moderate",
    color: "aqi-moderate",
    advice: "Air quality is acceptable. Sensitive groups should limit prolonged outdoor exertion.",
  },
  poor: {
    label: "Poor",
    color: "aqi-poor",
    advice: "Health effects possible for everyone. Wear a mask outdoors and limit exposure.",
  },
  severe: {
    label: "Severe",
    color: "aqi-severe",
    advice: "Health alert! Everyone may experience serious effects. Stay indoors and use air purifiers.",
  },
};

export const getAqiCategory = (aqi: number): string => {
  if (aqi <= 50) return "good";
  if (aqi <= 150) return "moderate";
  if (aqi <= 250) return "poor";
  return "severe";
};

export const ECO_QUESTS = [
  { id: "q1", title: "Use public transport", desc: "Take the metro or bus instead of driving", points: 10, type: "weekly" as const },
  { id: "q2", title: "Carpool to work", desc: "Share a ride with a colleague", points: 10, type: "weekly" as const },
  { id: "q3", title: "Cycle instead of car", desc: "Use a bicycle for short distances", points: 10, type: "weekly" as const },
  { id: "q4", title: "Plant a tree", desc: "Contribute to Delhi's green cover", points: 10, type: "monthly" as const },
  { id: "q5", title: "Join a clean-up drive", desc: "Participate in a neighborhood clean-up", points: 10, type: "monthly" as const },
  { id: "q6", title: "Reduce single-use plastic", desc: "Carry reusable bags and bottles", points: 10, type: "weekly" as const },
  { id: "q7", title: "Compost kitchen waste", desc: "Start composting at home", points: 10, type: "monthly" as const },
  { id: "q8", title: "Walk for errands", desc: "Walk for trips under 1 km", points: 10, type: "weekly" as const },
];

export const LEADERBOARD = [
  { name: "Priya S.", points: 340 },
  { name: "Arjun M.", points: 280 },
  { name: "Sneha K.", points: 250 },
  { name: "Rahul D.", points: 210 },
  { name: "Ananya P.", points: 190 },
  { name: "Vikram T.", points: 160 },
  { name: "Meera R.", points: 130 },
  { name: "Karan B.", points: 100 },
];

export const getRewardTier = (points: number) => {
  if (points >= 300) return { tier: "Gold", emoji: "🥇", next: null, progress: 100 };
  if (points >= 150) return { tier: "Silver", emoji: "🥈", next: 300, progress: ((points - 150) / 150) * 100 };
  if (points >= 50) return { tier: "Bronze", emoji: "🥉", next: 150, progress: ((points - 50) / 100) * 100 };
  return { tier: "Starter", emoji: "🌱", next: 50, progress: (points / 50) * 100 };
};
