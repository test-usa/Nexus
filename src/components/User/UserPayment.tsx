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
  transactionId: string;
  status: string;
  createdAt: string;
  key: {
    keyName: string;
  };
  keyDetails: {
    amount: number;
    price: number;
  };
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { data, isSuccess, isLoading } = useFetch(
    "payment/get-all-user-payment"
  );
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(0);

  const paymentsPerPage = 9;
  const offset = currentPage * paymentsPerPage;
  const currentPayments = payments.slice(offset, offset + paymentsPerPage);

  useEffect(() => {
    if (isSuccess && data?.data) {
      setPayments(data.data);
    }
  }, [isSuccess, data]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Check if a payment is within the last 24 hours
  const isWithin24Hours = (createdAt: string) => {
    const paymentDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInMilliseconds =
      currentDate.getTime() - paymentDate.getTime();
    const differenceInHours = differenceInMilliseconds / (1000 * 3600);
    return differenceInHours <= 24;
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
    <div className="p-6 lg:p-8 min-h-screen text-[var(--color-textcolor)]">
      <h1 className="text-2xl font-medium tracking-wide mb-5 ">
        Payment History
      </h1>
      <div className="rounded-lg shadow-lg overflow-x-auto">
        <Table className="min-w-full">
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

                  <TableCell
                    className="px-6 py-5 font-medium cursor-pointer"
                    onClick={() => toggleExpand(payment._id + "-userId")}
                  >
                    {expandedRows[payment._id + "-userId"]
                      ? payment.userId
                      : payment.userId.slice(0, 5) + "..."}
                  </TableCell>

                  <TableCell
                    className="px-6 py-5 cursor-pointer"
                    onClick={() => toggleExpand(payment._id + "-transactionId")}
                  >
                    {expandedRows[payment._id + "-transactionId"]
                      ? payment.transactionId
                      : payment.transactionId.slice(0, 5) + "..."}
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
                          ? "bg-sky-400"
                          : payment.status === "refunded"
                          ? "bg-blue-600"
                          : payment.status === "cancelled"
                          ? "bg-red-400"
                          : "bg-gray-400"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>

                  {payment.status === "active" &&
                    isWithin24Hours(payment.createdAt) && (
                      <TableCell className="px-6 py-5">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                          Cancel Order
                        </button>
                      </TableCell>
                    )}
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
