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
    <div className="overflow-x-auto p-8 bg-gray-50 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Payment History
      </h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
              User Email
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
              Amount
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="py-3 px-6 text-left text-gray-700 font-medium uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="border-b hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                {payment.id}
              </td>
              <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                {payment.userEmail}
              </td>
              <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                ${(payment.amount / 100).toFixed(2)}
              </td>
              <td className="py-4 px-6 text-sm font-semibold capitalize">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-white ${
                    payment.status === "succeeded"
                      ? "bg-green-500"
                      : payment.status === "failed"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                {new Date(payment.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
