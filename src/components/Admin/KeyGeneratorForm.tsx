import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";

interface FormData {
  keyName: string;
  badge: string;
  duration: string;
  regularKey: string;
  serviceKey: string;
  description: string;
  isListed: boolean;
}

export default function CreateKeyForm() {
  const [formData, setFormData] = useState<FormData>({
    keyName: "",
    badge: "",
    description: "",
    duration: "",
    regularKey: "",
    serviceKey: "",
    isListed: true, // Default to true (listed)
  });
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    } else {
      toast.error("No auth token found. Please log in again.");
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authToken) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }

    if (
      !formData.keyName ||
      !formData.duration ||
      !formData.regularKey ||
      !formData.serviceKey
    ) {
      toast.error(
        "Key name, duration, regular key price, and service key price are required."
      );
      return;
    }

    if (
      isNaN(Number(formData.duration)) ||
      isNaN(Number(formData.regularKey)) ||
      isNaN(Number(formData.serviceKey))
    ) {
      toast.error("Please enter valid numeric values for duration and prices.");
      return;
    }

    const payload = {
      keyName: formData.keyName,
      badge: formData.badge,
      description: formData.description,
      duration: Number(formData.duration),
      users: { serviceKey: 5, regularKey: 1 },
      prices: {
        regularKey: Number(formData.regularKey),
        serviceKey: Number(formData.serviceKey),
      },
      isListed: formData.isListed, // Include listed field
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/key/create-key`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create key");
      }

      toast.success("Key created successfully!");
      setFormData({
        keyName: "",
        badge: "",
        description: "",
        duration: "",
        regularKey: "",
        serviceKey: "",
        isListed: true, // Reset to true
      });
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-lg text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] mx-auto mt-24  p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-5">Create Subscription Key</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-[var(--color-textcolor)] text-lg"
      >
        {[
          { label: "Key Name", name: "keyName", type: "text", required: true },
          { label: "Badge Name", name: "badge", type: "text", required: false },
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
            required: true,
          },
          {
            label: "Regular Key Price",
            name: "regularKey",
            type: "number",
            required: true,
          },
          {
            label: "Service Key Price",
            name: "serviceKey",
            type: "number",
            required: true,
          },
        ].map(({ label, name, type, required }) => (
          <div key={name}>
            <label className="block font-medium mb-2">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof FormData]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-500 rounded bg-gray-300 text-black focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all"
              required={required}
            />
          </div>
        ))}
        <div>
          <label className="block font-medium mb-2">
            List for Public Purchase
          </label>
          <input
            type="checkbox"
            name="listed"
            defaultChecked={formData.isListed}
            onChange={handleChange}
            className="h-5 w-5 text-[var(--color-hovertext)] focus:ring-[var(--color-hovertext)] border-gray-500 rounded"
          />
          <span className="ml-2 text-sm">
            {formData.isListed
              ? "Listed (Visible on Homepage)"
              : "Unlisted (Hidden from Homepage)"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] text-[var(--color-textcolor)] p-3 rounded transition-all duration-300 ease-in-out font-medium"
        >
          Create Key
        </button>
      </form>
    </div>
  );
}
