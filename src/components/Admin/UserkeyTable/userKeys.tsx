import { useEffect, useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import useDelete from "@/hooks/shared/useDelete";
import useUpdate from "@/hooks/shared/useUpdate";
import { toast } from "sonner";
import KeyTableHeader from "./KeyTableHeader";
import KeyTableRow from "./keyTableRow";
import Pagination from "./pagination";
import ExtendAllKeysModal from "./extendAllKeysModal";

interface LicenseKey {
  key: string;
  email: string;
  expiresAt: string;
  createdAt: string;
  redeemedUsers: number;
  _id: string;
  RedeemedBy?: {
    accountId: string;
    redeemedAt: string;
    isBlocked?: boolean;
  }[];
}

const KeyManagement = () => {
  const [keys, setKeys] = useState<LicenseKey[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [revealedKeys, setRevealedKeys] = useState<
    Record<number, { email: boolean; key: boolean }>
  >({});
  const [openDeleteModalKey, setOpenDeleteModalKey] = useState<string | null>(
    null
  );
  const [openExtendModalKey, setOpenExtendModalKey] = useState<string | null>(
    null
  );
  const [openAccountsModalKey, setOpenAccountsModalKey] = useState<
    string | null
  >(null);
  const [isExtendAllModalOpen, setIsExtendAllModalOpen] = useState(false); // State for the new modal
  const [extendDays, setExtendDays] = useState(30);
  const [extendMinutes, setExtendMinutes] = useState(0);
  const [extendHours, setExtendHours] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accountToBlock, setAccountToBlock] = useState<string | null>(null);
  const [accountToUnblock, setAccountToUnblock] = useState<string | null>(null);

  const keysPerPage = 9;
  const { data, isSuccess, isLoading, refetch } = useFetch("/user-key/all-key");
  const { mutate: extendDuration } = useUpdate<any, any>(
    "/user-key/extend-duration"
  );
  const { mutate: extendAllKeys } = useUpdate<any, any>(
    "/user-key/extend-all-keys"
  ); // New hook for extending all keys
  const { mutate: deleteKey } = useDelete("/user-key/delete-key/");
  const { mutate: blockAccount, isPending: isBlocking } = useUpdate<any, any>(
    "/user-key/block-account"
  );
  const { mutate: unblockAccount, isPending: isUnblocking } = useUpdate<
    any,
    any
  >("/user-key/unblock-account");

  useEffect(() => {
    if (isSuccess && data?.data) {
      setKeys(
        data.data.map((item: any) => ({
          key: item.key,
          expiresAt: item.expiresAt,
          createdAt: item.createdAt,
          email: item.email,
          redeemedUsers: item.RedeemedBy?.length,
          _id: item._id,
          RedeemedBy: item.RedeemedBy || [],
        }))
      );
    }
  }, [isSuccess, data]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleReveal = (index: number, field: "email" | "key") => {
    setRevealedKeys((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: !prev[index]?.[field] },
    }));
  };

  const calculateTotalDays = () => {
    const minutesToDays = extendMinutes / (60 * 24);
    const hoursToDays = extendHours / 24;
    const totalDays = minutesToDays + hoursToDays + extendDays;
    return parseFloat(totalDays.toFixed(4));
  };

  const confirmExtend = async (key: string) => {
    setIsProcessing(true);
    try {
      const payload = {
        extendedDuration: calculateTotalDays(),
        key,
      };

      await extendDuration(payload, {
        onSuccess: (response: any) => {
          const message = response.data.isRedeemed
            ? "Key duration and expiration extended successfully"
            : "Key duration extended successfully (expiration not updated as key is not redeemed)";
          toast.success(message);
          refetch();
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to extend key");
        },
      });
    } catch (error) {
      toast.error("Failed to extend key");
    } finally {
      setIsProcessing(false);
      setOpenExtendModalKey(null);
      setExtendMinutes(0);
      setExtendHours(0);
      setExtendDays(0);
    }
  };

  const handleExtendAllKeys = async () => {
    setIsProcessing(true);
    try {
      const payload = {
        extendedDuration: calculateTotalDays(),
      };

      await extendAllKeys(payload, {
        onSuccess: () => {
          toast.success(`All redeemed keys extended successfully`);
          refetch();
        },
        onError: (error: any) => {
          toast.error(error.message || "Failed to extend all redeemed keys");
        },
      });
    } catch (error) {
      toast.error("Failed to extend all redeemed keys");
    } finally {
      setIsProcessing(false);
      setIsExtendAllModalOpen(false);
      setExtendMinutes(0);
      setExtendHours(0);
      setExtendDays(0);
    }
  };

  const confirmDelete = async (key: string) => {
    try {
      setIsProcessing(true);
      deleteKey(key, {
        onSuccess: () => {
          toast.success("Key deleted successfully");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete key");
        },
      });
    } finally {
      setIsProcessing(false);
      setOpenDeleteModalKey(null);
    }
  };

  const confirmBlockAccount = async (accountId: string, key: string) => {
    try {
      setIsProcessing(true);
      blockAccount(
        { key, accountId },
        {
          onSuccess: () => {
            toast.success(`Account ${accountId} blocked successfully`);
            refetch();
            setOpenAccountsModalKey(null);
          },
          onError: (error: any) => {
            toast.error(
              error.message || `Failed to block account ${accountId}`
            );
          },
        }
      );
    } finally {
      setIsProcessing(false);
      setAccountToBlock(null);
    }
  };

  const confirmUnblockAccount = async (accountId: string, key: string) => {
    try {
      setIsProcessing(true);
      unblockAccount(
        { key, accountId },
        {
          onSuccess: () => {
            toast.success(`Account ${accountId} unblocked successfully`);
            refetch();
            setOpenAccountsModalKey(null);
          },
          onError: (error: any) => {
            toast.error(
              error.message || `Failed to unblock account ${accountId}`
            );
          },
        }
      );
    } finally {
      setIsProcessing(false);
      setAccountToUnblock(null);
    }
  };

  const offset = currentPage * keysPerPage;
  const currentKeys = keys.slice(offset, offset + keysPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading keys data</span>
      </div>
    );
  }

  if (!isSuccess) {
    return <div className="text-red-500">Failed to load keys.</div>;
  }

  return (
    <div className="pl-12 pr-12 pt-12 -sm:pr-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-medium tracking-wide mt-4 text-[var(--color-textcolor)]">
          All User Keys
        </h1>
        <div className="flex gap-3">
          <ExtendAllKeysModal
            isExtendAllModalOpen={isExtendAllModalOpen}
            setIsExtendAllModalOpen={setIsExtendAllModalOpen}
            extendMinutes={extendMinutes}
            extendHours={extendHours}
            extendDays={extendDays}
            setExtendMinutes={setExtendMinutes}
            setExtendHours={setExtendHours}
            setExtendDays={setExtendDays}
            calculateTotalDays={calculateTotalDays}
            handleExtendAllKeys={handleExtendAllKeys}
            isProcessing={isProcessing}
          />
        </div>
      </div>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <KeyTableHeader />
          <TableBody>
            {currentKeys.map((keyItem, index) => (
              <KeyTableRow
                key={keyItem.key}
                keyItem={keyItem}
                index={index}
                offset={offset}
                revealedKeys={revealedKeys}
                toggleReveal={toggleReveal}
                isAccountsModalOpen={openAccountsModalKey === keyItem.key}
                setIsAccountsModalOpen={(open) => {
                  setOpenAccountsModalKey(open ? keyItem.key : null);
                }}
                isExtendModalOpen={openExtendModalKey === keyItem.key}
                setIsExtendModalOpen={(open) => {
                  setOpenExtendModalKey(open ? keyItem.key : null);
                }}
                isDeleteModalOpen={openDeleteModalKey === keyItem.key}
                setIsDeleteModalOpen={(open) => {
                  setOpenDeleteModalKey(open ? keyItem.key : null);
                }}
                extendMinutes={extendMinutes}
                extendHours={extendHours}
                extendDays={extendDays}
                setExtendMinutes={setExtendMinutes}
                setExtendHours={setExtendHours}
                setExtendDays={setExtendDays}
                calculateTotalDays={calculateTotalDays}
                confirmExtend={confirmExtend}
                confirmDelete={confirmDelete}
                isProcessing={isProcessing}
                isBlocking={isBlocking}
                isUnblocking={isUnblocking}
                accountToBlock={accountToBlock}
                accountToUnblock={accountToUnblock}
                setAccountToBlock={setAccountToBlock}
                setAccountToUnblock={setAccountToUnblock}
                confirmBlockAccount={(accountId) =>
                  confirmBlockAccount(accountId, keyItem.key)
                }
                confirmUnblockAccount={(accountId) =>
                  confirmUnblockAccount(accountId, keyItem.key)
                }
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination
        keysLength={keys.length}
        keysPerPage={keysPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default KeyManagement;
