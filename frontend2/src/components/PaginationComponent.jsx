import { Pagination } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PaginationComponent = ({
  categoryName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) => {
  const category = categoryName ? `category/${categoryName}/` : "";
  const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list/${category}${search}`;

  return (
    <Pagination>
      <NavLink to={`${url}${pageNum - 1}`}>
        <Pagination.Prev disabled={pageNum === 1} />
      </NavLink>
      {[...Array(paginationLinksNumber).keys()].map((x) => (
        <NavLink key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pageNum}>{x + 1}</Pagination.Item>
        </NavLink>
      ))}
      <NavLink
        disabled={pageNum === paginationLinksNumber}
        to={`${url}${pageNum + 1}`}
      >
        <Pagination.Next />
      </NavLink>
    </Pagination>
  );
};

export default PaginationComponent;
