import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import { useEffect, useState } from "react";

// Declare the type for the payment data
interface Payment {
  _id: string;
  userId: string;
  customerId: string;
  subscriptionId: string;
  currentPeriodEnd: string;
  status: string;
  createdAt: string;
}

const UserPayment: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { data, isSuccess, isLoading } = useFetch(
    "payment/get-all-user-payment"
  );

  // Handle data fetching
  useEffect(() => {
    if (isSuccess && data?.data) {
      setPayments(data.data);
    }
  }, [isSuccess, data]);

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
                Subscription ID
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase hidden sm:table-cell">
                Period End
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Payment Date
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {payments.length ? (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-sm">{payment.key.keyName}</td>
                  <td className="py-3 px-6 text-sm">
                    {payment.subscriptionId}
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
    </div>
  );
};

export default UserPayment;
