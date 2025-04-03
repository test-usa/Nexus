import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Payment {
  _id: string;
  userId: string;
  customerId: string;
  subscriptionId: string;
  currentPeriodEnd: string;
  transactionId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  key: {
    keyName: string;
  };
  keyDetails: {
    amount: number;
    price: number;
  };
}

const UserPayment = () => {
  //Move all useState hooks to  top
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { data, isSuccess, isLoading } = useFetch(
    "payment/get-all-user-payment"
  );

  useEffect(() => {
    if (isSuccess && data?.data) {
      setPayments(data.data);
    }
  }, [isSuccess, data]);

  const paymentsPerPage = 9;
  const offset = currentPage * paymentsPerPage;
  const currentPayments = payments.slice(offset, offset + paymentsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading payments...</span>
      </div>
    );
  }

  if (data?.error) {
    return (
      <div className="text-red-500">Failed to load payments: {data.error}</div>
    );
  }

  return (
    <div className="pl-12 pr-12 pt-12 -sm:pr-5 ">
      <h1 className="text-2xl font-medium tracking-wide mb-5 mt-4 text-[var(--color-textcolor)]">
        User Payment
      </h1>
      <div className="overflow-x-auto text-[var(--color-textsecondarycolor)]">
        {/* Added wrapper for scroll */}
        <Table className="rounded-sm shadow-lg overflow-hidden">
          <TableHeader className="bg-[var(--color-dashboardsecondary)] ">
            <TableRow>
              <TableHead className="px-6 sm:px-6 py-6 w-[100px] text-lg text-[var(--color-textcolor)]">
                Key Name
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Tnx ID
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Key Amount
              </TableHead>
              <TableHead className="text-lg text-[var(--color-textcolor)]">
                Total Price
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Update Date
              </TableHead>
              <TableHead className="text-right text-lg text-[var(--color-textcolor)]">
                Purchased Act
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPayments.length ? (
              currentPayments.map((payment, index) => (
                <TableRow
                  key={payment._id}
                  className={`hover:bg-[var(--color-bghovercolor)] hover:text-[var(--color-hovertext)] ${
                    index % 2 === 0
                      ? "bg-[var(--color-oddcolor)]"
                      : "bg-[var(--color-evencolor)]"
                  }`}
                >
                  <TableCell className="font-medium px-6 sm:px-6 py-6 text-[16px] ">
                    {payment.key.keyName}
                  </TableCell>

                  <TableCell
                    className="text-[16px]"
                    onClick={() =>
                      toggleExpand(payment.subscriptionId + "-userId")
                    }
                  >
                    {expandedRows[payment.subscriptionId + "-userId"]
                      ? payment.transactionId
                      : `${payment.transactionId.slice(0, 5)}...`}
                  </TableCell>

                  <TableCell className="text-left text-[16px]">
                    {payment.keyDetails.amount}
                  </TableCell>
                  <TableCell className="text-left text-[16px]">
                    ${payment.keyDetails.price}
                  </TableCell>
                  <TableCell className="text-right text-[16px]">
                    {new Date(payment.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-[16px]">
                    {new Date(payment.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-3 px-6 text-center text-sm"
                >
                  No payment records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className="mt-3 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(payments.length / paymentsPerPage)}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
          previousClassName=" text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          nextClassName="text-[16px]  px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
          activeClassName=" text-[16px] text-white bg-[var(--color-dashboardsecondary)]"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default UserPayment;

/* import { Loader } from "lucide-react";
import useFetch from "@/hooks/shared/useFetch";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface Payment {
  _id: string;
  userId: string;
  customerId: string;
  subscriptionId: string;
  transactionId: string;
  keyDetails: {
    amount: number;
    price: number;
  };
  currentPeriodEnd: string;
  status: string;
  createdAt: string;
  key: {
    keyName: string;
  };
}

const UserPayment: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { data, isSuccess, isLoading } = useFetch(
    "payment/get-all-user-payment"
  );
  console.log(data);


  const [currentPage, setCurrentPage] = useState(0);
  const paymentsPerPage = 10;
  const offset = currentPage * paymentsPerPage;
  const currentPayments = payments.slice(offset, offset + paymentsPerPage);


  useEffect(() => {
    if (isSuccess && data?.data) {
      setPayments(data.data);
    }
  }, [isSuccess, data]);


  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin w-6 h-6" />
        <span className="ml-2">Loading payments...</span>
      </div>
    );
  }


  if (data?.error) {
    return (
      <div className="text-red-500">Failed to load payments: {data.error}</div>
    );
  }

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-medium tracking-wide text-gray-700 mb-6">
        User Payment
      </h2>

      <div className="overflow-x-auto shadow-lg border border-gray-300 bg-white rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Key Name
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Tnx ID
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Key Amount
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Total Price
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase hidden sm:table-cell">
                Period End
              </th>
              <th className="py-4 px-6 text-left font-medium tracking-wide uppercase">
                Purchased At
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {currentPayments.length ? (
              currentPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t hover:bg-gray-50 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-sm">{payment.key.keyName}</td>

                  <td className="py-3 px-6 text-sm">
                    {payment.subscriptionId
                      ? payment.subscriptionId
                      : payment.transactionId}
                  </td>
                  <td className="py-3 px-6 text-sm text-center">
                    {payment.keyDetails.amount}
                  </td>
                  <td className="py-3 px-6 text-sm text-center">
                    ${payment.keyDetails.price}
                  </td>
                  <td className="py-3 px-6 text-sm hidden sm:table-cell">
                    {new Date(payment.currentPeriodEnd).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-sm">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-3 px-6 text-center text-sm">
                  No payment records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div className="mt-6 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(payments.length / paymentsPerPage)}
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
};

export default UserPayment; */
