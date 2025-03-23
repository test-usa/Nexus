import { useState } from "react";

interface Key {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}

const UserDashboard: React.FC = () => {
  const [keys, setKeys] = useState<Key[]>([
    {
      id: "1",
      type: "day",
      status: "active",
      createdAt: "2025-03-20T10:00:00Z",
      expiresAt: "2025-03-21T10:00:00Z",
    },
    {
      id: "2",
      type: "month",
      status: "expired",
      createdAt: "2025-01-01T10:00:00Z",
      expiresAt: "2025-02-01T10:00:00Z",
    },
  ]);
  const [newKeyType, setNewKeyType] = useState<string>("day");

  const handleCreateKey = () => {
    const newKey: Key = {
      id: (keys.length + 1).toString(),
      type: newKeyType,
      status: "active",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    setKeys([...keys, newKey]);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((key) => key.id !== id));
  };

  return (
    <div className=" ">
      <div className="max-w-8xl mx-auto bg-white p-8 ">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">
          User Dashboard
        </h1>

        {/* Key Creation */}
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Create a New Key
          </h2>
          <div className="flex items-center gap-4">
            <select
              value={newKeyType}
              onChange={(e) => setNewKeyType(e.target.value)}
              className="w-52 border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="three_months">Three Months</option>
              <option value="year">Year</option>
              <option value="lifetime">Lifetime</option>
            </select>
            <button
              onClick={handleCreateKey}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Create Key
            </button>
          </div>
        </div>

        {/* Key Management */}
        <div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">Your Keys</h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-gray-600">Type</th>
                  <th className="p-4 text-gray-600">Status</th>
                  <th className="p-4 text-gray-600">Created At</th>
                  <th className="p-4 text-gray-600">Expires At</th>
                  <th className="p-4 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key, index) => (
                  <tr
                    key={key.id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4">{key.type}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          key.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {key.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(key.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4">
                      {new Date(key.expiresAt).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteKey(key.id)}
                        className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

/* 
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Key {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  expiresAt: string;
}

const Dashboard: React.FC = () => {
  const [keys, setKeys] = useState<Key[]>([]);
  const [newKeyType, setNewKeyType] = useState("day");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/keys");
        setKeys(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch keys.");
        setLoading(false);
      }
    };
    fetchKeys();
  }, []);

  const handleCreateKey = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/keys", {
        type: newKeyType,
      });
      setKeys([...keys, response.data]); 
    } catch (err) {
      setError("Failed to create key.");
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/keys/${id}`);
      setKeys(keys.filter((key) => key.id !== id)); 
    } catch (err) {
      setError("Failed to delete key.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">User Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-medium mb-4">Create a New Key</h2>
              <select
                value={newKeyType}
                onChange={(e) => setNewKeyType(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="three_months">Three Months</option>
                <option value="year">Year</option>
                <option value="lifetime">Lifetime</option>
              </select>
              <button
                onClick={handleCreateKey}
                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Create Key
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4">Your Keys</h2>
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Created At</th>
                    <th className="p-2 text-left">Expires At</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((key) => (
                    <tr key={key.id} className="border-b">
                      <td className="p-2">{key.type}</td>
                      <td className="p-2">{key.status}</td>
                      <td className="p-2">{key.createdAt}</td>
                      <td className="p-2">{key.expiresAt}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDeleteKey(key.id)}
                          className="bg-red-500 text-white py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
 */
