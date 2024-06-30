import { CirclePauseIcon, CirclePlayIcon, RotateCcwIcon } from "lucide-react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import { cn } from "@/lib/utils";
import { sortOptions } from "@/data";

interface ToolbarProps {
  isRunning: boolean;
  isSorted: boolean;
  stop: () => void;
  start: () => void;
  reset: () => void;
  arraySize: number;
  setArraySize: React.Dispatch<number>;
  speed: string;
  setSpeed: React.Dispatch<string>;
  selectedSort: string;
  setSelectedSort: React.Dispatch<string>;
}

export const Toolbar = ({
  isRunning,
  isSorted,
  stop,
  start,
  reset,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  selectedSort,
  setSelectedSort,
}: ToolbarProps) => {
  return (
    <nav className="w-full overflow-hidden overflow-x-auto flex items-center flex-wrap divide-x divide-neutral-200 dark:divide-neutral-800 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 z-50">
      <div className="flex items-center gap-2 px-3 py-2">
        <Button
          variant={isRunning ? "secondary" : "default"}
          onClick={isRunning ? stop : start}
          className={cn("w-[100px]")}
          disabled={isSorted}
        >
          {isRunning ? (
            <CirclePauseIcon className="mr-2 size-5" />
          ) : (
            <CirclePlayIcon className="mr-2 size-5" />
          )}
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button variant={"ghost"} onClick={reset}>
          <RotateCcwIcon className="mr-2 size-4" />
          Reset
        </Button>
        <ToggleGroup
          type="single"
          value={speed}
          onValueChange={setSpeed}
          className="border rounded-md bg-white dark:bg-transparent dark:border-neutral-800 p-0.5"
        >
          <ToggleGroupItem
            value="0.5"
            aria-label="Toggle 0.5x speed"
            size={"sm"}
            className="rounded-[3px]"
          >
            0.5x
          </ToggleGroupItem>
          <ToggleGroupItem
            value="1"
            aria-label="Toggle 1x speed"
            size={"sm"}
            className="rounded-[3px]"
          >
            1x
          </ToggleGroupItem>
          <ToggleGroupItem
            value="2"
            aria-label="Toggle 2x speed"
            size={"sm"}
            className="rounded-[3px]"
          >
            2x
          </ToggleGroupItem>
          <ToggleGroupItem
            value="10"
            aria-label="Toggle 2x speed"
            size={"sm"}
            className="rounded-[3px]"
          >
            10x
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-5 px-3 py-2">
        <div className="flex items-center w-fit gap-3">
          <p className="whitespace-nowrap font-medium text-sm">Algorithm</p>
          <Select
            value={selectedSort}
            onValueChange={setSelectedSort}
            disabled={isRunning}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center w-fit gap-3">
          <p className="whitespace-nowrap font-medium text-sm">Array size</p>
          <Slider
            disabled={isRunning}
            value={[arraySize]}
            min={5}
            max={100}
            step={5}
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
