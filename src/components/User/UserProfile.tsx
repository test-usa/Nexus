import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

interface User {
  name: string;
  email: string;
  phone: string;
  photo: string; // Add a photo URL field
}

const UserProfile = () => {
  const [userData, setUserData] = useState<User>({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    photo: "https://via.placeholder.com/150", // Default photo
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<User>(userData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(userData);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({
          ...prev,
          photo: reader.result as string, // Update photo
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        User Profile
      </h2>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src={isEditing ? editData.photo : userData.photo}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
          {isEditing && (
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
            >
              <FaRegEdit />
            </label>
          )}
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-lg font-medium text-gray-700">Full Name</div>
            <div className="text-lg text-gray-500">{userData.name}</div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-lg font-medium text-gray-700">
              Email Address
            </div>
            <div className="text-lg text-gray-500">{userData.email}</div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-lg font-medium text-gray-700">
              Phone Number
            </div>
            <div className="text-lg text-gray-500">{userData.phone}</div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleEditClick}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
