import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ECO_QUESTS, getRewardTier } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Trophy, Target, Upload, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const EcoQuest = () => {
  const { user, toggleQuest } = useAuth();
  const completed = user?.completedQuests ?? [];
  const points = user?.points ?? 0;
  const tier = getRewardTier(points);

  // Track uploaded proof per quest id
  const [proofUploaded, setProofUploaded] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const weekly = ECO_QUESTS.filter((q) => q.type === "weekly");
  const monthly = ECO_QUESTS.filter((q) => q.type === "monthly");

  const handleFileChange = (questId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProofUploaded((prev) => ({ ...prev, [questId]: url }));
    }
  };

  const WeeklyQuestList = ({ quests }: { quests: typeof ECO_QUESTS }) => (
    <div>
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        Weekly Challenges
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

  const MonthlyQuestList = ({ quests }: { quests: typeof ECO_QUESTS }) => (
    <div>
      <h2 className="text-lg font-display font-semibold text-foreground mb-3 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-primary" />
        Monthly Challenges
      </h2>
      <div className="space-y-4">
        {quests.map((q) => {
          const done = completed.includes(q.id);
          const hasProof = !!proofUploaded[q.id];
          return (
            <div
              key={q.id}
              className={`bg-card rounded-xl border p-5 shadow-card transition-all ${
                done ? "border-primary/40 bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  {done ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-card-foreground ${done ? "line-through opacity-60" : ""}`}>
                    {q.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">{q.desc}</p>

                  {/* Proof upload section */}
                  {!done && (
                    <div className="mt-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => { fileInputRefs.current[q.id] = el; }}
                        onChange={(e) => handleFileChange(q.id, e)}
                      />
                      {hasProof ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-primary font-medium">
                            <CheckCircle2 className="w-4 h-4" />
                            Proof uploaded!
                          </div>
                          <img
                            src={proofUploaded[q.id]}
                            alt="proof"
                            className="w-24 h-16 object-cover rounded-lg border border-border"
                          />
                          <Button
                            size="sm"
                            onClick={() => toggleQuest(q.id)}
                            className="gradient-hero border-0 text-primary-foreground text-xs"
                          >
                            Claim {q.points} Points
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs border-dashed"
                          onClick={() => fileInputRefs.current[q.id]?.click()}
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Upload Proof to Claim Points
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                <span className="shrink-0 text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                  +{q.points} pts
                </span>
              </div>
            </div>
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

      <WeeklyQuestList quests={weekly} />
      <MonthlyQuestList quests={monthly} />
    </div>
  );
};

export default EcoQuest;
