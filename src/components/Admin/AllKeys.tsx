import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

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

const AllKeys = () => {
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);
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
    <div className="pl-12 pr-12 pt-12 -sm:pr-5 ">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        All Subscription Key
      </h1>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        <div className="w-full overflow-x-scroll sm:overflow-x-hidden">
          <Table className="rounded-sm shadow-lg overflow-hidden min-w-max">
            <TableHeader className="bg-[var(--color-dashboardsecondary)] ">
              <TableRow>
                <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
                  Key Name
                </TableHead>
                <TableHead className="text-lg text-[var(--color-textcolor)]">
                  Duration (Days)
                </TableHead>
                <TableHead className="text-lg text-[var(--color-textcolor)]">
                  Regular Users
                </TableHead>
                <TableHead className="text-lg text-[var(--color-textcolor)]">
                  Regular Price ($)
                </TableHead>
                <TableHead className="text-lg text-[var(--color-textcolor)]">
                  Service Users
                </TableHead>
                <TableHead className="text-lg text-[var(--color-textcolor)]">
                  Service Price ($)
                </TableHead>
                <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
                  Delete
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licenseKeys.map((key, index) => (
                <TableRow
                  key={key._id}
                  className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${
                    index % 2 === 0
                      ? "bg-[var(--color-oddcolor)]"
                      : "bg-[var(--color-evencolor)]"
                  }`}
                >
                  <TableCell className="font-medium px-6 sm:px-6 py-6 text-[16px]">
                    {key.keyName}
                  </TableCell>
                  <TableCell className="text-[16px]">{key.duration}</TableCell>
                  <TableCell className="text-[16px]">
                    {key.users.regularKey}
                  </TableCell>
                  <TableCell className="text-[16px]">
                    ${key.prices.regularKey}
                  </TableCell>
                  <TableCell className="text-[16px]">
                    {key.users.serviceKey}
                  </TableCell>
                  <TableCell className="text-[16px]">
                    ${key.prices.serviceKey}
                  </TableCell>
                  <TableCell className="text-right pr-10 text-[16px]">
                    <button
                      onClick={() => setDeleteKeyId(key._id)}
                      className="hover:bg-red-600 hover:text-white rounded-sm p-2 text-base sm:text-lg font-bold bg-red-700 transition-all"
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
          <div className="bg-gray-400 p-4 sm:p-6 rounded w-80 sm:w-96 shadow-lg text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm sm:text-base">
              Are you sure you want to delete this key?
            </p>
            <div className="mt-3 sm:mt-4 flex justify-center gap-2 sm:gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-700 text-white p-2 text-xs sm:text-sm rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteKeyId(null)}
                className="bg-gray-500 text-white p-2 text-xs sm:text-sm rounded"
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
