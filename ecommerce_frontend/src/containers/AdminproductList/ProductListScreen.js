import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";

import {
  listProductsAdmin,
  createProduct,
  deleteProduct,
} from "../../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../config/ProductConstants";
import queryString from "querystring";
import AdminProductPaginate from "./productspaginat";

/***
 * list products at admin side
 */
function ProductListScreen({ history, location }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productListReducerAdmin);
  const { loading, error, products, pages } = productList;

  // const productListadmin = useSelector((state) => state.productListReducerAdmin);
  // const { loading, error, products, pages, page } = productListadmin;

  const productDelete = useSelector((state) => state.userDeleteReducer);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreateReducer);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.authReducer);
  const { userDetails } = userLogin;

  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const { page } = queryString.parse(location.search?.replace("?", ""));
  const columns = [
    { title: "ID", field: "_id" },
    { title: "Name", field: "name" },
    { title: "Brand", field: "brand" },
    { title: "Price", field: "price" },
    { title: "Description", field: "description" },
    { title: "Category", field: "category" },
  ];

  // const [sortBy, setSortBy] = useState("_id");
  // const [sortOrder, setSortOrder] = useState("asc");
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  let keyword = history.location.search;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userDetails?.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProductsAdmin({ page }));
    }
    // console.log("..sort", { sortBy, sortOrder, rowsPerPage });
  }, [
    dispatch,
    history,
    userDetails,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
    sortBy,
    sortOrder,
    page,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };
  const updateHandler = (id) => {
    history.push(`/admin/product/${id}/edit`);
  };
  const handleSort = (field, order = "asc") => {
    setSortBy(field);
    setSortOrder(order);
  };

  return (
    <div className="m-5">
      <i className="fa-solid fa-basket-shopping">Products</i>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          id="selectedColumn"
          className="table table-bordered "
          cellspacing="0"
          width="100%"
        >
          <thead className="table-dark">
            <tr>
              {columns.map(({ title, field }) => {
                return (
                  <th>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ marginRight: 5 }}>{title}</div>
                      <div onClick={() => handleSort(field, "asc")}>
                        <i
                          class="fa-solid fa-arrow-up"
                          style={{
                            cursor: "pointer",
                            color:
                              sortBy === field && sortOrder === "asc"
                                ? "white"
                                : "black",
                          }}
                        ></i>
                      </div>
                      <div onClick={() => handleSort(field, "desc")}>
                        <i
                          class="fa-solid fa-arrow-down"
                          style={{
                            cursor: "pointer",
                            color:
                              sortBy === field && sortOrder === "desc"
                                ? "white"
                                : "black",
                          }}
                        ></i>
                      </div>
                    </div>
                  </th>
                );
              })}

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>

                <td>
                  <LinkContainer
                    to={`/seller/edit-productdetails/${product._id}`}
                  >
                    <Button variant="" className="btn-sm">
                      <i className="fa-solid fa-pen"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant=""
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div>
        <AdminProductPaginate pages={pages} page={page} />
      </div>
    </div>
  );
}
export default ProductListScreen;
