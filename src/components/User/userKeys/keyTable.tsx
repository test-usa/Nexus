import { KeyTableRow } from './keyTableRow';
import { PaginationControls } from './paginationControl';
import { KeyStatus, Order } from './types';

interface KeyTableProps {
  keys: Order[];
  currentPage: number;
  totalPages: number;
  showFullKey: Record<string, boolean>;
  onPageChange: (page: number) => void;
  onToggleShowFullKey: (id: string) => void;
  onCopyKey: (key: string) => void;
  onShowDetails: (key: Order) => void;
  formatDateTime: (dateString: string) => string;
  getKeyStatus: (expiresAt: string | null) => KeyStatus;
}

export const KeyTable = ({
  keys,
  currentPage,
  totalPages,
  showFullKey,
  onPageChange,
  onToggleShowFullKey,
  onCopyKey,
  onShowDetails,
  formatDateTime,
  getKeyStatus,
}: KeyTableProps) => {
  return (
    <div className="overflow-x-auto shadow-lg border border-gray-300 bg-white rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">Key</th>
            <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">Key Type</th>
            <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">Purchase Date</th>
            <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">Expiry Date</th>
            <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">Status</th>
            <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <KeyTableRow
              key={key._id}
              keyData={key}
              showFullKey={showFullKey[key._id]}
              onToggleShowFullKey={onToggleShowFullKey}
              onCopyKey={onCopyKey}
              onShowDetails={onShowDetails}
              formatDateTime={formatDateTime}
              getKeyStatus={getKeyStatus}
            />
          ))}
        </tbody>
      </table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};