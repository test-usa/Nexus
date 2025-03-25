import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
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
  const [selectedKey, setSelectedKey] = useState<LicenseKey | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleEditClick = (key: LicenseKey) => {
    setSelectedKey(key);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedKey) return;

    try {
      // Show confirmation dialog before updating
      if (!window.confirm("Are you sure you want to update this key?")) return;

      // Dynamically get the token from sessionStorage
      const authToken = sessionStorage.getItem("token");
      if (!authToken) {
        console.error("Authorization token is missing.");
        return;
      }

      // Send the PUT request with correct headers and body
      const response = await axios.put(
        `${API_BASE_URL}/update-key/${selectedKey._id}`,
        selectedKey, // Send the updated key data as the request body
        {
          headers: {
            "Content-Type": "application/json",
            token: `${authToken}`, // Authorization header with Bearer token
          },
        }
      );

      if (response.data.success) {
        fetchKeys(); // Refresh the keys list
        setShowModal(false); // Close the modal after update
      } else {
        console.error("Failed to update the key:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating key:", error);
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
    <div className="p-8 min-h-screen -mt-24">
      <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
        All Keys
      </h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="ext-sm font-semibold uppercase tracking-wide bg-gray-200">
            <tr>
              <th className="py-4 px-6">Key Name</th>
              <th className="py-4 px-6">Duration (Days)</th>
              <th className="py-4 px-6">Regular Users</th>
              <th className="py-4 px-6">Service Users</th>
              <th className="py-4 px-6">Regular Price ($)</th>
              <th className="py-4 px-6">Service Price ($)</th>
              <th className="py-4 px-6">Update</th>
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
                    onClick={() => handleEditClick(key)}
                    className="hover:bg-sky-600 hover:text-white rounded-sm p-2 text-sm bg-sky-500 transition-all"
                  >
                    <FaRegEdit />
                  </button>
                </td>

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

      {/* Update Modal */}
      {showModal && selectedKey && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Update Key</h3>

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Key Name
            </label>
            <input
              type="text"
              className="border p-2 w-full mb-3"
              value={selectedKey.keyName}
              onChange={(e) =>
                setSelectedKey({ ...selectedKey, keyName: e.target.value })
              }
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Duration (Days)
            </label>
            <input
              type="number"
              className="border p-2 w-full mb-3"
              value={selectedKey.duration}
              onChange={(e) =>
                setSelectedKey({
                  ...selectedKey,
                  duration: Number(e.target.value),
                })
              }
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Regular Key Price ($)
            </label>
            <input
              type="number"
              className="border p-2 w-full mb-3"
              value={selectedKey.prices.regularKey}
              onChange={(e) =>
                setSelectedKey({
                  ...selectedKey,
                  prices: {
                    ...selectedKey.prices,
                    regularKey: Number(e.target.value),
                  },
                })
              }
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Service Key Price ($)
            </label>
            <input
              type="number"
              className="border p-2 w-full mb-3"
              value={selectedKey.prices.serviceKey}
              onChange={(e) =>
                setSelectedKey({
                  ...selectedKey,
                  prices: {
                    ...selectedKey.prices,
                    serviceKey: Number(e.target.value),
                  },
                })
              }
            />

            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-400 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllKeys;
