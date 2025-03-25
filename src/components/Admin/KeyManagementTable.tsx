import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const keysPerPage = 8;
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
    <div className=" p-6 lg:p-8 -mt-10 ">
      <Card className="shadow-lg rounded-xl border border-gray-300 bg-white">
        <CardHeader className="border-b border-gray-200 p-5">
          <CardTitle className="text-2xl font-medium tracking-wide text-gray-700 ">
            User Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table className="min-w-full border border-gray-200 rounded-lg">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                    No
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                    Key
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                    Expiry
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                    Created At
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {currentKeys.map((keyItem, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-all ease-in-out duration-200"
                  >
                    <TableCell className="px-6 py-3 text-gray-900">
                      {offset + index + 1}
                    </TableCell>
                    <TableCell
                      className="px-6 py-3 text-gray-800 cursor-pointer"
                      onClick={() => toggleReveal(index)}
                    >
                      {revealedKeys[index]
                        ? keyItem.key
                        : `${keyItem.key.slice(0, 18)}...`}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-gray-700">
                      {new Date(keyItem.expiresAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-gray-700">
                      {new Date(keyItem.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-gray-700">
                      <Badge
                        variant={
                          getStatus(keyItem.expiresAt) === "Active"
                            ? "default"
                            : "destructive"
                        }
                        className="capitalize px-3 py-1 text-sm font-medium"
                      >
                        {getStatus(keyItem.expiresAt)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={Math.ceil(keys.length / keysPerPage)}
              onPageChange={handlePageChange}
              containerClassName="flex items-center space-x-2"
              pageClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
              previousClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
              nextClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
              activeClassName="bg-gray-500 text-white"
              disabledClassName="text-gray-400 cursor-not-allowed"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyManagement;
