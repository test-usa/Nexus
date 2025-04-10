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
import { MdDelete } from "react-icons/md";

interface DeleteModalProps {
  keyItem: { key: string };
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  confirmDelete: (key: string) => Promise<void>;
  isProcessing: boolean;
}

const DeleteModal = ({
  keyItem,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  confirmDelete,
  isProcessing,
}: DeleteModalProps) => {
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer">
          <MdDelete className="text-red-600 transition-transform duration-300 transform group-hover:scale-125" />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            Delete
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
        <DialogHeader>
          <DialogTitle>Delete License Key</DialogTitle>
          <DialogDescription className="text-white mt-4">
            Are you sure you want to delete this key? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDeleteModalOpen(false)}
            className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => confirmDelete(keyItem?.key as string)}
            disabled={isProcessing}
            className="border bg-transparent hover:bg-transparent cursor-pointer !border-red-400 text-white"
          >
            {isProcessing ? "Deleting..." : "Delete Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
