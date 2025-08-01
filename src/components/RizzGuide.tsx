import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RizzGuide = () => {
  const rizzTypes = [
    {
      type: "W Rizz",
      description: "Strong, successful charisma or flirting",
      example: "She pulled that off with straight W rizz.",
      color: "success",
      icon: "🔥",
      range: "50-79%"
    },
    {
      type: "L Rizz", 
      description: "Lack of charm or failed attempt at flirting",
      example: "Bro tried to flirt and got rejected hard. L rizz.",
      color: "destructive",
      icon: "😅",
      range: "0-49%"
    },
    {
      type: "Unspoken Rizz",
      description: "When someone impresses others without even talking—pure vibes",
      example: "He just stood there and they were already into him. Unspoken rizz.",
      color: "warning",
      icon: "✨",
      range: "80-100%"
    }
  ];

  return (
    <Card className="p-8 bg-gradient-card backdrop-blur-sm border border-border/20 shadow-card">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Understanding Rizz
          </h2>
          <p className="text-muted-foreground">
            Learn about the different types of charisma levels
          </p>
        </div>

        <div className="space-y-4">
          {rizzTypes.map((rizz, index) => (
            <div
              key={rizz.type}
              className="p-4 rounded-lg bg-muted/10 border border-border/10 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{rizz.icon}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{rizz.type}</h3>
                    <Badge variant="outline" className="text-xs">
                      {rizz.range}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rizz.description}
                  </p>
                  <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-3">
                    "{rizz.example}"
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            <strong>Rizz</strong> is derived from "charisma" - your ability to attract, 
            charm, or flirt with others through personality, words, or presence.
          </p>
        </div>
      </div>
    </Card>
  );
};