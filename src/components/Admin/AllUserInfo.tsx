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
  const [expandedUids, setExpandedUids] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [currentPage, setCurrentPage] = useState<number>(0);
  const usersPerPage = 11;

  const { data: usersData, isSuccess, isLoading } = useFetch("user/all-users");

  useEffect(() => {
    if (isSuccess && Array.isArray(usersData?.data)) {
      setUsers(usersData.data);
      setError(null);
    } else if (!isLoading && !isSuccess) {
      setError("Failed to fetch user data");
    }
  }, [isSuccess, usersData, isLoading]);

  if (isLoading) return <p className="text-center mt-4">Loading users...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  const handleToggleUid = (id: string) => {
    setExpandedUids((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * usersPerPage;
  const currentUsers = users.slice(offset, offset + usersPerPage);

  return (
    <div className="p-6 lg:p-8  sm:mt-10 sb:mt-0 min-h-screen -mt-10 text-[var(--color-textcolor)] ">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-5 xs:mt-40">
        All User Information
      </h1>
      <div className="rounded-lg shadow-lg overflow-hidden ">
        <Table>
          <TableHeader className="bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)]">
            <TableRow className="text-sm font-semibold tracking-wide">
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                ID
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                User ID
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Name
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Email
              </TableHead>
              <TableHead className="px-6 py-6 text-left text-[var(--color-textcolor)]">
                Role
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow
                key={user._id}
                className={`hover:bg-gray-200 hover:text-gray-700 ${
                  index % 2 === 0
                    ? " bg-[var(--color-oddcolor)]"
                    : "bg-[var(--color-evencolor)]"
                }`}
              >
                <TableCell className="px-6 py-5 font-medium">
                  {index + 1 + offset}
                </TableCell>
                <TableCell
                  className="px-2 sm:px-4 py-5 truncate cursor-pointer"
                  onClick={() => handleToggleUid(user._id)}
                >
                  {expandedUids[user._id]
                    ? user.uid
                    : `${user.uid.slice(0, 5)}...`}
                </TableCell>
                <TableCell className="px-6 py-5">{user.name}</TableCell>
                <TableCell className="px-6 py-5 ">{user.email}</TableCell>
                <TableCell
                  className={`px-6 py-5 ${
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
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)]"
          previousClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)]"
          nextClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)]"
          activeClassName="text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default AllUserInfo;
