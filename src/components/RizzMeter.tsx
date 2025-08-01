import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RizzMeterProps {
  rizzLevel: number;
  isAnimating?: boolean;
}

export const RizzMeter = ({ rizzLevel, isAnimating = false }: RizzMeterProps) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const [rizzType, setRizzType] = useState<'L' | 'W' | 'Unspoken'>('L');

  useEffect(() => {
    if (rizzLevel > 0) {
      // Animate the meter needle
      const timer = setTimeout(() => {
        setDisplayLevel(rizzLevel);
      }, 500);

      // Determine rizz type
      if (rizzLevel >= 80) {
        setRizzType('Unspoken');
      } else if (rizzLevel >= 50) {
        setRizzType('W');
      } else {
        setRizzType('L');
      }

      return () => clearTimeout(timer);
    }
  }, [rizzLevel]);

  const getMeterColor = () => {
    if (displayLevel >= 80) return 'hsl(var(--warning))'; // Gold for Unspoken
    if (displayLevel >= 50) return 'hsl(var(--success))'; // Green for W
    return 'hsl(var(--destructive))'; // Red for L
  };

  const getRizzDescription = () => {
    switch (rizzType) {
      case 'Unspoken':
        return 'Pure vibes. They\'re already impressed without you saying a word! 🔥';
      case 'W':
        return 'Strong charisma! You know how to charm and impress. 💫';
      case 'L':
        return 'Room for improvement! Practice makes perfect. 📈';
      default:
        return '';
    }
  };

  const getBadgeVariant = () => {
    switch (rizzType) {
      case 'Unspoken':
        return 'default';
      case 'W':
        return 'default';
      case 'L':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Calculate needle rotation (-90deg to +90deg, total 180deg range)
  const needleRotation = -90 + (displayLevel / 100) * 180;

  return (
    <Card className="p-8 bg-gradient-card backdrop-blur-sm border border-border/20 shadow-card">
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Rizz Meter
          </h2>
          <p className="text-muted-foreground">
            Your charisma level analysis
          </p>
        </div>

        {/* Meter Gauge */}
        <div className="relative w-64 h-32 mx-auto">
          {/* Meter Background */}
          <svg
            width="256"
            height="128"
            viewBox="0 0 256 128"
            className="absolute inset-0"
          >
            {/* Background arc */}
            <path
              d="M 20 108 A 108 108 0 0 1 236 108"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              strokeLinecap="round"
            />
            
            {/* Colored segments */}
            <path
              d="M 20 108 A 108 108 0 0 1 128 20"
              fill="none"
              stroke="hsl(var(--destructive))"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 128 20 A 108 108 0 0 1 236 108"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 190 45 A 108 108 0 0 1 236 108"
              fill="none"
              stroke="hsl(var(--warning))"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Needle */}
            <g transform={`translate(128, 108)`}>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-80"
                stroke={getMeterColor()}
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${needleRotation})`}
                className={isAnimating ? 'animate-meter-bounce' : 'transition-transform duration-1000 ease-out'}
                style={{
                  filter: `drop-shadow(0 0 8px ${getMeterColor()})`
                }}
              />
              {/* Needle center */}
              <circle
                cx="0"
                cy="0"
                r="6"
                fill={getMeterColor()}
                className="animate-pulse-glow"
              />
            </g>

            {/* Scale markers */}
            {[0, 25, 50, 75, 100].map((value, index) => {
              const angle = -90 + (value / 100) * 180;
              const x = 128 + Math.cos((angle * Math.PI) / 180) * 90;
              const y = 108 + Math.sin((angle * Math.PI) / 180) * 90;
              return (
                <text
                  key={value}
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  className="text-xs fill-muted-foreground font-medium"
                >
                  {value}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Results Display */}
        {rizzLevel > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">
                {displayLevel}%
              </div>
              <Badge 
                variant={getBadgeVariant()}
                className="text-lg px-4 py-2 font-bold"
              >
                {rizzType} Rizz
              </Badge>
            </div>
            
            <p className="text-muted-foreground max-w-md mx-auto">
              {getRizzDescription()}
            </p>
          </div>
        )}

        {rizzLevel === 0 && (
          <div className="text-center text-muted-foreground">
            <div className="text-6xl mb-4 opacity-50">🎯</div>
            <p>Upload or record audio to measure your rizz level</p>
          </div>
        )}
      </div>
    </Card>
  );
};