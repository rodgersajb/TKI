"use client";

import BackNine from "./backnine";
import FrontNine from "./frontnine";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Scorecard({ playerScore }) {
  return (
    <main className="flex w-full">
      <Accordion>
        {playerScore && (
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="font-bold">Scorecard</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-9 gap-2">
                <FrontNine playerScore={playerScore} />
              </div>
              <div className="grid grid-cols-9 gap-2">
                <BackNine playerScore={playerScore} />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </main>
  );
}
