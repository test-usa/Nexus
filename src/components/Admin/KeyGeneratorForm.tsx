import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface FormData {
  keyName: string;
  duration: string;
  regularKey: string;
  serviceKey: string;
}

export default function CreateKeyForm() {
  const [formData, setFormData] = useState<FormData>({
    keyName: "",
    duration: "",
    regularKey: "",
    serviceKey: "",
  });
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    } else {
      setError("No auth token found. Please log in again.");
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    if (!authToken) {
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    if (
      !formData.keyName ||
      !formData.duration ||
      !formData.regularKey ||
      !formData.serviceKey
    ) {
      setError("All fields are required.");
      return;
    }

    if (
      isNaN(Number(formData.duration)) ||
      isNaN(Number(formData.regularKey)) ||
      isNaN(Number(formData.serviceKey))
    ) {
      setError("Please enter valid numeric values for duration and prices.");
      return;
    }

    const payload = {
      keyName: formData.keyName,
      duration: Number(formData.duration),
      users: { serviceKey: 5, regularKey: 1 },
      prices: {
        regularKey: Number(formData.regularKey),
        serviceKey: Number(formData.serviceKey),
      },
    };

    try {
      const response = await fetch(
        "https://guidemc.vercel.app/api/v1/key/create-key",
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

      setMessage("Key created successfully!");
      setFormData({
        keyName: "",
        duration: "",
        regularKey: "",
        serviceKey: "",
      });
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className=" max-w-lg text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] mx-auto mt-32 p-6 rounded-xl shadow-lg ">
      <h2 className="text-2xl font-semibold mb-5 ">Create Subscription Key</h2>

      {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}
      {message && <p className="text-green-600 mb-4 font-medium">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-[var(--color-textcolor)]"
      >
        {[
          { label: "Key Name", name: "keyName", type: "text" },
          { label: "Duration (Days)", name: "duration", type: "number" },
          { label: "Regular Key Price", name: "regularKey", type: "number" },
          { label: "Service Key Price", name: "serviceKey", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block  font-medium mb-2">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof FormData]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-500 rounded-lg bg-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-800 transition-all font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
