import { useAuth } from "@/context/AuthContext";
import { ECO_QUESTS, getRewardTier } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Trophy, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const EcoQuest = () => {
  const { user, toggleQuest } = useAuth();
  const completed = user?.completedQuests ?? [];
  const points = user?.points ?? 0;
  const tier = getRewardTier(points);

  const weekly = ECO_QUESTS.filter((q) => q.type === "weekly");
  const monthly = ECO_QUESTS.filter((q) => q.type === "monthly");

  const QuestList = ({ quests, label }: { quests: typeof ECO_QUESTS; label: string }) => (
    <div>
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        {label}
      </h2>
      <div className="space-y-3">
        {quests.map((q) => {
          const done = completed.includes(q.id);
          return (
            <label
              key={q.id}
              className={`flex items-start gap-4 bg-card rounded-xl border p-4 shadow-card cursor-pointer transition-all hover:shadow-elevated ${
                done ? "border-primary/40 bg-primary/5" : "border-border"
              }`}
            >
              <Checkbox
                checked={done}
                onCheckedChange={() => toggleQuest(q.id)}
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-card-foreground ${done ? "line-through opacity-60" : ""}`}>
                  {q.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{q.desc}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                +{q.points} pts
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Eco Quest</h1>
        <p className="text-muted-foreground mt-1">Complete challenges and earn rewards</p>
      </div>

      {/* Points summary */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-display font-bold text-card-foreground">{points}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl">{tier.emoji}</p>
            <p className="text-sm font-semibold text-card-foreground">{tier.tier}</p>
          </div>
        </div>
        {tier.next && (
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{tier.tier}</span>
              <span>{tier.next} pts for next tier</span>
            </div>
            <Progress value={tier.progress} className="h-2" />
          </div>
        )}
      </div>

      <QuestList quests={weekly} label="Weekly Challenges" />
      <QuestList quests={monthly} label="Half-Monthly Challenges" />
    </div>
  );
};

export default EcoQuest;
