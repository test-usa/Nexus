import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  MdOutlineDeleteOutline,
  MdOutlineEdit,
  MdOutlineVisibility,
} from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:4000/api/v1/key";

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
  badge?: string;
  description?: string;
  isListed: boolean;
}

interface FormData {
  keyName: string;
  badge: string;
  description: string;
  duration: string;
  regularKey: string;
  serviceKey: string;
  isListed: boolean;
}

const AllKeys = () => {
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);
  const [deleteKeyId, setDeleteKeyId] = useState<string | null>(null);
  const [updateKey, setUpdateKey] = useState<LicenseKey | null>(null);
  const [viewKey, setViewKey] = useState<LicenseKey | null>(null);
  const [formData, setFormData] = useState<FormData>({
    keyName: "",
    badge: "",
    description: "",
    duration: "",
    regularKey: "",
    serviceKey: "",
    isListed: true,
  });
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    fetchKeys();
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    } else {
      toast.error("No auth token found. Please log in again.");
    }
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authToken || !updateKey) {
      toast.error("Authentication token or key data is missing.");
      return;
    }

    if (
      !formData.keyName &&
      !formData.badge &&
      !formData.description &&
      !formData.duration &&
      !formData.regularKey &&
      !formData.serviceKey &&
      formData.isListed === updateKey.isListed
    ) {
      toast.error("At least one field must be provided to update the key.");
      return;
    }

    if (formData.duration && isNaN(Number(formData.duration))) {
      toast.error("Duration must be a valid number.");
      return;
    }
    if (formData.regularKey && isNaN(Number(formData.regularKey))) {
      toast.error("Regular key price must be a valid number.");
      return;
    }
    if (formData.serviceKey && isNaN(Number(formData.serviceKey))) {
      toast.error("Service key price must be a valid number.");
      return;
    }

    const payload: any = {};
    if (formData.keyName) payload.keyName = formData.keyName;
    if (formData.badge) payload.badge = formData.badge;
    if (formData.description) payload.description = formData.description;
    if (formData.duration) payload.duration = Number(formData.duration);
    if (formData.regularKey || formData.serviceKey) {
      payload.prices = {};
      if (formData.regularKey)
        payload.prices.regularKey = Number(formData.regularKey);
      if (formData.serviceKey)
        payload.prices.serviceKey = Number(formData.serviceKey);
    }
    if (formData.isListed !== updateKey.isListed)
      payload.isListed = formData.isListed;

    try {
      const response = await fetch(
        `${API_BASE_URL}/update-key/${updateKey._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: `${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update key");
      }

      toast.success("Key updated successfully!");
      setUpdateKey(null);
      setFormData({
        keyName: "",
        badge: "",
        description: "",
        duration: "",
        regularKey: "",
        serviceKey: "",
        isListed: true,
      });
      fetchKeys();
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  const handleUpdateClick = (key: LicenseKey) => {
    setUpdateKey(key);
    setFormData({
      keyName: key.keyName,
      badge: key.badge || "",
      description: key.description || "",
      duration: key.duration.toString(),
      regularKey: key.prices.regularKey.toString(),
      serviceKey: key.prices.serviceKey.toString(),
      isListed: key.isListed,
    });
  };

  return (
    <div className="pl-12 pr-12 pt-12 -sm:pr-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-medium tracking-wide mt-4 text-[var(--color-textcolor)]">
          All Subscription Keys
        </h1>
      </div>

      {/* Key Table */}
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        <div className="w-full overflow-x-scroll sm:overflow-x-hidden">
          <Table className="rounded-sm shadow-lg overflow-hidden min-w-max">
            <TableHeader className="bg-[var(--color-dashboardsecondary)]">
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
                <TableHead className="text-lg text-[var(--color-textcolor)]">
                  Listed
                </TableHead>
                <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
                  Actions
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
                  <TableCell className="text-[16px]">
                    {key.isListed ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="text-right pr-10 text-[16px] flex justify-end gap-2">
                    <button
                      onClick={() => setViewKey(key)}
                      className="hover:bg-green-600 hover:text-white rounded-sm p-2 text-base sm:text-lg font-bold bg-green-700 transition-all"
                    >
                      <MdOutlineVisibility />
                    </button>
                    <button
                      onClick={() => handleUpdateClick(key)}
                      className="hover:bg-blue-600 hover:text-white rounded-sm p-2 text-base sm:text-lg font-bold bg-blue-700 transition-all"
                    >
                      <MdOutlineEdit />
                    </button>
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

      {/* Delete Confirmation Modal */}
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

      {/* Update Key Modal */}
      {updateKey && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-[var(--color-dashboardsecondary)] p-4 sm:p-6 rounded-xl shadow-lg w-[90%] max-w-md sm:max-w-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5 text-[var(--color-textcolor)]">
              Update Subscription Key
            </h2>
            <form
              onSubmit={handleUpdateSubmit}
              className="space-y-3 sm:space-y-4 text-[var(--color-textcolor)] text-base sm:text-lg"
            >
              {[
                {
                  label: "Key Name",
                  name: "keyName",
                  type: "text",
                  required: false,
                },
                {
                  label: "Badge Name",
                  name: "badge",
                  type: "text",
                  required: false,
                },
                {
                  label: "Key Description",
                  name: "description",
                  type: "text",
                  required: false,
                },
                {
                  label: "Duration (Days)",
                  name: "duration",
                  type: "number",
                  required: false,
                },
                {
                  label: "Regular Key Price",
                  name: "regularKey",
                  type: "number",
                  required: false,
                },
                {
                  label: "Service Key Price",
                  name: "serviceKey",
                  type: "number",
                  required: false,
                },
              ].map(({ label, name, type, required }) => (
                <div
                  key={name}
                  className="flex flex-col sm:flex-row sm:items-center gap-2"
                >
                  <label className="font-medium w-full sm:w-32">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name as keyof FormData]}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-3 border border-gray-500 rounded bg-gray-300 text-black focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all"
                    required={required}
                  />
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-medium w-full sm:w-32">
                  List for Public Purchase
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isListed"
                    checked={formData.isListed}
                    onChange={handleChange}
                    className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-hovertext)] focus:ring-[var(--color-hovertext)] border-gray-500 rounded"
                  />
                  <span className="ml-2 text-xs sm:text-sm">
                    {formData.isListed
                      ? "Listed (Visible on Homepage)"
                      : "Unlisted (Hidden from Homepage)"}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2 flex-wrap">
                <button
                  type="submit"
                  className="bg-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] text-[var(--color-textcolor)] px-3 py-2 sm:px-4 sm:py-3 rounded transition-all duration-300 ease-in-out font-medium text-sm sm:text-base"
                >
                  Update Key
                </button>
                <button
                  type="button"
                  onClick={() => setUpdateKey(null)}
                  className="bg-gray-500 text-white px-3 py-2 sm:px-4 sm:py-3 rounded transition-all duration-300 ease-in-out font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Key Details Modal */}
      {viewKey && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-[var(--color-dashboardsecondary)] p-6 rounded-xl shadow-lg w-80 sm:w-96 text-[var(--color-textcolor)]">
            <h2 className="text-2xl font-semibold mb-5">Key Details</h2>
            <div className="space-y-3 text-lg">
              <p>
                <strong>Key Name:</strong> {viewKey.keyName}
              </p>
              <p>
                <strong>Badge:</strong> {viewKey.badge || "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {viewKey.description || "N/A"}
              </p>
              <p>
                <strong>Duration (Days):</strong> {viewKey.duration}
              </p>
              <p>
                <strong>Regular Users:</strong> {viewKey.users.regularKey}
              </p>
              <p>
                <strong>Regular Price ($):</strong> {viewKey.prices.regularKey}
              </p>
              <p>
                <strong>Service Users:</strong> {viewKey.users.serviceKey}
              </p>
              <p>
                <strong>Service Price ($):</strong> {viewKey.prices.serviceKey}
              </p>
              <p>
                <strong>Listed:</strong>{" "}
                {viewKey.isListed
                  ? "Yes (Visible on Homepage)"
                  : "No (Hidden from Homepage)"}
              </p>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => setViewKey(null)}
                className="bg-gray-500 text-white p-3 rounded transition-all duration-300 ease-in-out font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllKeys;
