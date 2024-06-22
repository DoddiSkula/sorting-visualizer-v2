import { useEffect, useState } from "react";
import { cn, generateArray } from "@/lib/utils";
import useSelectionSort from "@/hooks/use-selection-sort";
import { Bar } from "@/components/bar";
import { Toolbar } from "@/components/toolbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IndexIndicator } from "./components/index-indicator";

function App() {
  const [arraySize, setArraySize] = useState(50);
  const [array, setArray] = useState(generateArray(arraySize));
  const [speed, setSpeed] = useState("1");

  const {
    array: sortedArray,
    currentIndices,
    start,
    stop,
    resetVisualization,
    isRunning,
    isSorted,
  } = useSelectionSort(array, (5 / Number(speed)) * 10);

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
        reset={resetVisualization}
        arraySize={arraySize}
        setArraySize={setArraySize}
        speed={speed}
        setSpeed={setSpeed}
      />
      <section className="w-full flex-1 flex flex-col gap-2 p-4">
        <TooltipProvider>
          <div className={cn("w-full flex-1 flex items-end gap-1")}>
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
                  isCorrect={(isRunning && isCorrect) || isSorted}
                  isBeingEvaluated={
                    isRunning && (isBeingEvaluated || isCurrentMin)
                  }
                  isInAction={isRunning && isInAction}
                />
              );
            })}
          </div>
        </TooltipProvider>
        <div className="relative h-5 w-full">
          {isRunning && (
            <>
              <IndexIndicator index={currentIndices.i} arraySize={arraySize} />
              <IndexIndicator
                index={currentIndices.min}
                arraySize={arraySize}
                className={"opacity-80 duration-75"}
              />
              <IndexIndicator
                index={currentIndices.j}
                arraySize={arraySize}
                className={"opacity-50 transition-none"}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
