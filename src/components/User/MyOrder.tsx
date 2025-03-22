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
      <div className="max-w-8xl  bg-white p-8 ">
        <h2 className="text-4xl font-semibold text-center text-gray-900 mb-10">
          My Orders
        </h2>

        {loading ? (
          <div className="text-center text-gray-600">Loading orders...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-600">You have no orders.</div>
        ) : (
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-lg text-gray-700 bg-gray-100 border-b">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-lg text-gray-700 bg-gray-100 border-b">
                  Key Type
                </th>
                <th className="px-6 py-3 text-left text-lg text-gray-700 bg-gray-100 border-b">
                  Purchase Date
                </th>
                <th className="px-6 py-3 text-left text-lg text-gray-700 bg-gray-100 border-b">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-lg text-gray-700 bg-gray-100 border-b">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-lg text-gray-700 bg-gray-100 border-b">
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
        )}
      </div>
    </div>
  );
};

export default MyOrder;

/* import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders"); 
        console.log(response.data); 
        setOrders(Array.isArray(response.data) ? response.data : []);
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          My Orders
        </h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading orders...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500">You have no orders.</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left text-gray-600">
                  Order ID
                </th>
                <th className="border-b px-4 py-2 text-left text-gray-600">
                  Key Type
                </th>
                <th className="border-b px-4 py-2 text-left text-gray-600">
                  Purchase Date
                </th>
                <th className="border-b px-4 py-2 text-left text-gray-600">
                  Expiry Date
                </th>
                <th className="border-b px-4 py-2 text-left text-gray-600">
                  Status
                </th>
                <th className="border-b px-4 py-2 text-left text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="border-b px-4 py-2">{order.id}</td>
                  <td className="border-b px-4 py-2">{order.keyType}</td>
                  <td className="border-b px-4 py-2">{order.purchaseDate}</td>
                  <td className="border-b px-4 py-2">{order.expiryDate}</td>
                  <td className="border-b px-4 py-2">
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
                  <td className="border-b px-4 py-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() =>
                        alert(`Viewing details for order #${order.id}`)
                      }
                    >
                      View Details
                    </button>
                    <button
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => alert(`Cancelling order #${order.id}`)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
 */
