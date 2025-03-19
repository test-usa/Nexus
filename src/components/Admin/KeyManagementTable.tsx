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
import { Loader2 } from "lucide-react"; // For a loading spinner

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
    <div className="max-w-6xl mx-auto p-4">
      <Card className="mt-6 shadow-xl rounded-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            User Keys
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-between items-center">
            <Input
              placeholder="Search keys..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md bg-gray-50 border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 rounded-lg p-3"
            />
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin text-gray-600" size={24} />
              <span className="ml-2 text-gray-600">Loading keys...</span>
            </div>
          ) : (
            <Table className="min-w-full table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2 text-left text-gray-600">
                    ID
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-gray-600">
                    Key
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-gray-600">
                    Type
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-gray-600">
                    Expiry
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left text-gray-600">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys
                  .filter((key) =>
                    key.key.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((key) => (
                    <TableRow
                      key={key.id}
                      className="hover:bg-gray-100 transition-all ease-in-out duration-200"
                    >
                      <TableCell className="px-4 py-2">{key.id}</TableCell>
                      <TableCell className="px-4 py-2">{key.key}</TableCell>
                      <TableCell className="px-4 py-2">{key.type}</TableCell>
                      <TableCell className="px-4 py-2">{key.expiry}</TableCell>
                      <TableCell className="px-4 py-2">
                        <Badge
                          variant={
                            key.status === "Active" ? "default" : "destructive"
                          }
                          className="capitalize"
                        >
                          {key.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyManagement;

/* import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
        const response = await fetch("/api/get-keys");
        const data = await response.json();
        setKeys(data.keys);
      } catch (error) {
        console.error("Error fetching keys:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeys();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate New Key</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Enter key type (day/week/month)" />
            <Button>Generate Key</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>User Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search keys..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          {loading ? (
            <p>Loading keys...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys
                  .filter((key) => key.key.includes(search))
                  .map((key) => (
                    <TableRow key={key.id}>
                      <TableCell>{key.id}</TableCell>
                      <TableCell>{key.key}</TableCell>
                      <TableCell>{key.type}</TableCell>
                      <TableCell>{key.expiry}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            key.status === "Active" ? "default" : "destructive"
                          }
                        >
                          {key.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyManagement;
 */
