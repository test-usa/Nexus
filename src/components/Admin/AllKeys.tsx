import { useEffect, useState } from "react";
import axios from "axios";
/* import { FaRegEdit } from "react-icons/fa"; */
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_BASE_URL = "https://guidemc.vercel.app/api/v1/key";

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
  /*  const [selectedKey, setSelectedKey] = useState<LicenseKey | null>(null);
  const [showModal, setShowModal] = useState(false); */
  const [deleteKeyId, setDeleteKeyId] = useState<string | null>(null);

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

  /* const handleEditClick = (key: LicenseKey) => {
    setSelectedKey(key);
    setShowModal(true);
  }; */

  /* const handleUpdate = async () => {
    if (!selectedKey) return;
    if (!window.confirm("Are you sure you want to update this key?")) return;
    const authToken = sessionStorage.getItem("token");
    if (!authToken) {
      console.error("Authorization token is missing.");
      return;
    }
    try {
      const response = await axios.put(
        `${API_BASE_URL}/update-key/${selectedKey._id}`,
        selectedKey,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${authToken}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Key updated successfully!");
        fetchKeys();
        setShowModal(false);
      } else {
        toast.error("Failed to update the key");
      }
    } catch (error) {
      toast.error("Error updating key");
    }
  }; */

  const handleDelete = async () => {
    if (!deleteKeyId) return;
    const authToken = sessionStorage.getItem("token");
    if (!authToken) {
      console.error("Authorization token is missing.");
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/delete-key/${deleteKeyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: `${authToken}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to delete key");
      }
      toast.success("Key deleted successfully!");
      setLicenseKeys(licenseKeys.filter((key) => key._id !== deleteKeyId));
      setDeleteKeyId(null);
    } catch (error) {
      toast.error("Error deleting key");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="p-6 lg:p-8 min-h-screen -mt-10 text-[var(--color-textcolor)] ">
        <h1 className="text-2xl font-medium tracking-wide mb-5 mt-5">
          All User Information
        </h1>
        <div className="rounded-lg shadow-lg overflow-hidden ">
          <Table>
            <TableHeader className="bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)]">
              <TableRow className="text-sm font-semibold tracking-wide">
                <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                  Key Name
                </TableHead>
                <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                  Duration (Days)
                </TableHead>
                <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                  Regular Users
                </TableHead>
                <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                  Service Users
                </TableHead>
                <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                  Regular Price ($)
                </TableHead>
                <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                  Service Price ($)
                </TableHead>
                <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                  Delete
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenseKeys.map((key) => (
                <TableRow
                  key={key._id}
                  className="hover:bg-gray-200 hover:text-gray-700 "
                >
                  <TableCell className="px-6 py-5">{key.keyName}</TableCell>
                  <TableCell className="px-6 py-5 ">{key.duration}</TableCell>
                  <TableCell className="px-6 py-5 ">
                    {key.users.regularKey}
                  </TableCell>

                  <TableCell className="px-6 py-5 ">{key.duration}</TableCell>
                  <TableCell className="px-6 py-5 ">
                    ${key.prices.regularKey}
                  </TableCell>
                  <TableCell className="px-6 py-5 ">
                    ${key.prices.serviceKey}
                  </TableCell>
                  <TableCell className="px-6 py-5 ">
                    <button
                      onClick={() => setDeleteKeyId(key._id)}
                      className="hover:bg-red-600 hover:text-white rounded-sm p-2 text-base sm:text-lg font-bold bg-red-500 transition-all"
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {deleteKeyId && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-80 sm:w-96 shadow-lg text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm sm:text-base">
              Are you sure you want to delete this key?
            </p>
            <div className="mt-3 sm:mt-4 flex justify-center gap-2 sm:gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 text-xs sm:text-sm rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteKeyId(null)}
                className="bg-gray-400 text-white p-2 text-xs sm:text-sm rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllKeys;

/* 
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

const API_BASE_URL = "https://guidemc.vercel.app/api/v1/key";


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
  
      if (!window.confirm("Are you sure you want to update this key?")) return;

    
      const authToken = sessionStorage.getItem("token");
      if (!authToken) {
        console.error("Authorization token is missing.");
        return;
      }

   
      const response = await axios.put(
        `${API_BASE_URL}/update-key/${selectedKey._id}`,
        selectedKey, 
        {
          headers: {
            "Content-Type": "application/json",
            token: `${authToken}`, 
          },
        }
      );

      if (response.data.success) {
        fetchKeys(); 
        setShowModal(false); 
      } else {
        console.error("Failed to update the key:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating key:", error);
    }
  };

  const handleDelete = async (keyId: string) => {
    if (!window.confirm("Are you sure you want to delete this key?")) return;

    const authToken = sessionStorage.getItem("token"); 
    if (!authToken) {
      console.error("Authorization token is missing.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/delete-key/${keyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `${authToken}`, 
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete key");
      }

      setLicenseKeys(licenseKeys.filter((key) => key._id !== keyId));
    } catch (error) {
      console.error("Error deleting key:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen -mt-10">
      <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
        All Keys
      </h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="text-sm font-semibold uppercase tracking-wide bg-gray-200">
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
 */
