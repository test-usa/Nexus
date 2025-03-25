import { Copy, Info } from 'lucide-react';
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
        {formatDateTime(keyData.expiresAt)}
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
};