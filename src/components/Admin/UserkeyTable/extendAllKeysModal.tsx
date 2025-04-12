// src/components/GeneratedKeyTable/ExtendAllKeysModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

interface ExtendAllKeysModalProps {
  isExtendAllModalOpen: boolean;
  setIsExtendAllModalOpen: (open: boolean) => void;
  extendMinutes: number;
  extendHours: number;
  extendDays: number;
  setExtendMinutes: (minutes: number) => void;
  setExtendHours: (hours: number) => void;
  setExtendDays: (days: number) => void;
  calculateTotalDays: () => number;
  handleExtendAllKeys: () => void;
  isProcessing: boolean;
}

const ExtendAllKeysModal = ({
  isExtendAllModalOpen,
  setIsExtendAllModalOpen,
  extendMinutes,
  extendHours,
  extendDays,
  setExtendMinutes,
  setExtendHours,
  setExtendDays,
  calculateTotalDays,
  handleExtendAllKeys,
  isProcessing,
}: ExtendAllKeysModalProps) => {
  return (
    <Dialog open={isExtendAllModalOpen} onOpenChange={setIsExtendAllModalOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Extend All Keys
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
        <DialogHeader>
          <DialogTitle>Extend All Keys</DialogTitle>
          <DialogDescription>
            Extend the duration for all keys. Lifetime and unredeemed keys will
            be skipped.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="extend-days" className="text-right">
              Days
            </Label>
            <Input
              id="extend-days"
              type="number"
              value={extendDays}
              onChange={(e) => setExtendDays(Number(e.target.value))}
              className="col-span-3 bg-[#2a344a] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="extend-hours" className="text-right">
              Hours
            </Label>
            <Input
              id="extend-hours"
              type="number"
              value={extendHours}
              onChange={(e) => setExtendHours(Number(e.target.value))}
              className="col-span-3 bg-[#2a344a] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="extend-minutes" className="text-right">
              Minutes
            </Label>
            <Input
              id="extend-minutes"
              type="number"
              value={extendMinutes}
              onChange={(e) => setExtendMinutes(Number(e.target.value))}
              className="col-span-3 bg-[#2a344a] text-white border-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Total Days</Label>
            <p className="col-span-3">{calculateTotalDays()}</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsExtendAllModalOpen(false)}
            className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleExtendAllKeys}
            disabled={isProcessing}
            className="border bg-transparent hover:bg-transparent cursor-pointer !border-blue-400 text-white"
          >
            {isProcessing ? <Loader className="animate-spin mr-2" /> : null}
            {isProcessing ? "Extending..." : "Extend All Keys"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExtendAllKeysModal;
