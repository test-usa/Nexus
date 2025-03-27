import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";

interface LicenseKey {
  key: string;
  expiresAt: string;
  createdAt: string;
}

const KeyManagement = () => {
  const [keys, setKeys] = useState<LicenseKey[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [revealedKeys, setRevealedKeys] = useState<Record<number, boolean>>({});
  const keysPerPage = 9;
  const { data, isSuccess, isLoading } = useFetch("/user-key/all-key");

  useEffect(() => {
    if (isSuccess && data?.data) {
      setKeys(
        data.data.map((item: any) => ({
          key: item.key,
          expiresAt: item.expiresAt,
          createdAt: item.createdAt,
        }))
      );
    }
  }, [isSuccess, data]);

  const getStatus = (expiresAt: string) => {
    return new Date(expiresAt) > new Date() ? "Active" : "Expired";
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleReveal = (index: number) => {
    setRevealedKeys((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const offset = currentPage * keysPerPage;
  const currentKeys = keys.slice(offset, offset + keysPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading keys...</span>
      </div>
    );
  }

  if (!isSuccess) {
    return <div className="text-red-500">Failed to load keys.</div>;
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen -mt-10 text-[var(--color-textcolor)] ">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-5">
        All User Keys
      </h1>
      <div className="rounded-lg shadow-lg overflow-hidden ">
        <Table>
          <TableHeader className="bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)]">
            <TableRow className="text-sm font-semibold tracking-wide">
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                No
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Key
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Expiry
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Created At
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentKeys.map((keyItem, index) => (
              <TableRow
                key={index}
                className={`hover:bg-gray-200 hover:text-gray-700 ${
                  index % 2 === 0
                    ? " bg-[var(--color-oddcolor)]"
                    : "bg-[var(--color-evencolor)]"
                }`}
              >
                <TableCell className="px-6 py-5 font-medium">
                  {index + 1 + offset}
                </TableCell>
                <TableCell
                  className="px-2 sm:px-4 py-5 truncate cursor-pointer"
                  onClick={() => toggleReveal(index)}
                >
                  {revealedKeys[index]
                    ? keyItem.key
                    : `${keyItem.key.slice(0, 18)}...`}
                </TableCell>
                <TableCell className="px-6 py-5">
                  {new Date(keyItem.expiresAt).toLocaleString()}
                </TableCell>
                <TableCell className="px-6 py-5 ">
                  {" "}
                  {new Date(keyItem.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="px-6 py-5 ">
                  <Badge
                    variant={
                      getStatus(keyItem.expiresAt) === "Active"
                        ? "default"
                        : "destructive"
                    }
                    className={`capitalize px-3 py-1 text-sm font-medium text-black ${
                      getStatus(keyItem.expiresAt) === "Active"
                        ? "bg-sky-400"
                        : "bg-[var(--color-successtwo)]"
                    }`}
                  >
                    {getStatus(keyItem.expiresAt)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-9 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(keys.length / keysPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)]"
          previousClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)]"
          nextClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)]"
          activeClassName="text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default KeyManagement;
