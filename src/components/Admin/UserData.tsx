import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const appointments = [
  {
    id: "01",
    service: "101",
    consumer: "Sophia Bennett",
    email: "sophia.bennett@example.com",
    key: "ABR12X",
    status: "Pending",
  },
  {
    id: "02",
    service: "102",
    consumer: "Daniel Foster",
    email: "daniel.foster@example.com",
    key: "DFG34Y",
    status: "Waiting",
  },
  {
    id: "03",
    service: "103",
    consumer: "Michael Reynolds",
    email: "michael.reynolds@example.com",
    key: "MRE56Z",
    status: "Completed",
  },
  {
    id: "04",
    service: "104",
    consumer: "Emma Collins",
    email: "emma.collins@example.com",
    key: "ECX78W",
    status: "Waiting",
  },
  {
    id: "05",
    service: "105",
    consumer: "John Carter",
    email: "john.carter@example.com",
    key: "JCQ90V",
    status: "Completed",
  },
];

export function UserData() {
  return (
    <div className="p-6">
      <h1 className="text-3xl flex justify-center items-center mb-5">
        User Info
      </h1>

      <div className="rounded-lg border shadow-md overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-gray-200 text-gray-700">
            <TableRow className="text-sm font-semibold uppercase tracking-wide">
              <TableHead className="px-6 py-4 text-left">No</TableHead>
              <TableHead className="px-6 py-4 text-left">ID</TableHead>
              <TableHead className="px-6 py-4 text-left">User Name</TableHead>
              <TableHead className="px-6 py-4 text-left">Email</TableHead>
              <TableHead className="px-6 py-4 text-left">User Key</TableHead>
              <TableHead className="px-6 py-4 text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow
                key={appointment.id}
                className="border-b transition hover:bg-gray-50"
              >
                <TableCell className="px-6 py-4">{index + 1}</TableCell>
                <TableCell className="px-6 py-4">{appointment.id}</TableCell>
                <TableCell className="px-6 py-4">
                  {appointment.consumer}
                </TableCell>
                <TableCell className="px-6 py-4">{appointment.email}</TableCell>
                <TableCell className="px-6 py-4">{appointment.key}</TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-block rounded-full px-3 py-1 text-xs font-medium",
                      {
                        "bg-yellow-100 text-yellow-800":
                          appointment.status === "Pending",
                        "bg-blue-100 text-blue-800":
                          appointment.status === "Waiting",
                        "bg-green-100 text-green-800":
                          appointment.status === "Completed",
                      }
                    )}
                  >
                    {appointment.status}
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

export default UserData;
