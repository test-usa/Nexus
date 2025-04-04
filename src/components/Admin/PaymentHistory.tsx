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
  email:string,
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

const PaymentHistory = () => {
  //Move all useState hooks to  top
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { data, isSuccess, isLoading } = useFetch("payment/get-all-payment");

  useEffect(() => {
    if (isSuccess && data?.data) {
      console.log(data.data)
      setPayments(data.data);
    }
  }, [isSuccess, data]);

  const paymentsPerPage = 9;
  const offset = currentPage * paymentsPerPage;
  const currentPayments = payments.slice(offset, offset + paymentsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
    return <div className="text-red-500">Failed to payments: {data.error}</div>;
  }

  return (
    <div className="pl-12 pr-12 pt-12 -sm:pr-5 ">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        Payment History
      </h1>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        {/* Added wrapper for scroll */}
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <TableHeader className="bg-[var(--color-dashboardsecondary)] ">
            <TableRow>
              <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
                Key Name
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                User Email
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Transaction ID
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Amount
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Price
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Purchase Date
              </TableHead>
              <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPayments.length ? (
              currentPayments.map((payment, index) => (
                <TableRow
                  key={payment._id}
                  className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${
                    index % 2 === 0
                      ? "bg-[var(--color-oddcolor)]"
                      : "bg-[var(--color-evencolor)]"
                  }`}
                >
                  <TableCell className="font-medium px-6 sm:px-6 py-6 text-[16px] ">
                    {payment?.key?.keyName}
                  </TableCell>
                  <TableCell
                    className="text-[16px]"
                    onClick={() => toggleExpand(payment.email + "-email")}
                  >
                    {expandedRows[payment.email + "-email"]
                      ? payment?.email
                      : `${payment.email.slice(0, 5)}...`}
                  </TableCell>

                  <TableCell
                    className="text-left text-[16px]"
                    onClick={() => toggleExpand(payment._id + "-transactionId")}
                  >
                    {expandedRows[payment._id + "-transactionId"]
                      ? payment.transactionId
                      : `${payment.transactionId.slice(0, 5)}...`}
                  </TableCell>
                  <TableCell className="text-left text-[16px]">
                    {payment.keyDetails.amount}
                  </TableCell>
                  <TableCell className="text-right text-[16px]">
                    {payment.keyDetails.price}
                  </TableCell>
                  <TableCell className="text-right text-[16px]">
                    {new Date(payment.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-[16px]">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-gray-800 ${
                        payment.status === "active"
                          ? "bg-green-400"
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
          pageCount={Math.ceil(payments.length / paymentsPerPage)}
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

export default PaymentHistory;
