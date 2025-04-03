import { X, Copy, RefreshCw, UserPlus } from "lucide-react";
import { Order, User, KeyStatus } from "./types";
import { StatusBadge } from "./statusBadge";

interface KeyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedKey: Order | null;
  redeemedUsers: User[];
  showEmailInput: boolean;
  email: string;
  redeemError: string;
  renewError: string;
  isRedeeming: boolean;
  isRenewing: boolean;
  onEmailChange: (email: string) => void;
  onRedeemNewUser: () => void;
  onRenewKey: (keyId: string) => void;
  onCopyKey: (key: string) => void;
  formatDateTime: (dateString: string) => string;
  getKeyStatus: (expiresAt: string | null) => KeyStatus;
}

export const KeyDetailsModal = ({
  isOpen,
  onClose,
  selectedKey,
  redeemedUsers,
  showEmailInput,
  email,
  redeemError,
  renewError,
  isRedeeming,
  isRenewing,
  onEmailChange,
  onRedeemNewUser,
  onRenewKey,
  onCopyKey,
  formatDateTime,
  getKeyStatus,
}: KeyDetailsModalProps) => {
  if (!isOpen || !selectedKey) return null;

  const status = getKeyStatus(selectedKey.expiresAt);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center border shadow-2xl">
      <div className="bg-white rounded shadow-xl max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="p-6 bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)] ">
          <h3 className="text-2xl font-semibold text-[var(--color-textcolor)] mb-6">
            Key Details
          </h3>
          <div className="space-y-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-[var(--color-textcolor)]">
                  Key
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-[var(--color-textsecondarycolor)] font-mono">
                    {selectedKey.key}
                  </p>
                  <button
                    onClick={() => onCopyKey(selectedKey.key)}
                    className="text-gray-500 hover:text-gray-700"
                    title="Copy key"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[var(--color-textcolor)]">
                  Key Type
                </h4>
                <p className="mt-1 text-[var(--color-textsecondarycolor)]">
                  {selectedKey.keyType}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-[var(--color-textcolor)]">
                  Purchase Date
                </h4>
                <p className="mt-1 text-[var(--color-textsecondarycolor)]">
                  {formatDateTime(selectedKey.createdAt)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[var(--color-textcolor)]">
                  Expiry Date
                </h4>
                <p className="mt-1 text-[var(--color-textsecondarycolor)]">
                  {formatDateTime(selectedKey.expiresAt as string)}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--color-textcolor)]">
                Status
              </h4>
              <div className="mt-1">
                <StatusBadge status={status} />
              </div>
            </div>

            {selectedKey.keyType === "Service" && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-800 mb-3">
                  Redeemed Users ({redeemedUsers.length}/5)
                </h4>
                <div className="bg-gray-50 rounded p-4">
                  {redeemedUsers.length > 0 ? (
                    <div className="space-y-3">
                      {redeemedUsers.map((user) => (
                        <div
                          key={user._id}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                        >
                          <span className="text-gray-700">{user?.name}</span>
                          <span className="text-gray-500 text-sm">
                            {user?.email}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-2">
                      No users have redeemed this key yet
                    </p>
                  )}
                </div>

                {showEmailInput && (
                  <div className="mt-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        placeholder="Enter user email"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    {redeemError && (
                      <p className="mt-2 text-sm text-red-600">{redeemError}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 space-y-3">
              {status.label === "Expired" && (
                <>
                  <button
                    onClick={() => onRenewKey(selectedKey._id)}
                    disabled={isRenewing}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw
                      size={18}
                      className={isRenewing ? "animate-spin" : ""}
                    />
                    {isRenewing ? "Renewing..." : "Renew Subscription"}
                  </button>
                  {renewError && (
                    <p className="text-sm text-red-600 text-center">
                      {renewError}
                    </p>
                  )}
                </>
              )}

              {selectedKey.keyType === "Service" &&
                redeemedUsers.length < 5 && (
                  <button
                    onClick={onRedeemNewUser}
                    disabled={isRedeeming}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserPlus
                      size={18}
                      className={isRedeeming ? "animate-spin" : ""}
                    />
                    {isRedeeming
                      ? "Adding..."
                      : showEmailInput
                      ? "Add User"
                      : "Redeem New User"}
                  </button>
                )}

              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
