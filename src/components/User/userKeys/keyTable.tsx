import ReactPaginate from "react-paginate";
import { KeyStatus, Order } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KeyTableRow } from "./keyTableRow";

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
    <div className="pl-12 pr-12 pt-12 -sm:pr-5">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        My License Keys
      </h1>

      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <TableHeader className="bg-[var(--color-dashboardsecondary)]">
            <TableRow>
              <TableHead className="px-6 sm:px-6 py-6 text-lg text-[var(--color-textcolor)]">
                Key
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Key Type
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Purchase Date
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Expiry Date
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Status
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {keys.length > 0 ? (
              keys.map((key, index) => (
                <KeyTableRow
                  key={key._id}
                  keyData={key}
                  showFullKey={showFullKey[key._id] || false}
                  onToggleShowFullKey={onToggleShowFullKey}
                  onCopyKey={onCopyKey}
                  onShowDetails={onShowDetails}
                  formatDateTime={formatDateTime}
                  getKeyStatus={getKeyStatus}
                  rowClassName={
                    index % 2 === 0
                      ? "bg-[var(--color-oddcolor)]"
                      : "bg-[var(--color-evencolor)]"
                  }
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-4 px-6 text-center text-sm"
                >
                  No license keys found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="mt-3 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={({ selected }) => onPageChange(selected)}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
          previousClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          nextClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          activeClassName="text-[16px] text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};
