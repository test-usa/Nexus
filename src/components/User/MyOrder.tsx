import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Loader } from "lucide-react";

// Declare the type for the order data
interface Order {
  _id: string;
  LicenseKey: string;
  keyType: string;
  expiresAt: string;
  RedeemedBy: string[];
  createdAt: string;
  updatedAt: string;
}

const MyOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Retrieve the token from sessionStorage
  const token = sessionStorage.getItem("token");

  // Check if the token exists, if not show an error
  if (!token) {
    return (
      <div className="text-center text-red-600">
        You are not authenticated. Please log in.
      </div>
    );
  }

  // Decode the JWT token to extract the userId
  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the token
  console.log("Decoded token:", decodedToken);

  const userId = decodedToken.uid;
  console.log("User ID:", userId);

  // Check if userId is available, if not show error
  if (!userId) {
    return (
      <div className="text-center text-red-600">
        Failed to retrieve user information from token.
      </div>
    );
  }

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 10;
  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(""); // Reset error before making a new request

      try {
        const response = await fetch(
          `https://guidemc.vercel.app/api/v1/user-key/single-user-key/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`, // Add token in Authorization header
            },
          }
        );
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data.data); // Set the fetched data to state
      } catch (error: any) {
        setError(error.message || "Error fetching orders. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, token]);

  // Handle page change
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading orders...</span>
      </div>
    );
  }

  // Handle error in data
  if (error) {
    return <div className="text-red-500">Failed to load orders: {error}</div>;
  }

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
        My Orders
      </h2>

      <div className="overflow-x-auto shadow-lg border border-gray-300 bg-white rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Order ID
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                License Key
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Key Type
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Expiry Date
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Redeemed By
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {currentOrders.length ? (
              currentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-sm">{order._id}</td>
                  <td className="py-3 px-6 text-sm">{order.LicenseKey}</td>
                  <td className="py-3 px-6 text-sm">{order.keyType}</td>
                  <td className="py-3 px-6 text-sm">
                    {new Date(order.expiresAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-sm">
                    {order.RedeemedBy.join(", ")}
                  </td>
                  <td className="py-3 px-6 text-sm font-semibold capitalize">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-black bg-blue-100"
                      onClick={() =>
                        alert(`Viewing details for order #${order._id}`)
                      }
                    >
                      View Details
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 px-6 text-center text-sm">
                  No orders found.
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
          pageCount={Math.ceil(orders.length / ordersPerPage)}
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

export default MyOrder;
