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
  import { GiDuration } from "react-icons/gi";
  
  interface ExtendModalProps {
    keyItem: { key: string };
    isExtendModalOpen: boolean;
    setIsExtendModalOpen: (open: boolean) => void;
    extendMinutes: number;
    extendHours: number;
    extendDays: number;
    setExtendMinutes: (minutes: number) => void;
    setExtendHours: (hours: number) => void;
    setExtendDays: (days: number) => void;
    calculateTotalDays: () => number;
    confirmExtend: (key: string) => Promise<void>;
    isProcessing: boolean;
  }
  
  const ExtendModal = ({
    keyItem,
    isExtendModalOpen,
    setIsExtendModalOpen,
    extendDays,
    setExtendMinutes,
    setExtendHours,
    setExtendDays,
    calculateTotalDays,
    confirmExtend,
    isProcessing,
  }: ExtendModalProps) => {
    return (
      <Dialog open={isExtendModalOpen} onOpenChange={setIsExtendModalOpen}>
        <DialogTrigger asChild>
          <div className="relative group cursor-pointer">
            <GiDuration className="text-yellow-600 transition-transform duration-300 transform group-hover:scale-125" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              Extend Time
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
          <DialogHeader>
            <DialogTitle>Extend License Key</DialogTitle>
            <DialogDescription>
              Extend the expiration date for key: {keyItem?.key?.slice(0, 8)}...
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minutes" className="text-right">
                Minutes
              </Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                placeholder="0"
                onChange={(e) => setExtendMinutes(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hours" className="text-right">
                Hours
              </Label>
              <Input
                id="hours"
                type="number"
                min="0"
                placeholder="0"
                onChange={(e) => setExtendHours(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="days" className="text-right">
                Days
              </Label>
              <Input
                id="days"
                type="number"
                min="0"
                placeholder="0"
                value={extendDays}
                onChange={(e) => setExtendDays(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Total</Label>
              <div className="col-span-3 text-sm">{calculateTotalDays()} days</div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
              onClick={() => setIsExtendModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => confirmExtend(keyItem?.key || "")}
              disabled={isProcessing}
              className="border bg-transparent hover:bg-transparent cursor-pointer !border-blue-400"
            >
              {isProcessing ? "Extending..." : "Extend Key"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ExtendModal;