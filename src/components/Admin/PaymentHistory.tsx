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

interface Payment {
  _id: string;
  userId: string;
  customerId: string;
  subscriptionId: string;
  currentPeriodEnd: string;
  status: string;
  createdAt: string;
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { data, isSuccess, isLoading } = useFetch("payment/get-all-payment");

  const [currentPage, setCurrentPage] = useState(0);
  const paymentsPerPage = 9;
  const offset = currentPage * paymentsPerPage;
  const currentPayments = payments.slice(offset, offset + paymentsPerPage);

  useEffect(() => {
    if (isSuccess && data?.data) {
      setPayments(data.data);
    }
  }, [isSuccess, data]);

  console.log(data)

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading payments...</span>
      </div>
    );
  }

  if (data?.error) {
    return (
      <div className="text-red-500">Failed to load payments: {data.error}</div>
    );
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen -mt-10 text-[var(--color-textcolor)]">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-5">
        Payment History
      </h1>
      <div className="rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)]">
            <TableRow className="text-sm font-semibold tracking-wide">
            <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Key Name
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                User ID
              </TableHead>

              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Transaction ID
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)] ">
                Amount
              </TableHead>

              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Price
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Purchase Date
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPayments.length ? (
              currentPayments.map((payment, index) => (
                <TableRow
                  key={payment._id}
                  className={`hover:bg-gray-200 hover:text-gray-700 ${
                    index % 2 === 0
                      ? " bg-[var(--color-oddcolor)]"
                      : "bg-[var(--color-evencolor)]"
                  }`}
                >
                <TableCell className="px-6 py-5 font-medium">
                    {payment.key.keyName}
                  </TableCell>
                  <TableCell className="px-6 py-5 font-medium">
                    {payment.userId}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    {payment.keyDetails.amount}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    {payment.keyDetails.price}
                  </TableCell>

                  <TableCell className="px-6 py-5">
                    {new Date(payment.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-gray-800 ${
                        payment.status === "active"
                          ? "bg-sky-400" // For active status
                          : payment.status === "refunded"
                          ? "bg-green-600" // For refunded status
                          : payment.status === "cancelled"
                          ? "bg-red-400" // For cancelled status
                          : "bg-gray-400" // Default color if status is something else
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-3 px-6 text-center text-sm"
                >
                  No payment records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(payments.length / paymentsPerPage)}
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

export default PaymentHistory;
