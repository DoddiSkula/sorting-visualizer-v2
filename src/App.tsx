import { useEffect, useState } from "react";
import { cn, generateArray } from "@/lib/utils";
import { Bar } from "@/components/bar";
import { Toolbar } from "@/components/toolbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IndexIndicator } from "@/components/index-indicator";
import useSorting from "./hooks/use-sorting";

function App() {
  const [arraySize, setArraySize] = useState(10);
  const [array, setArray] = useState(generateArray(arraySize));
  const [speed, setSpeed] = useState("1");

  const { sort, arraySnapshot, evaluations, highlights, playback } = useSorting(
    array,
    30 * Number(speed)
  );

  useEffect(() => {
    setArray(generateArray(arraySize));
  }, [arraySize]);

  const maxValue = Math.max(...array);

  return (
    <main className="dark:bg-neutral-900 h-screen w-full flex flex-col items-center justify-center dark:text-white overflow-hidden">
      <Toolbar
        isRunning={playback.isPlaying && !playback.isPaused}
        isSorted={false}
        stop={playback.pause}
        start={playback.start}
        reset={playback.reset}
        arraySize={arraySize}
        setArraySize={setArraySize}
        speed={speed}
        setSpeed={setSpeed}
      />
      <section className="w-full flex-1 flex flex-col gap-2 p-4">
        <TooltipProvider>
          <div className={cn("w-full flex-1 flex items-end gap-1")}>
            {arraySnapshot.map((value, index) => {
              const hasBeenHighlighted = sort.indices.highlights
                .filter((_, index) => index <= playback.index)
                .flat()
                .includes(index);

              return (
                <Bar
                  key={value}
                  value={value}
                  height={(value / maxValue) * 100}
                  isCorrect={value === index + 1 && hasBeenHighlighted}
                  isEvaluated={evaluations.includes(index)}
                  isHighlighted={highlights.includes(index)}
                />
              );
            })}
          </div>
        </TooltipProvider>
        <div className="relative h-5 w-full">
          <div>
            {evaluations.map((value) => (
              <IndexIndicator
                key={value}
                index={value}
                arraySize={arraySize}
                className={"opacity-50 transition-none"}
              />
            ))}
          </div>
          <div>
            {highlights.map((value) => (
              <IndexIndicator key={value} index={value} arraySize={arraySize} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
