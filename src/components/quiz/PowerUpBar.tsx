import { Button } from "@/components/ui/button";
import { SplitSquareHorizontal, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PowerUp } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PowerUpBarProps {
  powerUps: {
    fiftyFifty: number;
    timeBoost: number;
    doublePoints: number;
  };
  onUsePowerUp: (type: "fiftyFifty" | "timeBoost" | "doublePoints") => void;
  disabled: boolean;
}

export const PowerUpBar = ({ powerUps, onUsePowerUp, disabled }: PowerUpBarProps) => {
  const powerUpsList: PowerUp[] = [
    {
      name: "fiftyFifty",
      count: powerUps.fiftyFifty,
      icon: <SplitSquareHorizontal className="h-4 w-4 text-yellow-500" />,
      description: "Removes two incorrect answers"
    },
    {
      name: "timeBoost",
      count: powerUps.timeBoost,
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      description: "Adds 15 seconds to the timer"
    },
    {
      name: "doublePoints",
      count: powerUps.doublePoints,
      icon: <Zap className="h-4 w-4 text-purple-500" />,
      description: "Doubles points for next correct answer"
    }
  ];

  return (
    <div className="flex gap-2">
      <TooltipProvider>
        {powerUpsList.map((powerUp) => (
          <Tooltip key={powerUp.name}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={powerUp.count === 0 || disabled}
                onClick={() => onUsePowerUp(powerUp.name as "fiftyFifty" | "timeBoost" | "doublePoints")}
                className={cn(
                  "gap-1 transition-all hover:scale-105",
                  powerUp.count > 0 && "animate-pulse"
                )}
              >
                {powerUp.icon}
                <span className="font-bold">{powerUp.count}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{powerUp.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};