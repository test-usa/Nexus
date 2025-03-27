import { useState, useEffect } from "react";

interface Order {
  id: number;
  keyType: string;
  purchaseDate: string;
  expiryDate: string;
  status: string;
}

const MyOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Use static data instead of fetching from an API
  useEffect(() => {
    const fetchOrders = () => {
      try {
        // Static data for testing
        const staticOrders: Order[] = [
          {
            id: 1,
            keyType: "Reguler Key",
            purchaseDate: "2024-03-15",
            expiryDate: "2025-03-15",
            status: "Active",
          },
          {
            id: 2,
            keyType: "Service Key",
            purchaseDate: "2024-01-10",
            expiryDate: "2024-07-10",
            status: "Inactive",
          },
          {
            id: 3,
            keyType: "Reguler Key",
            purchaseDate: "2024-01-10",
            expiryDate: "2024-07-10",
            status: "Inactive",
          },
          {
            id: 4,
            keyType: "Reguler Key",
            purchaseDate: "2024-01-10",
            expiryDate: "2024-07-10",
            status: "Inactive",
          },
          {
            id: 5,
            keyType: "Service Key",
            purchaseDate: "2024-01-10",
            expiryDate: "2024-07-10",
            status: "Inactive",
          },
        ];
        setOrders(staticOrders);
      } catch (error) {
        setError("Error fetching orders. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-8xl bg-white p-8 ">
        <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
          My Orders
        </h2>

        {loading ? (
          <div className="text-center text-gray-600">Loading orders...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-600">You have no orders.</div>
        ) : (
          <div className="overflow-x-auto shadow-lg border border-gray-300 bg-white rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                    Order ID
                  </th>
                  <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                    Key Type
                  </th>
                  <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                    Purchase Date
                  </th>
                  <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                    Expiry Date
                  </th>
                  <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors duration-300"
                  >
                    <td className="px-6 py-4 text-gray-800 border-b">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-gray-800 border-b">
                      {order.keyType}
                    </td>
                    <td className="px-6 py-4 text-gray-800 border-b">
                      {order.purchaseDate}
                    </td>
                    <td className="px-6 py-4 text-gray-800 border-b">
                      {order.expiryDate}
                    </td>
                    <td className="px-6 py-4 border-b">
                      <span
                        className={`inline-block px-3 py-1 rounded-full ${
                          order.status === "Active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b space-x-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        onClick={() =>
                          alert(`Viewing details for order #${order.id}`)
                        }
                      >
                        View Details
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 font-medium transition-colors"
                        onClick={() => alert(`Cancelling order #${order.id}`)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
