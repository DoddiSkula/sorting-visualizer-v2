import { useEffect, useState } from "react";
import { cn, generateArray } from "@/lib/utils";
import { Bar } from "@/components/bar";
import { Toolbar } from "@/components/toolbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IndexIndicator } from "./components/index-indicator";
import useSorting from "./hooks/use-sorting";

function App() {
  const [arraySize, setArraySize] = useState(30);
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
  } = useSorting(array, 50);

  useEffect(() => {
    setArray(generateArray(arraySize));
  }, [arraySize]);

  const maxValue = Math.max(...sortedArray);

  return (
    <main className="dark:bg-neutral-900 h-screen w-full flex flex-col items-center justify-center dark:text-white overflow-hidden">
      <Toolbar
        isRunning={isRunning}
        isSorted={isSorted}
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
            {sortedArray.map((value, index) => (
              <Bar
                key={value}
                value={value}
                height={(value / maxValue) * 100}
                // isCorrect={(value === index + 1 && isRunning) || isSorted}
                isEvaluated={currentIndices.evaluations.includes(index)}
                isHighlighted={currentIndices.highlights.includes(index)}
              />
            ))}
          </div>
        </TooltipProvider>
        <div className="relative h-5 w-full">
          <div>
            {currentIndices.evaluations.map((value) => (
              <IndexIndicator
                key={value}
                index={value}
                arraySize={arraySize}
                className={"opacity-50 transition-none"}
              />
            ))}
          </div>
          <div>
            {currentIndices.highlights.map((value) => (
              <IndexIndicator key={value} index={value} arraySize={arraySize} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
