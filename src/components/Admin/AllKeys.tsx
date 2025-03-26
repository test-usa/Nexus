import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";

const API_BASE_URL = "https://guidemc.vercel.app/api/v1/key";

// Define the LicenseKey type
interface LicenseKey {
  _id: string;
  keyName: string;
  duration: number;
  users: {
    regularKey: number;
    serviceKey: number;
  };
  prices: {
    regularKey: number;
    serviceKey: number;
  };
}

const AllKeys: React.FC = () => {
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);


  // Fetch data from the API
  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all-key`);
      if (response.data.success) {
        setLicenseKeys(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



 
  const handleDelete = async (keyId: string) => {
    if (!window.confirm("Are you sure you want to delete this key?")) return;

    // Dynamically get the token from localStorage (or replace with your preferred method)
    const authToken = sessionStorage.getItem("token"); // Ensure that the authToken is stored correctly
    if (!authToken) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/delete-key/${keyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `${authToken}`, // Send the token as Bearer authorization
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete key");
      }

      // Update the license keys state after successful deletion
      setLicenseKeys(licenseKeys.filter((key) => key._id !== keyId));
    } catch (error) {
      console.error("Error deleting key:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
        All Keys
      </h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-4 px-6">Key Name</th>
              <th className="py-4 px-6">Duration (Days)</th>
              <th className="py-4 px-6">Regular Users</th>
              <th className="py-4 px-6">Service Users</th>
              <th className="py-4 px-6">Regular Price ($)</th>
              <th className="py-4 px-6">Service Price ($)</th>
              <th className="py-4 px-6">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700 text-lg">
            {licenseKeys.map((key) => (
              <tr
                key={key._id}
                className="border-b border-gray-300 hover:bg-gray-100 transition-all"
              >
                <td className="py-4 px-6">{key.keyName}</td>
                <td className="py-4 px-6">{key.duration}</td>
                <td className="py-4 px-6">{key.users.regularKey}</td>
                <td className="py-4 px-6">{key.users.serviceKey}</td>
                <td className="py-4 px-6">${key.prices.regularKey}</td>
                <td className="py-4 px-6">${key.prices.serviceKey}</td>
                <td>
                  <button
                    onClick={() => handleDelete(key._id)}
                    className="hover:bg-red-600 hover:text-white rounded-sm p-2 text-lg font-bold bg-red-500 transition-all"
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AllKeys;
