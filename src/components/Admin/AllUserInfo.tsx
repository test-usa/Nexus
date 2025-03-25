import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReactPaginate from "react-paginate";
import useFetch from "@/hooks/shared/useFetch";

interface User {
  _id: string;
  uid: string;
  name: string;
  email: string;
  role: string;
}

export function AllUserInfo() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(0);
  const usersPerPage = 12; // Number of users per page

  const { data: usersData, isSuccess, isLoading } = useFetch("user/all-users");

  useEffect(() => {
    if (isSuccess && Array.isArray(usersData?.data)) {
      setUsers(usersData.data);
      setError(null); // Clear any previous error
    } else if (!isLoading && !isSuccess) {
      setError("Failed to fetch user data");
    }
  }, [isSuccess, usersData, isLoading]);

  if (isLoading) return <p className="text-center mt-4">Loading users...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  // Handle page change
  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Slice users array to show users for the current page
  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <div className="p-4 sm:p-6 -mt-10">
      <h1 className="text-lg sm:text-2xl font-semibold tracking-wide text-gray-800 mb-3 sm:mb-6">
        User Information
      </h1>

      {/* Responsive Table Wrapper */}
      <div className="rounded-lg border shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[500px] sm:min-w-full">
            <TableHeader className="bg-gray-200 text-gray-800">
              <TableRow className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
                <TableHead className="px-2 sm:px-4 py-2 text-left">
                  No
                </TableHead>
                <TableHead className="px-2 sm:px-4 py-2 text-left">
                  User ID
                </TableHead>
                <TableHead className="px-2 sm:px-4 py-2 text-left">
                  Name
                </TableHead>
                <TableHead className="px-2 sm:px-4 py-2 text-left">
                  Email
                </TableHead>
                <TableHead className="px-2 sm:px-4 py-2 text-left">
                  Role
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user, index) => (
                <TableRow
                  key={user._id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <TableCell className="px-2 sm:px-4 py-2">
                    {index + 1 + offset}
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-2 truncate">
                    {user.uid.length > 5
                      ? `${user.uid.slice(0, 5)}...`
                      : user.uid}
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-2 truncate">
                    {user.name}
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-2 truncate">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-2 truncate">
                    {user.role}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2">
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex flex-wrap items-center gap-1 sm:gap-2"
          pageClassName="px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm text-gray-600 transition hover:bg-gray-300"
          previousClassName="px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm text-gray-600 transition hover:bg-gray-300"
          nextClassName="px-2 py-1 sm:px-3 sm:py-2 border rounded-md text-xs sm:text-sm text-gray-600 transition hover:bg-gray-300"
          activeClassName="bg-gray-500 text-white"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default AllUserInfo;
