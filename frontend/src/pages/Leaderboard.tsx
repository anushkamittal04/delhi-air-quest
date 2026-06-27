import { useAuth } from "@/context/AuthContext";
import { LEADERBOARD, getRewardTier } from "@/data/mockData";
import { Trophy, Medal, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Leaderboard = () => {
  const { user } = useAuth();
  const points = user?.points ?? 0;
  const tier = getRewardTier(points);

  // Merge user into leaderboard
  const allUsers = [
    ...LEADERBOARD,
    ...(user ? [{ name: `${user.name} (You)`, points }] : []),
  ].sort((a, b) => b.points - a.points);

  const tiers = [
    { name: "Gold", emoji: "🥇", min: 300, color: "bg-amber-100 text-amber-800 border-amber-200" },
    { name: "Silver", emoji: "🥈", min: 150, color: "bg-slate-100 text-slate-700 border-slate-200" },
    { name: "Bronze", emoji: "🥉", min: 50, color: "bg-orange-100 text-orange-800 border-orange-200" },
    { name: "Starter", emoji: "🌱", min: 0, color: "bg-secondary text-secondary-foreground border-border" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Leaderboard</h1>
        <p className="text-muted-foreground mt-1">See how you compare with other eco warriors</p>
      </div>

      {/* Your Status */}
      {user && (
        <div className="gradient-hero rounded-2xl p-6 text-primary-foreground shadow-elevated">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-3xl">
              {tier.emoji}
            </div>
            <div>
              <p className="text-sm opacity-80">Your Rank</p>
              <p className="text-2xl font-display font-bold">{tier.tier} — {points} pts</p>
              {tier.next && (
                <p className="text-sm opacity-80 mt-1">{tier.next - points} pts to next tier</p>
              )}
            </div>
          </div>
          {tier.next && (
            <div className="mt-4">
              <Progress value={tier.progress} className="h-2 bg-white/20 [&>div]:bg-white" />
            </div>
          )}
        </div>
      )}

      {/* Reward Tiers */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-3">Reward Tiers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiers.map((t) => (
            <div key={t.name} className={`rounded-xl border p-4 text-center ${t.color}`}>
              <p className="text-2xl mb-1">{t.emoji}</p>
              <p className="font-display font-semibold text-sm">{t.name}</p>
              <p className="text-xs opacity-70 mt-1">{t.min}+ pts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rankings */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-3">Rankings</h2>
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          {allUsers.map((u, i) => {
            const isUser = u.name.includes("(You)");
            const uTier = getRewardTier(u.points);
            return (
              <div
                key={u.name}
                className={`flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 transition-colors ${
                  isUser ? "bg-primary/5" : ""
                }`}
              >
                <span className="w-8 text-center font-display font-bold text-muted-foreground">
                  {i === 0 ? <Crown className="w-5 h-5 text-amber-500 mx-auto" /> :
                   i === 1 ? <Medal className="w-5 h-5 text-slate-400 mx-auto" /> :
                   i === 2 ? <Medal className="w-5 h-5 text-orange-400 mx-auto" /> :
                   `#${i + 1}`}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${isUser ? "text-primary" : "text-card-foreground"}`}>{u.name}</p>
                </div>
                <span className="text-lg">{uTier.emoji}</span>
                <span className="font-display font-bold text-card-foreground w-16 text-right">{u.points}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
