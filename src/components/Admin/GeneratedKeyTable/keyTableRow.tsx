import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AccountsModal from "./accountsModal";
import DeleteModal from "./deleteKeyModal";
import ExtendModal from "./extendModal";

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

interface KeyTableRowProps {
  keyItem: LicenseKey;
  index: number;
  offset: number;
  revealedKeys: Record<number, { email: boolean; key: boolean }>;
  toggleReveal: (index: number, field: "email" | "key") => void;
  isAccountsModalOpen: boolean;
  setIsAccountsModalOpen: (open: boolean) => void;
  isExtendModalOpen: boolean;
  setIsExtendModalOpen: (open: boolean) => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  extendMinutes: number;
  extendHours: number;
  extendDays: number;
  setExtendMinutes: (minutes: number) => void;
  setExtendHours: (hours: number) => void;
  setExtendDays: (days: number) => void;
  calculateTotalDays: () => number;
  confirmExtend: (key: string) => Promise<void>;
  confirmDelete: (key: string) => Promise<void>;
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

const isKeyExpired = (expiresAt: string | null): boolean => {
  if (!expiresAt || expiresAt === "Lifetime") return false;
  const expirationDate = new Date(expiresAt);
  const currentDate = new Date();
  return expirationDate < currentDate;
};

const KeyTableRow = ({
  keyItem,
  index,
  offset,
  revealedKeys,
  toggleReveal,
  isAccountsModalOpen,
  setIsAccountsModalOpen,
  isExtendModalOpen,
  setIsExtendModalOpen,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  extendMinutes,
  extendHours,
  extendDays,
  setExtendMinutes,
  setExtendHours,
  setExtendDays,
  calculateTotalDays,
  confirmExtend,
  confirmDelete,
  isProcessing,
  isBlocking,
  isUnblocking,
  accountToBlock,
  accountToUnblock,
  setAccountToBlock,
  setAccountToUnblock,
  confirmBlockAccount,
  confirmUnblockAccount,
}: KeyTableRowProps) => {
  const status =
    keyItem.expiresAt === null
      ? "Not Redeemed"
      : keyItem.expiresAt === "Lifetime"
      ? "Active"
      : isKeyExpired(keyItem.expiresAt)
      ? "Expired"
      : "Active";

  return (
    <TableRow
      className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${
        index % 2 === 0
          ? "bg-[var(--color-oddcolor)]"
          : "bg-[var(--color-evencolor)]"
      }`}
    >
      <TableCell className="font-medium px-6 sm:px-6 py-6 text-[16px]">
        {index + 1 + offset}
      </TableCell>
      <TableCell
        className="text-[16px] cursor-pointer"
        onClick={() => toggleReveal(index, "email")}
      >
        {revealedKeys[index]?.email
          ? keyItem.email
          : `${keyItem.email.slice(0, 6)}...`}
      </TableCell>
      <TableCell
        className="text-[16px] cursor-pointer"
        onClick={() => toggleReveal(index, "key")}
      >
        {revealedKeys[index]?.key
          ? keyItem.key
          : `${keyItem.key.slice(0, 6)}...`}
      </TableCell>
      <TableCell className="text-[16px]">
        {keyItem.expiresAt === null
          ? "N/A"
          : keyItem.expiresAt === "Lifetime"
          ? "Lifetime"
          : new Date(keyItem.expiresAt).toLocaleString()}
      </TableCell>
      <TableCell className="text-[16px]">{keyItem.redeemedUsers}</TableCell>
      <TableCell className="text-right text-[16px]">
        {new Date(keyItem.createdAt).toLocaleString()}
      </TableCell>
      <TableCell className="text-right text-[16px]">
        <Badge
          className={`capitalize px-3 py-1 text-sm font-medium text-black pr-10 ${
            status === "Not Redeemed"
              ? "bg-gray-400"
              : status === "Expired"
              ? "bg-red-400"
              : "bg-green-400"
          }`}
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-2xl flex justify-center gap-5 items-center mt-4">
        {keyItem.redeemedUsers > 0 && (
          <AccountsModal
            keyItem={keyItem}
            isAccountsModalOpen={isAccountsModalOpen}
            setIsAccountsModalOpen={setIsAccountsModalOpen}
            isProcessing={isProcessing}
            isBlocking={isBlocking}
            isUnblocking={isUnblocking}
            accountToBlock={accountToBlock}
            accountToUnblock={accountToUnblock}
            setAccountToBlock={setAccountToBlock}
            setAccountToUnblock={setAccountToUnblock}
            confirmBlockAccount={confirmBlockAccount}
            confirmUnblockAccount={confirmUnblockAccount}
          />
        )}
        <ExtendModal
          keyItem={keyItem}
          isExtendModalOpen={isExtendModalOpen}
          setIsExtendModalOpen={setIsExtendModalOpen}
          extendMinutes={extendMinutes}
          extendHours={extendHours}
          extendDays={extendDays}
          setExtendMinutes={setExtendMinutes}
          setExtendHours={setExtendHours}
          setExtendDays={setExtendDays}
          calculateTotalDays={calculateTotalDays}
          confirmExtend={confirmExtend}
          isProcessing={isProcessing}
        />
        <DeleteModal
          keyItem={keyItem}
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          confirmDelete={confirmDelete}
          isProcessing={isProcessing}
        />
      </TableCell>
    </TableRow>
  );
};

export default KeyTableRow;
