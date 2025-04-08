import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";

interface LicenseKey {
  key: string;
  email: string;
  expiresAt: string;
  createdAt: string;
  redeemedUsers: number;
}

const KeyManagement = () => {
  const [keys, setKeys] = useState<LicenseKey[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [revealedKeys, setRevealedKeys] = useState<
    Record<number, { email: boolean; key: boolean }>
  >({});
  const keysPerPage = 9;
  const { data, isSuccess, isLoading } = useFetch("/user-key/all-key");

  useEffect(() => {
    if (isSuccess && data?.data) {
      setKeys(
        data.data.map((item: any) => ({
          key: item.key,
          expiresAt: item.expiresAt,
          createdAt: item.createdAt,
          email: item.email,
          redeemedUsers: item.RedeemedBy?.length,
        }))
      );
    }
    console.log(data);
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
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        All User Keys
      </h1>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        <Table className="rounded-sm shadow-lg overflow-hidden">
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentKeys.map((keyItem, index) => (
              <TableRow
                key={index}
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
                    : keyItem.expiresAt === "Livetime"
                    ? "Life time"
                    : new Date(keyItem.expiresAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-[16px]">
                  {keyItem.redeemedUsers}
                </TableCell>
                <TableCell className="text-right text-[16px]">
                  {new Date(keyItem.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-[16px]">
                  <Badge
                    className={`capitalize px-3 py-1 text-sm font-medium text-black pr-10 ${
                      keyItem.expiresAt === null
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {keyItem.expiresAt === null ? "Not Redeemed" : "Active"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="mt-3 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(keys.length / keysPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
          previousClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          nextClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          activeClassName="text-[16px] text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default KeyManagement;
