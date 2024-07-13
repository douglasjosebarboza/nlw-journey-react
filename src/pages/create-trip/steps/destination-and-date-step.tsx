import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useState } from "react";
import { Modal } from "../../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de ' LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de ' LLL"))
      : null;

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />

        <Input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isGuestsInputOpen}
        className="flex w-[240px] items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />

        <span className="w-40 flex-1 text-lg text-zinc-400">
          {displayedDate || "Quando"}
        </span>
      </button>

      {isDatePickerOpen && (
        <Modal>
          <div className="space-y-5 rounded-lg bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button>
                  <X
                    onClick={closeDatePicker}
                    className="size-5 text-zinc-400"
                  />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </Modal>
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secundary" size="default">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput} variant="primary" size="default">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
