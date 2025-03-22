import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

type LicenseKey = {
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
  stripePriceId: {
    regularKey: number;
    serviceKey: number;
  };
  paymentLink: string;
};

const AllKeys: React.FC = () => {
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);

  // Fetch data from the API
  useEffect(() => {
    axios
      .get("https://guidemc.vercel.app/api/v1/key/all-key")
      .then((response) => {
        if (response.data.success) {
          setLicenseKeys(response.data.data);
        } else {
          console.error("Failed to fetch license keys");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="p-8  min-h-screen">
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
                  <button className="hover:bg-sky-600 hover:text-white rounded-sm p-2 text-sm bg-sky-500 transition-all duration-300">
                    <td className="py-2 px-2 text-sky-400">
                      <FaRegEdit />
                    </td>
                  </button>
                </td>

                <td>
                  <button className="hover:bg-red-600 hover:text-white rounded-sm p-2 text-sm bg-red-500 transition-all duration-300">
                    <td className="py-2 px-2 text-black">
                      <MdDeleteOutline className="p-" />
                    </td>
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

/* type LicenseKey = {
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
  paymentLink: string;
};

const licenseKeys: LicenseKey[] = [
  {
    _id: "67dbd5672370f73d7e810da8",
    keyName: "Day Key",
    duration: 1,
    users: { regularKey: 1, serviceKey: 5 },
    prices: { regularKey: 10, serviceKey: 20 },
    paymentLink: "https://buy.stripe.com/test_dR6eWb7Ra1M29naaF9",
  },
  {
    _id: "67dcdbf889d233aefa046360",
    keyName: "Month Key",
    duration: 30,
    users: { regularKey: 1, serviceKey: 5 },
    prices: { regularKey: 300, serviceKey: 500 },
    paymentLink: "https://buy.stripe.com/test_6oE7tJ3AUgGWfLy5lb",
  },
  {
    _id: "67dcdcc889d233aefa046363",
    keyName: "Year Key",
    duration: 365,
    users: { regularKey: 1, serviceKey: 5 },
    prices: { regularKey: 0, serviceKey: 400 },
    paymentLink: "https://buy.stripe.com/test_3csaFV9Zi0HYbvi290",
  },
];

const AdminLicenseKeys: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-semibold mb-6 text-gray-800">
        License Keys Management
      </h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-900 text-white text-lg">
            <tr>
              <th className="py-4 px-6">Key Name</th>
              <th className="py-4 px-6">Duration (Days)</th>
              <th className="py-4 px-6">Regular Users</th>
              <th className="py-4 px-6">Service Users</th>
              <th className="py-4 px-6">Regular Price ($)</th>
              <th className="py-4 px-6">Service Price ($)</th>
              <th className="py-4 px-6">Payment</th>
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
                <td className="py-4 px-6">
                  <a
                    href={key.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition-all"
                  >
                    Buy Now
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLicenseKeys;
 */
