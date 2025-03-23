import { useState, useEffect } from "react";

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

export default UserPayment;
