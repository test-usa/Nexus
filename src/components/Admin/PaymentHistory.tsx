interface Payment {
  id: string;
  userEmail: string;
  amount: number;
  status: string;
  createdAt: string;
}

const payments: Payment[] = [
  {
    id: "txn_001",
    userEmail: "user1@example.com",
    amount: 5000,
    status: "succeeded",
    createdAt: "2024-03-18T10:30:00Z",
  },
  {
    id: "txn_002",
    userEmail: "user2@example.com",
    amount: 3000,
    status: "failed",
    createdAt: "2024-03-17T12:15:00Z",
  },
  {
    id: "txn_003",
    userEmail: "user3@example.com",
    amount: 7000,
    status: "succeeded",
    createdAt: "2024-03-16T08:45:00Z",
  },
  {
    id: "txn_004",
    userEmail: "user4@example.com",
    amount: 2500,
    status: "pending",
    createdAt: "2024-03-15T14:20:00Z",
  },
];

const PaymentHistory: React.FC = () => {
  return (
    <div className="overflow-x-auto p-6 ">
      <h2 className="text-2xl font-medium tracking-wide  text-gray-700 mb-6">
        Payment History
      </h2>

      <div className="overflow-x-auto shadow-lg border border-gray-300 bg-white rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                ID
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                User Email
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Amount
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Status
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <td className="py-3 px-6 text-sm">{payment.id}</td>
                <td className="py-3 px-6 text-sm">{payment.userEmail}</td>
                <td className="py-3 px-6 text-sm">
                  ${(payment.amount / 100).toFixed(2)}
                </td>
                <td className="py-3 px-6 text-sm hidden sm:table-cell">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-6 text-sm font-semibold capitalize">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-black ${
                      payment.status === "succeeded"
                        ? "bg-green-100"
                        : payment.status === "failed"
                        ? "bg-red-200"
                        : "bg-yellow-200"
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

export default PaymentHistory;

/* import { useEffect, useState } from "react";
import axios from "axios";

interface Payment {
  id: string;
  userEmail: string;
  amount: number;
  status: string;
  createdAt: string;
}

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/api/payments"); 
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Payments</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Transaction ID</th>
            <th className="py-2 px-4 text-left">User Email</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{payment.id}</td>
              <td className="py-2 px-4">{payment.userEmail}</td>
              <td className="py-2 px-4">${payment.amount / 100}</td>
              <td
                className={`py-2 px-4 font-semibold ${
                  payment.status === "succeeded"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {payment.status}
              </td>
              <td className="py-2 px-4">
                {new Date(payment.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory; */
