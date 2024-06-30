import { cn } from "@/lib/utils";
import { Triangle } from "lucide-react";

interface IndexIndicatorProps {
  index: number;
  arraySize: number;
  className?: string | string[] | { [key: string]: boolean };
}

export const IndexIndicator = ({
  index,
  arraySize,
  className,
}: IndexIndicatorProps) => {
  if (index === null || index === undefined) return null;

  return (
    <div
      className={cn(
        "absolute transition-all duration-100 left-0 top-0 h-full flex items-center justify-center",
        className
      )}
      style={{
        left: `${(index / arraySize) * 100}%`,
        width: `${(1 / arraySize) * 100}%`,
      }}
    >
      <Triangle
        className="size-5 fill-neutral-400/80 stroke-neutral-400 dark:fill-neutral-500/70 dark:stroke-neutral-500"
        strokeWidth={1}
      />
    </div>
  );
};
