import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

// Declare the type for the payment data
interface Payment {
  _id: string;
  userId: string;
  customerId: string;
  subscriptionId: string;
  transactionId: string;
  keyDetails:{
    amount:number,
    price:number
  }
  currentPeriodEnd: string;
  status: string;
  createdAt: string;
  key: {
    keyName:string
  }
}

const UserPayment: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { data, isSuccess, isLoading } = useFetch(
    "payment/get-all-user-payment"
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const paymentsPerPage = 10;
  const offset = currentPage * paymentsPerPage;
  const currentPayments = payments.slice(offset, offset + paymentsPerPage);

  // Handle data fetching
  useEffect(() => {
    if (isSuccess && data?.data) {
      setPayments(data.data);
    }
  }, [isSuccess, data]);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading payments...</span>
      </div>
    );
  }

  // Handle error in data
  if (data?.error) {
    return (
      <div className="text-red-500">Failed to load payments: {data.error}</div>
    );
  }

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
        User Payment
      </h2>

      <div className="overflow-x-auto shadow-lg border border-gray-300 bg-white rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Key Subscription Name
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Subscription/Transaction ID
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Key Amount
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Total Price
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase hidden sm:table-cell">
                Period End
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Purchased At
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {currentPayments.length ? (
              currentPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-sm">{payment.key.keyName}</td>
                  <td className="py-3 px-6 text-sm">
                    {payment.subscriptionId? payment.subscriptionId : payment.transactionId}
                  </td>
                  <td className="py-3 px-6 text-sm text-center">
                    {payment.keyDetails.amount}
                  </td>
                  <td className="py-3 px-6 text-sm text-center">
                    ${payment.keyDetails.price}
                  </td>
                  <td className="py-3 px-6 text-sm hidden sm:table-cell">
                    {new Date(payment.currentPeriodEnd).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-sm">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 px-6 text-center text-sm">
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(payments.length / paymentsPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
          previousClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
          nextClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
          activeClassName="bg-gray-500 text-white"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default UserPayment;
