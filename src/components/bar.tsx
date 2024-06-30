import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BarProps {
  value: number;
  height: number;
  isHighlighted: boolean;
  isCorrect?: boolean;
  className?: string;
}

export const Bar = ({
  value,
  height,
  isHighlighted,
  isCorrect,
  className,
}: BarProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "flex-1 h-full bg-neutral-200 hover:opacity-75 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-t-[3px]",
            {
              "bg-neutral-400/80 border-neutral-400 dark:bg-neutral-500/70 dark:border-neutral-500":
                isHighlighted,
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
