import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {  MdEmail } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Email {
  from: string;
  to: string;
  subject: string;
  text: string;
}

interface Payment {
  _id: string;
  email: Email;
  guestUserId?: string;
  customerId?: string;
  transactionId?: string;
  status: "active" | "canceled" | "unpaid";
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
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<Payment | null>(null);

  const { data, isSuccess, isLoading } = useFetch("payment/get-all-payment");

  useEffect(() => {
    if (isSuccess && data?.data) {
      console.log(data.data);
      setPayments(data.data);
    }
  }, [isSuccess, data]);

  const paymentsPerPage = 9;
  const offset = currentPage * paymentsPerPage;
  const currentPayments = payments.slice(offset, offset + paymentsPerPage);

  // Calculate total price for the current page
  const totalPriceOnPage = currentPayments.reduce((total, payment) => {
    return total + payment.keyDetails.amount * payment.keyDetails.price;
  }, 0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  

  const handleViewEmail = (payment: Payment) => {
    setSelectedEmail(payment);
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
    <div className="pl-12 pr-12 pt-12 -sm:pr-5">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        Payment History
      </h1>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <TableHeader className="bg-[var(--color-dashboardsecondary)]">
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
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Price
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Total Price
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Purchase Date
              </TableHead>

              <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
                Email
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPayments.length ? (
              currentPayments.map((payment, index) => {
                const totalPrice =
                  payment.keyDetails.amount * payment.keyDetails.price;
                return (
                  <TableRow
                    key={payment._id}
                    className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${
                      index % 2 === 0
                        ? "bg-[var(--color-oddcolor)]"
                        : "bg-[var(--color-evencolor)]"
                    }`}
                  >
                    <TableCell className="font-medium px-6 sm:px-6 py-6 text-[16px]">
                      {payment?.key?.keyName}
                    </TableCell>
                    <TableCell
                      className="text-[16px]"
                      onClick={() => toggleExpand(payment.email?.to + "-email")}
                    >
                      {expandedRows[payment.email?.to + "-email"]
                        ? payment.email?.to
                        : `${payment.email?.to.slice(0, 5)}...`}
                    </TableCell>
                    <TableCell
                      className="text-left text-[16px]"
                      onClick={() =>
                        toggleExpand(payment._id + "-transactionId")
                      }
                    >
                      {expandedRows[payment._id + "-transactionId"]
                        ? payment.transactionId || "N/A"
                        : payment.transactionId
                        ? `${payment.transactionId.slice(0, 5)}...`
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-left text-[16px]">
                      {payment.keyDetails.amount}
                    </TableCell>
                    <TableCell className="text-left text-[16px]">
                      ${payment.keyDetails.price}
                    </TableCell>
                    <TableCell className="text-right text-[16px]">
                      ${totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-[16px]">
                      {new Date(payment.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right pr-10 text-[16px]">
                      <button
                        onClick={() => handleViewEmail(payment)}
                        className="hover:bg-blue-600 hover:text-white rounded-sm p-2 text-base sm:text-lg font-bold bg-blue-700 transition-all"
                      >
                        <MdEmail />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-3 px-6 text-center text-sm"
                >
                  No payment records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary of Total Price for Current Page */}
      {currentPayments.length > 0 && (
        <div className="mt-4 text-right text-[var(--color-textcolor)]">
          <p className="text-sm font-medium">
            Total Price (Current Page): ${totalPriceOnPage.toFixed(2)}
          </p>
        </div>
      )}

      {/* Pagination Section */}
      <div className="mt-3 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(payments.length / paymentsPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
          previousClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          nextClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          activeClassName="text-[16px] text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-[var(--color-dashboardsecondary)] p-6 rounded-xl shadow-lg w-80 sm:w-96 text-[var(--color-textcolor)]">
            <h2 className="text-2xl font-semibold mb-5">Payment Details</h2>
            <div className="space-y-3 text-lg">
              <p>
                <strong>Payment ID:</strong> {selectedPayment._id}
              </p>
              <p>
                <strong>Guest User ID:</strong>{" "}
                {selectedPayment.guestUserId || "N/A"}
              </p>
              <p>
                <strong>Customer ID:</strong>{" "}
                {selectedPayment.customerId || "N/A"}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {selectedPayment.transactionId || "N/A"}
              </p>
              <p>
                <strong>Key Name:</strong> {selectedPayment.key.keyName}
              </p>
              <p>
                <strong>Amount:</strong> {selectedPayment.keyDetails.amount}
              </p>
              <p>
                <strong>Price:</strong> ${selectedPayment.keyDetails.price}
              </p>
              <p>
                <strong>Total Price:</strong> $
                {(
                  selectedPayment.keyDetails.amount *
                  selectedPayment.keyDetails.price
                ).toFixed(2)}
              </p>
              <p>
                <strong>Purchase Date:</strong>{" "}
                {new Date(selectedPayment.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedPayment.status}
              </p>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setSelectedPayment(null)}
                className="bg-gray-500 text-white p-3 rounded transition-all duration-300 ease-in-out font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Details Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-[var(--color-dashboardsecondary)] p-6 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg text-[var(--color-textcolor)]">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Email Details
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-medium w-full sm:w-24">From:</label>
                <input
                  type="text"
                  value={selectedEmail.email?.from || ""}
                  readOnly
                  className="w-full p-2 rounded border border-gray-300 bg-gray-100 text-gray-800"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-medium w-full sm:w-24">To:</label>
                <input
                  type="text"
                  value={selectedEmail.email?.to || ""}
                  readOnly
                  className="w-full p-2 rounded border border-gray-300 bg-gray-100 text-gray-800"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-medium w-full sm:w-24">Subject:</label>
                <input
                  type="text"
                  value={selectedEmail.email?.subject || ""}
                  readOnly
                  className="w-full p-2 rounded border border-gray-300 bg-gray-100 text-gray-800"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <label className="font-medium w-full sm:w-24">Message:</label>
                <textarea
                  value={selectedEmail.email?.text || ""}
                  readOnly
                  className="w-full p-2 rounded border border-gray-300 bg-gray-100 text-gray-800 h-32 resize-none overflow-auto"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-medium w-full sm:w-24">Sent At:</label>
                <input
                  type="text"
                  value={new Date(selectedEmail.createdAt).toLocaleString()}
                  readOnly
                  className="w-full p-2 rounded border border-gray-300 bg-gray-100 text-gray-800"
                />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setSelectedEmail(null)}
                className="bg-gray-500 text-white p-3 rounded transition-all duration-300 ease-in-out font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
