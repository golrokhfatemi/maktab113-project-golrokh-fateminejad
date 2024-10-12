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
        isDisabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        leftIcon={<ArrowBackIcon />}
        _disabled={{ bg: "gray.400", cursor: "not-allowed" }} 
        _hover={{ bg: currentPage === 1 ? "gray.400" : "teal.600" }}
        colorScheme="teal"
      />

      
      {getPageNumber().map((page) => (
        <Button
          key={page}
          onClick={() => typeof page === "number" && onPageChange(page)}
          isDisabled={typeof page !== "number"}
          variant="solid"
          bg={currentPage === page ? "teal.600" : "teal.400"}
          color="white"
          _hover={{ bg: "teal.600" }}
        >
          {page}
        </Button>
      ))}

      
      <Button
        isDisabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        rightIcon={<ArrowForwardIcon />}
        _disabled={{ bg: "gray.400", cursor: "not-allowed" }} 
        _hover={{ bg: currentPage === totalPages ? "gray.400" : "teal.600" }}
        colorScheme="teal"
      />
    </div>
    );
  };
  
  export default Pagination;
  