import { CirclePlayIcon, CircleStopIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  isRunning: boolean;
  stop: () => void;
  start: () => void;
  arraySize: number;
  setArraySize: React.Dispatch<number>;
}

export const Toolbar = ({
  isRunning,
  stop,
  start,
  arraySize,
  setArraySize,
}: ToolbarProps) => {
  return (
    <nav className="w-full flex items-center divide-x divide-neutral-200 dark:divide-neutral-800 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-50">
      <div className="flex items-center gap-2 px-3 py-2">
        <Button
          variant={isRunning ? "destructive" : "default"}
          onClick={isRunning ? stop : start}
          className={cn("w-[100px]")}
        >
          {isRunning ? (
            <CircleStopIcon className="mr-2 size-5" />
          ) : (
            <CirclePlayIcon className="mr-2 size-5" />
          )}
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button variant={"ghost"}>
          <RotateCcwIcon className="mr-2 size-4" />
          Reset
        </Button>
      </div>

      <div className="flex items-center gap-5 px-3 py-2">
        <div className="flex items-center w-fit gap-3">
          <p className="whitespace-nowrap font-medium text-sm">Algorithm</p>
          <Select value="selection-sort">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="selection-sort">Selection sort</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center w-fit gap-3">
          <p className="whitespace-nowrap font-medium text-sm">Array size</p>
          <Slider
            value={[arraySize]}
            min={10}
            max={100}
            step={1}
            onValueChange={(value) => setArraySize(value[0])}
            className="w-[200px]"
          />
        </div>
      </div>

      <div className="px-3 py-2">
        <ModeToggle />
      </div>
    </nav>
  );
};
