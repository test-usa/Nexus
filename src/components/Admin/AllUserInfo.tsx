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
const AllUserInfo = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedUids, setExpandedUids] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const usersPerPage = 9;

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
    <div className="pl-12 pr-12 pt-12 -sm:pr-5 ">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        All User Information
      </h1>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        {" "}
        {/* Added wrapper for scroll */}
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <TableHeader className="bg-[var(--color-dashboardsecondary)] ">
            <TableRow>
              <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
                Id
              </TableHead>

              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Name
              </TableHead>
              <TableHead className=" text-lg text-[var(--color-textcolor)]">
                Email
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                User ID
              </TableHead>
              <TableHead className="text-right pr-10 text-lg text-[var(--color-textcolor)]">
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
                <TableCell className="font-medium px-6 sm:px-6 py-6 text-[16px]">
                  {index + 1 + offset}
                </TableCell>

                <TableCell className="text-[16px]">{user.name}</TableCell>
                <TableCell className="text-[16px]">{user.email}</TableCell>
                <TableCell
                  className="text-[16px]"
                  onClick={() => handleToggleUid(user._id)}
                >
                  {expandedUids[user._id]
                    ? user.uid
                    : `${user.uid.slice(0, 8)}...`}
                </TableCell>
                <TableCell
                  className={`text-right pr-10 text-[16px] ${
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
      <div className="mt-2 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
          previousClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          nextClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          activeClassName="text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default AllUserInfo;
