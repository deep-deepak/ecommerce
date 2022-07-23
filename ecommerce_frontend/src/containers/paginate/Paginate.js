import React from "react";
import { Container, Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/***
 * paginate function ,to go through different pages at homepage
 */
function Paginate({ pages, page, keyword = "", isAuthenticated = false }) {
  // const pages = 4;
  if (keyword) {
    keyword = keyword.split("/page?keyword=")[1].split("&")[0];
  }

  return (
    // pages === 1 && (

    <div>
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAuthenticated
                ? `/page?keyword=${keyword}&page=${x + 1}`
                : `/get_products/?keyword=${keyword}&page=${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    </div>

    // )
  );
}

export default Paginate;

// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import ReactPaginate from "react-paginate";

// // Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

// function PaginatedItems({ itemsPerPage }) {
//   // We start with an empty list of items.
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     setCurrentItems(items.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(items.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <center>
//         <nav aria-label="Page navigation ">
//           <ul class="pagination">
//             <li class="page-item">
//               <a class="page-link" href="/page ">
//                 Previous
//               </a>
//             </li>
//             <li class="page-item">
//               <a class="page-link" href="#">
//                 1
//               </a>
//             </li>
//             <li class="page-item">
//               <a class="page-link" href="#">
//                 2
//               </a>
//             </li>
//             <li class="page-item">
//               <a class="page-link" href="#">
//                 3
//               </a>
//             </li>
//             <li class="page-item">
//               <a class="page-link" href="#">
//                 Next
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </center>
//       {/* <ReactPaginate
//         breakLabel="..."
//         nextLabel="Next>"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< Previous"
//         renderOnZeroPageCount={null}
//       /> */}
//     </>
//   );
// }

// // Add a <div id="container"> to your HTML to see the componend rendered.
// export default PaginatedItems;
