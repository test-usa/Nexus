import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: "101",
    name: "Alice Johnson",
    role: "Admin",
    status: "Active",
  },
  {
    id: "102",
    name: "Bob Smith",
    role: "User",
    status: "Pending",
  },
  {
    id: "103",
    name: "Charlie Brown",
    role: "Moderator",
    status: "Suspended",
  },
  {
    id: "104",
    name: "David White",
    role: "User",
    status: "Active",
  },
  {
    id: "105",
    name: "Eva Green",
    role: "Admin",
    status: "Pending",
  },
];

export function DashboardContent() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="mb-8 text-2xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>

      <div className="mb-8 grid grid-cols-3 gap-6">
        <div className="rounded-lg bg-gray-500 p-6 text-white">
          <div className="text-5xl font-bold">04</div>
          <p className="mt-2 text-sm">User List</p>
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
                Role
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-gray-700">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 text-gray-900 font-medium">
                  {user.id}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-700">
                  {user.name}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-700">
                  {user.role}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full px-3 py-1 text-xs font-semibold",
                      {
                        "bg-green-100 text-green-800": user.status === "Active",
                        "bg-yellow-100 text-yellow-800":
                          user.status === "Pending",
                        "bg-red-100 text-red-800": user.status === "Suspended",
                      }
                    )}
                  >
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DashboardContent;
