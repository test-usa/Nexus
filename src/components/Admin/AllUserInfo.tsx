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
    <div className="p-6 -mt-20">
      <h1 className="text-2xl font-semibold tracking-wide text-gray-800 mb-6">
        User Information
      </h1>

      <div className="rounded-lg border shadow-md overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-gray-200 text-gray-800">
            <TableRow className="text-sm font-semibold uppercase tracking-wide">
              <TableHead className="px-6 py-4 text-left">No</TableHead>
              <TableHead className="px-6 py-4 text-left">U_ID</TableHead>
              <TableHead className="px-6 py-4 text-left">Name</TableHead>
              <TableHead className="px-6 py-4 text-left">Email</TableHead>
              <TableHead className="px-6 py-4 text-left">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow
                key={user._id}
                className="border-b transition hover:bg-gray-50"
              >
                <TableCell className="px-6 py-4">{index + 1}</TableCell>
                <TableCell className="px-6 py-4">{user.uid}</TableCell>
                <TableCell className="px-6 py-4">{user.name}</TableCell>
                <TableCell className="px-6 py-4">{user.email}</TableCell>
                <TableCell className="px-6 py-4">{user.role}</TableCell>
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

export default AllUserInfo;
