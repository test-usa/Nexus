import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface KeyData {
  id: string;
  key: string;
  type: string;
  expiry: string;
  status: string;
}

const KeyManagement = () => {
  const [keys, setKeys] = useState<KeyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        // Simulating API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data for testing
        const mockData: KeyData[] = [
          {
            id: "1",
            key: "ABC123",
            type: "day",
            expiry: "2025-01-01",
            status: "Active",
          },
          {
            id: "2",
            key: "XYZ456",
            type: "week",
            expiry: "2025-02-15",
            status: "Expired",
          },
          {
            id: "3",
            key: "LMN789",
            type: "month",
            expiry: "2025-03-10",
            status: "Active",
          },
          {
            id: "4",
            key: "QWE987",
            type: "day",
            expiry: "2025-01-05",
            status: "Expired",
          },
          {
            id: "5",
            key: "RTY654",
            type: "week",
            expiry: "2025-02-20",
            status: "Active",
          },
        ];

        setKeys(mockData);
      } catch (error) {
        console.error("Error fetching keys:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeys();
  }, []);

  return (
    <div className="p-6 lg:p-8  min-h-screen">
      <Card className="mt-8 shadow-lg rounded-xl border border-gray-300 bg-white">
        <CardHeader className="border-b border-gray-200 p-5">
          <CardTitle className="text-2xl font-medium tracking-wide  text-gray-700 mb-6">
            User Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <Input
              placeholder="Search keys..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {loading ? (
            <div className="flex flex-col justify-center items-center py-10">
              <Loader2 className="animate-spin text-gray-500" size={28} />
              <span className="mt-2 text-gray-600 text-sm">
                Fetching keys...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full border border-gray-200 rounded-lg">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                      ID
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                      Key
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                      Type
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                      Expiry
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-gray-700 font-medium uppercase">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {keys
                    .filter((key) =>
                      key.key.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((key) => (
                      <TableRow
                        key={key.id}
                        className="hover:bg-gray-50 transition-all ease-in-out duration-200"
                      >
                        <TableCell className="px-6 py-3 text-gray-900">
                          {key.id}
                        </TableCell>
                        <TableCell className="px-6 py-3 text-gray-800">
                          {key.key}
                        </TableCell>
                        <TableCell className="px-6 py-3 text-gray-700">
                          {key.type}
                        </TableCell>
                        <TableCell className="px-6 py-3 text-gray-700">
                          {key.expiry}
                        </TableCell>
                        <TableCell className="px-6 py-3">
                          <Badge
                            variant={
                              key.status === "Active"
                                ? "default"
                                : "destructive"
                            }
                            className="capitalize px-3 py-1 text-sm font-medium"
                          >
                            {key.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyManagement;
