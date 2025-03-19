import { useState } from "react";

const KeyGeneratorForm: React.FC = () => {
  const [keyType, setKeyType] = useState<string>("day");
  const [keyCount, setKeyCount] = useState<number>(1);
  const [generatedKeys, setGeneratedKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
      <div className="w-full max-w-lg bg-gray-950 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          Generate New Key
        </h2>

        <div className="mb-4">
          <label htmlFor="keyType" className="block text-gray-400 mb-2">
            Key Type
          </label>
          <select
            id="keyType"
            value={keyType}
            onChange={handleKeyTypeChange}
            className="w-full bg-gray-800 text-white p-2 rounded-lg focus:outline-none"
          >
            <option value="day">1 Day</option>
            <option value="week">1 Week</option>
            <option value="month">1 Month</option>
            <option value="three_month">3 Months</option>
            <option value="year">1 Year</option>
            <option value="lifetime">Lifetime</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="keyCount" className="block text-gray-400 mb-2">
            Number of Keys
          </label>
          <input
            type="number"
            id="keyCount"
            value={keyCount}
            onChange={handleKeyCountChange}
            min={1}
            className="w-full bg-gray-800 text-white p-2 rounded-lg focus:outline-none"
          />
        </div>

        <button
          onClick={generateKeys}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold text-white focus:outline-none"
        >
          {isLoading ? "Generating..." : "Generate Keys"}
        </button>

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {generatedKeys.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Generated Keys
            </h3>
            <ul className="bg-gray-800 p-4 rounded-lg">
              {generatedKeys.map((key, index) => (
                <li key={index} className="text-green-400">
                  {key}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyGeneratorForm;
