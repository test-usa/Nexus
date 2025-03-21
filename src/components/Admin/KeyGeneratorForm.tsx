import { useState } from "react";

const KeyGeneratorForm: React.FC = () => {
  const [keyType, setKeyType] = useState<string>("year"); // Default to "year"
  const [keyCount, setKeyCount] = useState<number>(1);
  const [generatedKeys, setGeneratedKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // JSON data (can be fetched from an API or stored in a variable)
  const keyData = {
    keyName: "Year Key",
    duration: 365,
    users: {
      serviceKey: 5,
      regularKey: 1,
    },
    prices: {
      regularKey: 300,
      serviceKey: 800,
    },
  };

  // List of available key types from your data
  const keyTypes = [
    { value: "day", label: "1 Day" },
    { value: "week", label: "1 Week" },
    { value: "month", label: "1 Month" },
    { value: "three_month", label: "3 Months" },
    { value: "year", label: "1 Year" },
    { value: "lifetime", label: "Lifetime" },
  ];

  const handleKeyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKeyType(e.target.value);
  };

  const handleKeyCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyCount(parseInt(e.target.value, 10) || 1);
  };

  const generateKeys = async () => {
    setIsLoading(true);
    setError(""); // Reset error state
    try {
      const response = await fetch("/api/generate-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyType, keyCount }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate keys. Please try again.");
      }

      const data = await response.json();
      setGeneratedKeys(data.keys);
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg border border-gray-300">
        <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
          Generate New Key
        </h2>

        <div className="mb-6">
          <label
            htmlFor="keyType"
            className="block text-gray-600 mb-2 font-medium"
          >
            Key Type
          </label>
          <select
            id="keyType"
            value={keyType}
            onChange={handleKeyTypeChange}
            className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            {keyTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="keyCount"
            className="block text-gray-600 mb-2 font-medium"
          >
            Number of Keys
          </label>
          <input
            type="number"
            id="keyCount"
            value={keyCount}
            onChange={handleKeyCountChange}
            min={1}
            className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <button
          onClick={generateKeys}
          disabled={isLoading}
          className="w-full bg-gray-600 hover:bg-gray-800 py-3 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? "Generating..." : "Generate Keys"}
        </button>

        {error && (
          <div className="mt-4 text-red-600 font-medium">
            <p>{error}</p>
          </div>
        )}

        {generatedKeys.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Generated Keys
            </h3>
            <ul className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              {generatedKeys.map((key, index) => (
                <li key={index} className="text-green-600">
                  {key}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Displaying the pricing info based on selected key type */}
        <div className="mt-6 text-gray-600">
          <h3 className="text-lg font-medium">Pricing Information</h3>
          <p>
            {keyType === "year"
              ? `For ${keyData.keyName}, the price is ${keyData.prices.regularKey} for a regular key and ${keyData.prices.serviceKey} for a service key.`
              : `Price information for the selected key type is not available.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyGeneratorForm;
