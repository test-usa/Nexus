import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useFetch from "@/hooks/shared/useFetch";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Payment {
  _id: string;
  amount: number;
  status: string;
  date: string;
}

const DashboardContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]); // For storing payment data
  const [error, setError] = useState<string | null>(null);

  // Fetch users data
  const {
    data: usersData,
    isSuccess: isUsersSuccess,
    isLoading: isUsersLoading,
  } = useFetch("user/all-users");

  // Fetch payment data
  const {
    data: paymentdata,
    isSuccess: isPaymentsSuccess,
    isLoading: isPaymentsLoading,
  } = useFetch("payment/get-all-payment");

  // Fetch active user data
  const { data: activedata, isLoading: isActivesLoading } =
    useFetch("/user-key/all-key");

  const [currentPage, setCurrentPage] = useState<number>(0);
  const usersPerPage = 8;

  // Handle users data
  useEffect(() => {
    if (isUsersSuccess && Array.isArray(usersData?.data)) {
      setUsers(usersData.data);
      setError(null); // Clear any previous error
    } else if (!isUsersLoading && !isUsersSuccess) {
      setError("Failed to fetch user data");
    }
  }, [isUsersSuccess, usersData]);

  // Handle payment data
  useEffect(() => {
    if (isPaymentsSuccess && Array.isArray(paymentdata?.data)) {
      setPayments(paymentdata.data);
      setError(null); // Clear any previous error
    } else if (!isPaymentsLoading && !isPaymentsSuccess) {
      setError("Failed to fetch payment data");
    }
  }, [isPaymentsSuccess, paymentdata]);

  // Handle loading state
  if (isUsersLoading || isPaymentsLoading || isActivesLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;
  }

  // Pagination for users
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <div className="pl-12 pr-12 pt-12 -sm:pr-5 ">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-5 text-[var(--color-textcolor)]">
        Dashboard Overview
      </h1>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        <div className="mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users Count */}
          <div className="rounded-lg bg-[var(--color-dashboardsecondary)] p-6 hover:bg-gray-500 hover:text-white transition-colors">
            <div className="text-5xl font-bold">{users.length}</div>
            <p className="mt-2 text-sm">All User</p>
          </div>

          {/* Payments Count */}
          <div className="rounded-lg bg-[var(--color-dashboardsecondary)] p-6 hover:bg-gray-500 hover:text-white transition-colors">
            <div className="text-5xl font-bold">{payments.length}</div>
            <p className="mt-2 text-sm">Payment List</p>
          </div>

          {/* Completed User List */}
          <div className="rounded-lg bg-[var(--color-dashboardsecondary)] p-6 hover:bg-gray-500 hover:text-white transition-colors">
            <div className="text-5xl font-bold">{activedata?.length || 10}</div>
            <p className="mt-2 text-sm">Active User List</p>
          </div>
        </div>
        {/* Added wrapper for scroll */}
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <TableHeader className="bg-[var(--color-dashboardsecondary)] ">
            <TableRow>
              <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-[var(--color-textsecondarycolor)]">
                ID
              </TableHead>

              <TableHead className="text-[var(--color-textsecondarycolor)]">
                Name
              </TableHead>
              <TableHead className=" text-[var(--color-textsecondarycolor)]">
                Email
              </TableHead>

              <TableHead className="text-right text-[var(--color-textsecondarycolor)]">
                Role
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow
                key={user._id}
                className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${
                  index % 2 === 0
                    ? "bg-[var(--color-oddcolor)]"
                    : "bg-[var(--color-evencolor)]"
                }`}
              >
                <TableCell className="font-medium px-6 sm:px-6 py-6 ">
                  {index + 1 + offset}
                </TableCell>

                <TableCell>{user.name}</TableCell>
                <TableCell className="">{user.name}</TableCell>

                <TableCell
                  className={`text-right ${
                    user.role === "ADMIN"
                      ? "text-cyan-300"
                      : user.role === "USER"
                      ? "text-[var(--color-successthree)]"
                      : ""
                  }`}
                >
                  {user.role}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      {/* Pagination Section */}
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
          previousClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          nextClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          activeClassName="text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};
export default DashboardContent;
