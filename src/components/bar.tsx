import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BarProps {
  value: number;
  height: number;
  isBeingEvaluated: boolean;
  isInAction: boolean;
  isCorrect: boolean;
  className?: string;
}

export const Bar = ({
  value,
  height,
  isBeingEvaluated,
  isInAction,
  isCorrect,
  className,
}: BarProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex-1 h-full bg-neutral-200 hover:opacity-75 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-t-md",
            {
              "bg-blue-500/80 border-blue-500 dark:bg-blue-400/50 dark:border-blue-400":
                isBeingEvaluated,
              "bg-neutral-500/80 border-neutral-500 dark:bg-neutral-400/70 dark:border-neutral-300":
                isInAction,
              "bg-green-500/80 border-green-500 dark:bg-emerald-400/70 dark:border-emerald-400":
                isCorrect,
            },
            className
          )}
          style={{ height: `${height}%` }}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{value}</p>
      </TooltipContent>
    </Tooltip>
  );
};
