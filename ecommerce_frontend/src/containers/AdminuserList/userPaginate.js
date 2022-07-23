import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function AdminUserListPaginate({ pages, page, isAuthenticated = true }) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAuthenticated
                ? `/&page=${x + 1}`
                : `/admin/userlist?page=${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page} className="text-dark">
              {x + 1}{" "}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}
export default AdminUserListPaginate;