import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

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
      <ChevronUp className="size-5" />
    </div>
  );
};
