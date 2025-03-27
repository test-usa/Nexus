import { useEffect, useState } from "react";
import { Mail, User, Loader2 } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import toast from "react-hot-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data, isLoading } = useFetch("user/get-self");

  useEffect(() => {
    if (data?.success) {
      setUser(data.data);
      setLoading(false);
    }
  }, [data]);
  console.log(user);
  const defaultAvatar =
    "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12">
            <h2 className="text-3xl font-bold text-white text-center">
              User Profile
            </h2>
          </div>

          {loading || isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : (
            <div className="p-8">
              {/* Profile Photo Section */}
              <div className="flex justify-center -mt-20 mb-8">
                <div className="relative">
                  <img
                    src={user?.photo || defaultAvatar}
                    alt={user?.name || "User Avatar"}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition-colors"
                    onClick={() =>
                      toast.success("Photo upload functionality coming soon!")
                    }
                  ></button>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-6">
                {/* Name */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Full Name
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {user?.name}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    onClick={() =>
                      toast.success("Edit functionality coming soon!")
                    }
                  ></button>
                </div>

                {/* Email */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Email Address
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    onClick={() =>
                      toast.success("Edit functionality coming soon!")
                    }
                  ></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
