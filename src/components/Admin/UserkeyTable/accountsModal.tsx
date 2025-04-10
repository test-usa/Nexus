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
  import { Badge } from "@/components/ui/badge";
  import { Loader } from "lucide-react";
  import { FaUserLock } from "react-icons/fa";

  
  interface RedeemedAccount {
    accountId: string;
    redeemedAt: string;
    isBlocked?: boolean;
  }
  
  interface AccountsModalProps {
    keyItem: { key: string; RedeemedBy?: RedeemedAccount[] };
    isAccountsModalOpen: boolean;
    setIsAccountsModalOpen: (open: boolean) => void;
    isProcessing: boolean;
    isBlocking: boolean;
    isUnblocking: boolean;
    accountToBlock: string | null;
    accountToUnblock: string | null;
    setAccountToBlock: (accountId: string | null) => void;
    setAccountToUnblock: (accountId: string | null) => void;
    confirmBlockAccount: (accountId: string) => Promise<void>;
    confirmUnblockAccount: (accountId: string) => Promise<void>;
  }
  
  const AccountsModal = ({
    keyItem,
    isAccountsModalOpen,
    setIsAccountsModalOpen,
    isProcessing,
    isBlocking,
    isUnblocking,
    accountToBlock,
    accountToUnblock,
    setAccountToBlock,
    setAccountToUnblock,
    confirmBlockAccount,
    confirmUnblockAccount,
  }: AccountsModalProps) => {
    return (
      <Dialog open={isAccountsModalOpen} onOpenChange={setIsAccountsModalOpen}>
        <DialogTrigger asChild>
          <div
            className="relative group cursor-pointer"
            onClick={() => setIsAccountsModalOpen(true)}
          >
            <FaUserLock className="text-blue-500 transition-transform duration-300 transform group-hover:scale-125" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              View Accounts
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Redeemed Accounts</DialogTitle>
            <DialogDescription>
              Accounts that redeemed key: {keyItem?.key?.slice(0, 8)}...
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {keyItem?.RedeemedBy?.length ? (
              keyItem.RedeemedBy.map((account, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 border-b border-gray-700"
                >
                  <div>
                    <p className="font-medium">{account.accountId}</p>
                    {account.isBlocked && (
                      <Badge className="bg-red-500 text-xs mt-1">Blocked</Badge>
                    )}
                  </div>
                  <div>
                    {/* Block Button */}
                    {!account.isBlocked && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => setAccountToBlock(account.accountId)}
                          >
                            Block
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
                          <DialogHeader>
                            <DialogTitle>Block Account</DialogTitle>
                            <DialogDescription className="text-white mt-4">
                              Are you sure you want to block this account? This
                              will prevent them from using the key.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setAccountToBlock(null)}
                              className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => confirmBlockAccount(accountToBlock!)}
                              disabled={isBlocking || isProcessing}
                              className="border bg-transparent hover:bg-transparent cursor-pointer !border-red-400 text-white"
                            >
                              {isBlocking ? (
                                <Loader className="animate-spin mr-2" />
                              ) : null}
                              {isBlocking ? "Blocking..." : "Block Account"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                    {/* Unblock Button */}
                    {account.isBlocked && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                            onClick={() =>
                              setAccountToUnblock(account.accountId)
                            }
                          >
                            Unblock
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-[#1a233a] text-white">
                          <DialogHeader>
                            <DialogTitle>Unblock Account</DialogTitle>
                            <DialogDescription className="text-white mt-4">
                              Are you sure you want to unblock this account? This
                              will restore their access to the key.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setAccountToUnblock(null)}
                              className="border bg-transparent hover:bg-transparent cursor-pointer hover:text-white"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              variant="default"
                              onClick={() =>
                                confirmUnblockAccount(accountToUnblock!)
                              }
                              disabled={isUnblocking || isProcessing}
                              className="border bg-transparent hover:bg-transparent cursor-pointer !border-green-400 text-white"
                            >
                              {isUnblocking ? (
                                <Loader className="animate-spin mr-2" />
                              ) : null}
                              {isUnblocking ? "Unblocking..." : "Unblock Account"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No accounts found</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AccountsModal;