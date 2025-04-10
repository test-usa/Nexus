import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const KeyTableHeader = () => {
  return (
    <TableHeader className="bg-[var(--color-dashboardsecondary)]">
      <TableRow>
        <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
          No
        </TableHead>
        <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
          Email
        </TableHead>
        <TableHead className="text-lg text-[var(--color-textcolor)]">
          Key
        </TableHead>
        <TableHead className="text-lg text-[var(--color-textcolor)]">
          Expiry Date
        </TableHead>
        <TableHead className="text-lg text-[var(--color-textcolor)]">
          Redeemed Users
        </TableHead>
        <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
          Created Date
        </TableHead>
        <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
          Status
        </TableHead>
        <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default KeyTableHeader;