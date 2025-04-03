import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
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

interface Order {
  _id: string;
  LicenseKey: string;
  keyType: string;
  expiresAt: string;
  RedeemedBy: string[];
  createdAt: string;
  updatedAt: string;
}

const KeyM = () => {
  const {
    data: userKeys,
    isLoading,
    isSuccess,
  } = useFetch("/user-key/all-keys-user");
  const [orders, setOrders] = useState<Order[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 10;
  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);

  useEffect(() => {
    if (userKeys?.data) {
      setOrders(userKeys.data.reverse());
    }
  }, [userKeys]);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading orders...</span>
      </div>
    );
  }

  // Handle error in data
  if (!isSuccess) {
    return (
      <div className="text-red-500">
        Failed to load orders. Please try again.
      </div>
    );
  }

  return (
    <div className="pl-12 pr-12 pt-12 -sm:pr-5 ">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        My Orders
      </h1>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        {/* Added wrapper for scroll */}
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <TableHeader className="bg-[var(--color-dashboardsecondary)] ">
            <TableRow>
              <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
                Order ID
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                License Key
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Key Type
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Expiry Date
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Redeemed By
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.length ? (
              currentOrders.map((order, index) => (
                <TableRow
                  key={order._id}
                  className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${
                    index % 2 === 0
                      ? "bg-[var(--color-oddcolor)]"
                      : "bg-[var(--color-evencolor)]"
                  }`}
                >
                  <TableCell className="font-medium px-6 sm:px-6 py-6 text-[16px] ">
                    {order._id}
                  </TableCell>

                  <TableCell className="text-[16px]">
                    {order.LicenseKey}
                  </TableCell>

                  <TableCell className="text-left text-[16px]">
                    {order.keyType}
                  </TableCell>
                  <TableCell className="text-left text-[16px]">
                    {new Date(order.expiresAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-[16px]">
                    {order.RedeemedBy.join(", ")}
                  </TableCell>
                  <TableCell className="text-right text-[16px]">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-black bg-blue-100 cursor-pointer"
                      onClick={() =>
                        alert(`Viewing details for order #${order._id}`)
                      }
                    >
                      View Details
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-3 px-6 text-center text-sm"
                >
                  No payment records found.
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
          pageCount={Math.ceil(orders.length / ordersPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
          previousClassName="text-[16px]  px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          nextClassName="text-[16px]  px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          activeClassName="text-[16px]  text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default KeyM;
