import { cn } from "@/lib/utils";
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

export function DashboardContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: usersData, isSuccess, isLoading } = useFetch("user/all-users");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const usersPerPage = 8;

  useEffect(() => {
    if (isSuccess && Array.isArray(usersData?.data)) {
      setUsers(usersData.data);
      setError(null); // Clear any previous error
    } else if (!isLoading && !isSuccess) {
      setError("Failed to fetch user data");
    }
  }, [isSuccess, usersData]);

  if (isLoading) return <p className="text-center mt-4">Loading users...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <h1 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
        Dashboard Overview
      </h1>

      <div className="mb-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-lg bg-gray-500 p-6 text-white">
          <div className="rounded-lg bg-gray-500 p-6 text-white">
            <div className="text-5xl font-bold">{users.length}</div>{" "}
            {/* Dynamically display the number of users */}
            <p className="mt-2 text-sm">All User </p>
          </div>
        </div>
        <div className="rounded-lg bg-gray-200 p-6 text-black">
          <div className="text-5xl font-bold">02</div>
          <p className="mt-2 text-sm">Pending User List</p>
        </div>
        <div className="rounded-lg bg-gray-200 p-6 text-black">
          <div className="text-5xl font-bold">33</div>
          <p className="mt-2 text-sm">Completed User List</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-6 py-4 text-left text-gray-700">
                ID
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-gray-700">
                Name
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-gray-700">
                Email
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-gray-700">
                Role
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-gray-700">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow key={user._id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-gray-900 font-medium">
                  {index + 1 + offset}{" "}
                  {/* Static ID with incrementing number */}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-700">
                  {user.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-700">
                  {user.email}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-700">
                  {user.role}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full px-3 py-1 text-xs font-semibold",
                      {
                        "bg-red-100 text-red-800": user.status === "Pending", // Red for Pending
                        "bg-green-100 text-green-800": user.status === "Done", // Green for Done
                      }
                    )}
                  >
                    {user.status === "Pending" ? "Pending" : "Done"}{" "}
                    {/* Static Status */}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
          previousClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
          nextClassName="px-4 py-2 border rounded-md text-sm text-gray-600"
          activeClassName="bg-gray-500 text-white"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default DashboardContent;
