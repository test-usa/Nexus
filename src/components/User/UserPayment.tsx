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
    "/payment//get-all-user-payment"
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
        Payment History
      </h2>

      <div className="overflow-x-auto shadow-lg border border-gray-300 bg-white rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                User ID
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Customer ID
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Subscription ID
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase hidden sm:table-cell">
                Period End
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Status
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Created At
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
                  <td className="py-3 px-6 text-sm">{payment.userId}</td>
                  <td className="py-3 px-6 text-sm">{payment.customerId}</td>
                  <td className="py-3 px-6 text-sm">
                    {payment.subscriptionId}
                  </td>
                  <td className="py-3 px-6 text-sm hidden sm:table-cell">
                    {new Date(payment.currentPeriodEnd).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-sm font-semibold capitalize">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-black ${
                        payment.status === "active"
                          ? "bg-green-100"
                          : "bg-yellow-200"
                      }`}
                    >
                      {payment.status}
                    </span>
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
/* import { useState, useEffect } from "react";

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: string;
}

const UserPayment: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const mockPayments: Payment[] = [
        {
          id: "1",
          date: "2025-03-20",
          amount: 50.0,
          method: "Credit Card",
          status: "Completed",
        },
        {
          id: "2",
          date: "2025-03-18",
          amount: 25.5,
          method: "PayPal",
          status: "Pending",
        },
        {
          id: "3",
          date: "2025-03-15",
          amount: 100.0,
          method: "Credit Card",
          status: "Completed",
        },
        {
          id: "4",
          date: "2025-03-25",
          amount: 140.0,
          method: "Credit Card",
          status: "Completed",
        },
        {
          id: "5",
          date: "2025-03-14",
          amount: 300.0,
          method: "Credit Card",
          status: "Completed",
        },
      ];
      setPayments(mockPayments);
    };

    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen  ">
      <div className="max-w-8xl  bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Payment History
        </h2>

        <table className="min-w-full table-auto bg-gray-50 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Payment Method
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm text-gray-800">
                  {payment.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {payment.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {payment.method}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPayment; */
