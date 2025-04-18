import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useFetch from "@/hooks/shared/useFetch";
import usePost from "@/hooks/shared/usePost";
import useUpdate from "@/hooks/shared/useUpdate";
import { KeyStatus, Order, RedeemUserPayload, User } from "./types";
import { KeyTable } from "./keyTable";
import { KeyDetailsModal } from "./ketDetailsModal";

export const MyKeys = () => {
  const queryClient = useQueryClient();

  // Fetch user keys from API
  const {
    data: userKeys,
    isLoading,
    isSuccess,
  } = useFetch("/user-key/all-keys-user");
  console.log(userKeys);

  // Redeem user API mutation
  const { mutate: redeemUser, isPending: isRedeeming } = useUpdate<
    any,
    RedeemUserPayload
  >("/user-key/redeem-user-key");

  // Renew subscription API mutation
  const { mutate: renewSubscription, isPending: isRenewing } = usePost<
    any,
    {
      key: string;
      keyType: string;
      licensekey: string;
    }
  >("/payment/renew-subscription");

  // State management
  const [keys, setKeys] = useState<Order[]>([]);
  const [selectedKey, setSelectedKey] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redeemedUsers, setRedeemedUsers] = useState<User[]>([]);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [redeemError, setRedeemError] = useState("");
  const [renewError, setRenewError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Show/hide full key state
  const [showFullKey, setShowFullKey] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (userKeys?.data) {
      setKeys(userKeys.data.reverse());
    }
  }, [userKeys]);

  // Pagination logic
  const totalPages = Math.ceil(keys.length / itemsPerPage);
  const paginatedKeys = keys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle key visibility
  const toggleShowFullKey = (id: string) => {
    setShowFullKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Copy key to clipboard
  const copyToClipboard = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast.success("Key copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy key");
    }
  };

  // Format date
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Determine key status
  const getKeyStatus = (expiresAt: string | null): KeyStatus => {
    if (expiresAt === null) {
      return {
        label: "Active",
        className: "bg-green-100 text-green-800 border-green-200",
      };
    }

    const now = new Date();
    const expiryDate = new Date(expiresAt);
    const isExpired = expiryDate < now;

    return isExpired
      ? {
          label: "Expired",
          className: "bg-red-100 text-red-800 border-red-200",
        }
      : {
          label: "Active",
          className: "bg-green-100 text-green-800 border-green-200",
        };
  };

  // Open key details modal
  const showKeyDetails = async (key: Order) => {
    setSelectedKey(key);
    setIsModalOpen(true);
    setShowEmailInput(false);
    setEmail("");
    setRedeemError("");
    setRenewError("");

    if (key.keyType === "Service") {
      setRedeemedUsers(key.RedeemedBy || []);
    } else {
      setRedeemedUsers([]);
    }
  };

  // Handle renew subscription
  const handleRenewKey = async (keyId: string) => {
    setRenewError("");
    const keyToRenew = keys.find((key) => key._id === keyId);

    if (!keyToRenew) {
      setRenewError("Key not found");
      return;
    }

    renewSubscription(
      {
        key: keyToRenew.key,
        keyType: keyToRenew.keyType,
        licensekey: keyToRenew.LicenseKey,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["user-key", "all-keys-user"],
          });

          if (data?.data) {
            setKeys((prevKeys) =>
              prevKeys.map((key) =>
                key._id === keyId ? { ...key, ...data.data } : key
              )
            );
            if (data.data.url) {
              window.open(data.data.url, "_self");
            }
          }

          setIsModalOpen(false);
        },
        onError: (error: any) => {
          setRenewError(error.message || "Failed to renew subscription");
          toast.error(error.message || "Failed to renew subscription");
        },
      }
    );
  };

  // Handle redeem new user
  const handleRedeemNewUser = async () => {
    if (!selectedKey) return;

    if (!showEmailInput) {
      setShowEmailInput(true);
      return;
    }

    if (!email || !email.includes("@")) {
      setRedeemError("Please enter a valid email address");
      return;
    }

    if (redeemedUsers.length >= 5) {
      setRedeemError("Maximum number of users (5) already reached");
      return;
    }

    setRedeemError("");

    redeemUser(
      {
        keyId: selectedKey._id,
        userEmail: email,
      },
      {
        onSuccess: (data) => {
          if (data?.data?.RedeemedBy) {
            setRedeemedUsers(data.data.RedeemedBy);
            setKeys((prevKeys) =>
              prevKeys.map((key) =>
                key._id === selectedKey._id
                  ? { ...key, RedeemedBy: data.data.RedeemedBy }
                  : key
              )
            );
            toast.success("User added successfully");
          }

          setShowEmailInput(false);
          setEmail("");
        },
        onError: (error: any) => {
          setRedeemError(error.message || "Failed to redeem key");
          toast.error(error.message || "Failed to redeem key");
        },
      }
    );
  };

  return (
    <div className="">
      <div className="">
        {isLoading ? (
           <p className="text-center mt-4 text-white">Loading user keys...</p>
        ) : !isSuccess ? (
          <div className="text-center text-red-600">Something went wrong</div>
        ) : keys.length === 0 ? (
          <div className="text-center text-gray-600">You have no keys.</div>
        ) : (
          <KeyTable
            keys={paginatedKeys}
            currentPage={currentPage}
            totalPages={totalPages}
            showFullKey={showFullKey}
            onPageChange={setCurrentPage}
            onToggleShowFullKey={toggleShowFullKey}
            onCopyKey={copyToClipboard}
            onShowDetails={showKeyDetails}
            formatDateTime={formatDateTime}
            getKeyStatus={getKeyStatus}
          />
        )}
      </div>

      <KeyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedKey={selectedKey}
        redeemedUsers={redeemedUsers}
        showEmailInput={showEmailInput}
        email={email}
        redeemError={redeemError}
        renewError={renewError}
        isRedeeming={isRedeeming}
        isRenewing={isRenewing}
        onEmailChange={setEmail}
        onRedeemNewUser={handleRedeemNewUser}
        onRenewKey={handleRenewKey}
        onCopyKey={copyToClipboard}
        formatDateTime={formatDateTime}
        getKeyStatus={getKeyStatus}
      />
    </div>
  );
};
