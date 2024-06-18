import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn, generateArray } from "@/lib/utils";
import useSelectionSort from "@/hooks/useSelectionSort";
import { Bar } from "@/components/bar";
import { Toolbar } from "@/components/toolbar";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  const [arraySize, setArraySize] = useState(50);
  const [array, setArray] = useState(generateArray(arraySize));

  const {
    array: sortedArray,
    currentIndices,
    start,
    stop,
    isRunning,
  } = useSelectionSort(array, 300 / arraySize);

  useEffect(() => {
    setArray(generateArray(arraySize));
  }, [arraySize]);

  const maxValue = Math.max(...sortedArray);

  return (
    <main className="dark:bg-neutral-900 h-screen w-full flex flex-col items-center justify-center dark:text-white overflow-hidden">
      <Toolbar
        isRunning={isRunning}
        stop={stop}
        start={start}
        arraySize={arraySize}
        setArraySize={setArraySize}
      />
      <section className="w-full flex-1 flex flex-col gap-2 p-4">
        <TooltipProvider>
          <div className={cn("w-full flex-1 flex items-end gap-2")}>
            {sortedArray.map((value, index) => {
              const height = (value / maxValue) * 100;
              const isCorrect =
                value === index + 1 && index <= currentIndices.i;
              const isBeingEvaluated = index === currentIndices.i;
              const isCurrentMin = index === currentIndices.min;
              const isInAction = index === currentIndices.j;

              return (
                <Bar
                  key={index}
                  value={value}
                  height={height}
                  isCorrect={isCorrect}
                  isBeingEvaluated={isBeingEvaluated || isCurrentMin}
                  isInAction={isInAction}
                />
              );
            })}
          </div>
        </TooltipProvider>

        <div className="relative h-5 w-full">
          <div
            className="absolute transition-all duration-100 left-0 top-0 h-full flex items-center justify-center"
            style={{
              left: `${(currentIndices.i / arraySize) * 100}%`,
              width: `${(1 / arraySize) * 100}%`,
            }}
          >
            <ChevronUp className="size-5" />
          </div>
          <div
            className="absolute transition-all duration-75 left-0 top-0 h-full flex items-center justify-center opacity-50"
            style={{
              left: `${(currentIndices.min / arraySize) * 100}%`,
              width: `${(1 / arraySize) * 100}%`,
            }}
          >
            <ChevronUp className="size-5" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
