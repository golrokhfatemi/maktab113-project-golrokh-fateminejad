import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";


const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    const getPageNumber = () => {
      const pages = [];
      const maxPageToshow = 5;
      const halfMaxPageToShow = Math.floor(maxPageToshow / 2);
  
      if (totalPages <= maxPageToshow) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        let startPage = Math.max(currentPage - halfMaxPageToShow, 1);
        let endPage = Math.min(currentPage + halfMaxPageToShow, totalPages);
        if (startPage === 1) {
          endPage = maxPageToshow;
        } else if (endPage === totalPages) {
          startPage = totalPages - maxPageToshow + 1;
        }
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        if (startPage > 1) {
          if (startPage - 1 >= 2) {
            pages.unshift("...");
          }
          pages.unshift(1);
        }
  
        if (endPage < totalPages) {
          if (totalPages - endPage !== 1) pages.push("...");
          pages.push(totalPages);
        }
      }
      return pages;
    };
  
    return (
      <div className="flex gap-x-4 mt-4 justify-center items-center">
        <Button
          className="px-3 py-1 rounded-lg bg-slate-300"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          rightIcon={<ArrowBackIcon />}
          colorScheme='teal'
          variant='solid'
        >
        </Button>
        {getPageNumber().map((page) => (
          <Button
            colorScheme='teal'
            variant='solid'
            className={`px-3 py-1 rounded-lg bg-slate-300 ${
              currentPage === page ? "bg-slate-500" : ""
            }`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled ={typeof page !== "number"}
            key={page}
          >
            {page}
          </Button>
        ))}
        <Button
          className="px-3 py-1 rounded-lg bg-slate-300"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          rightIcon={<ArrowForwardIcon />}
          colorScheme='teal'
          variant='solid'
        >
          
        </Button>
      </div>
    );
  };
  
  export default Pagination;
  