import { Copy } from "lucide-react";
import { KeyStatus, Order } from "./types";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./statusBadge";

interface KeyTableRowProps {
  keyData: Order;
  showFullKey: boolean;
  onToggleShowFullKey: (id: string) => void;
  onCopyKey: (key: string) => void;
  onShowDetails: (key: Order) => void;
  formatDateTime: (dateString: string) => string;
  getKeyStatus: (expiresAt: string | null) => KeyStatus;
  rowClassName?: string;
}

export const KeyTableRow = ({
  keyData,
  showFullKey,
  onToggleShowFullKey,
  onCopyKey,
  onShowDetails,
  formatDateTime,
  getKeyStatus,
  rowClassName = "",
}: KeyTableRowProps) => {
  const status = getKeyStatus(keyData.expiresAt);

  console.log(keyData);

  return (
    <TableRow
      className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${rowClassName}`}
    >
      <TableCell className="px-6 sm:px-6 py-6 font-medium text-[16px]">
        <div className="flex items-center space-x-2">
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => onToggleShowFullKey(keyData._id)}
          >
            {showFullKey ? keyData.key : `${keyData.key.substring(0, 8)}...`}
          </span>
          <button
            onClick={() => onCopyKey(keyData.LicenseKey)}
            className="text-gray-600 hover:text-gray-800"
            title="Copy key"
          >
            <Copy size={16} />
          </button>
        </div>
      </TableCell>

      <TableCell className="text-[16px]">{keyData.keyType}</TableCell>
      <TableCell className="text-[16px]">
        {formatDateTime(keyData.createdAt)}
      </TableCell>
      <TableCell className="text-[16px]">
        {keyData.expiresAt ? formatDateTime(keyData.expiresAt) : "N/A"}
      </TableCell>
      <TableCell className="text-[16px]">
        <StatusBadge status={status} />
      </TableCell>

      <TableCell className="text-[16px]">
        <span
          className="inline-block px-3 py-1 rounded-full text-black bg-blue-100 cursor-pointer"
          onClick={() => onShowDetails(keyData)}
        >
          View Details
        </span>
      </TableCell>
    </TableRow>
  );
};

/* import { Copy, Info } from 'lucide-react';
import { KeyStatus, Order } from './types';
import { StatusBadge } from './statusBadge';


interface KeyTableRowProps {
  keyData: Order;
  showFullKey: boolean;
  onToggleShowFullKey: (id: string) => void;
  onCopyKey: (key: string) => void;
  onShowDetails: (key: Order) => void;
  formatDateTime: (dateString: string) => string;
  getKeyStatus: (expiresAt: string | null) => KeyStatus;
}

export const KeyTableRow = ({
  keyData,
  showFullKey,
  onToggleShowFullKey,
  onCopyKey,
  onShowDetails,
  formatDateTime,
  getKeyStatus,
}: KeyTableRowProps) => {
  const status = getKeyStatus(keyData.expiresAt);

  return (
    <tr key={keyData._id} className="hover:bg-gray-50 transition-colors duration-300">
      <td className="px-6 py-4 text-gray-800 border-b">
        <div className="flex items-center space-x-2">
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => onToggleShowFullKey(keyData._id)}
          >
            {showFullKey ? keyData.key : `${keyData.key.substring(0, 8)}...`}
          </span>
          <button 
            onClick={() => onCopyKey(keyData.key)} 
            className="text-gray-600 hover:text-gray-800"
            title="Copy key"
          >
            <Copy size={16} />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-800 border-b">{keyData.keyType}</td>
      <td className="px-6 py-4 text-gray-800 border-b">
        {formatDateTime(keyData.createdAt)}
      </td>
      <td className="px-6 py-4 text-gray-800 border-b">
        {formatDateTime(keyData.expiresAt as string)}
      </td>
      <td className="px-6 py-4 border-b">
        <StatusBadge status={status} />
      </td>
      <td className="px-6 py-4 border-b">
        <button
          onClick={() => onShowDetails(keyData)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Info size={18} />
          Details
        </button>
      </td>
    </tr>
  );
}; */
