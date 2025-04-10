import ReactPaginate from "react-paginate";

interface PaginationProps {
  keysLength: number;
  keysPerPage: number;
  handlePageChange: ({ selected }: { selected: number }) => void;
}

const Pagination = ({ keysLength, keysPerPage, handlePageChange }: PaginationProps) => {
  return (
    <div className="mt-3 flex justify-center">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(keysLength / keysPerPage)}
        onPageChange={handlePageChange}
        containerClassName="flex items-center space-x-2"
        pageClassName="px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textsecondarycolor)]"
        previousClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] rounded-md text-sm bg-[var(--color-dashboardsecondary)] text-[var(--color-textcolor)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
        nextClassName="text-[16px] px-4 py-2 border border-[var(--color-dashboardsecondary)] rounded-md text-sm text-[var(--color-textcolor)] bg-[var(--color-dashboardsecondary)] hover:text-[var(--color-hovertext)] hover:bg-[var(--color-bghovercolor)]"
        activeClassName="text-[16px] text-white bg-[var(--color-dashboardsecondary)]"
        disabledClassName="text-gray-400 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;