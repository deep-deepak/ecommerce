import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { constants } from "../../config";
import { KEYS } from "../../config/constants";
import { addToCart } from "../../redux/actions/cartAction";
import { listProducts } from "../../redux/actions/productActions";
import { Container } from "react-bootstrap";
// import Paginate from "../../containers/paginate/Paginate";

/**
Product card page can be seen by both customer and seller,
if logged in as seller edit/delete buttons will be shown 
but if logged in as a customer ad  to cart button will be shown only.
here we have done styling(JSX) of our product card
**/

export class ProductCard extends Component {
  // function to addproducts in cart.
  addToCartHandler = (id) => {
    this.props.history.push(`/cart/${id}?qty=1`);
  };
  // (to fetch data), search products
  componentDidMount() {
    const { keyword } = queryString.parse(this.props.location.search);
  }

  render() {
    const { item } = this.props;
    const {
      _id,
      index,
      image,
      name,
      brand,
      category,
      description,
      price,
      stock,
    } = item;

    // The authReducer normally looks at the authAction type field to decide what happens

    const { userDetails } = this.props.authReducer;
    const myStyle = {
      color: "dark",
      margin: "2%",
    };
    return (
      <>
        <div className="row special-list " key={index} className="col-md-3 ">
          {/* <div className="row"> */}
          <div className="products-single fix">
            <div className="box-img-hover">
              {userDetails?.role !== KEYS.seller && (
                <div className="type-lb">
                  <p className="sale">Sale</p>
                </div>
              )}
              <img
                className="card-img bg-image hover-zoom "
                src={`${constants.API_URL}${image}`}
                height="320px rounded"
                alt=""
              />

              <div className="mask-icon">
                {userDetails?.role !== KEYS.seller && (
                  <ul>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="View"
                      >
                        <i className="fas fa-eye"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Compare"
                      >
                        <i className="fas fa-sync-alt"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Add to Wishlist"
                      >
                        <i className="far fa-heart"></i>
                      </a>
                    </li>
                  </ul>
                )}
                {/* this is to show edit and delete button's to seller if seller is
              logged in
                */}
                {userDetails?.role === KEYS.seller ? (
                  <>
                    <div className="row">
                      {/* <div className="col-md-12"> */}
                      <Link
                        className="cart"
                        to={`/seller/edit-productdetails/${_id}`}
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col-md-13">
                        <Link
                          className="cart"
                          onClick={() => {
                            this.props.deleteProduct(_id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Link>
                      </div>
                    </div>
                    {/* </div> */}
                  </>
                ) : (
                  /**
       if customer is logged in ,, can only add products to cart
     **/
                  <Link
                    className="cart"
                    onClick={() => this.addToCartHandler(_id)}
                    disabled={item.stock === 0}
                  >
                    Add to Cart
                  </Link>
                )}
              </div>
              {/* )} */}
            </div>
            <div className="why-text">
              <span style={myStyle}>Name :</span>
              {/* // className="card card border-dark mb-10 m-1" */}

              <strong>{name}</strong>
              <br />
              <span style={myStyle}>Description : </span>

              <strong>{description}</strong>
              <br />
              <span style={myStyle}>Category : </span>
              <strong>{category}</strong>
              <br />
              <span style={myStyle}>Brand : </span>
              <strong>{brand}</strong>
              <br />
              <span style={myStyle}>Price: </span>
              <strong>{price}</strong>
              <br />
              <span style={myStyle}>Stock : </span>
              <strong>{stock}</strong>
            </div>
          </div>
        </div>
        {/* <Paginate /> */}
        {/* </div> */}
      </>
    );
  }
}

/**
The authReducer normally looks at the authAction type field to decide what happens,
in class based function we can call reducers by connect(mapStateToProps)
**/

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  listProductsReducer: state.listProductsReducer,
});
export default withRouter(
  connect(mapStateToProps, { addToCart, listProducts })(ProductCard)
);

// import React, { Component } from "react";
// import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { useSelector } from "react-redux";
// import { constants } from "../../config";
// import { KEYS } from "../../config/constants";

// import { addToCart } from "../../redux/actions/cartAction";
// import Paginate from "../../containers/paginate/Paginate";
// import { productDeleteReducer } from "../../redux/reducers/productReducers";
// // import { withRouter } from "../../utils";

// function ProductCard({ props, history }) {
//   const addToCartHandler = (id) => {
//     history.push(`/cart/${id}?qty=1`);
//   };

//   const { item } = props();
//   const {
//     _id,
//     index,
//     image,
//     name,
//     brand,
//     category,
//     description,
//     price,
//     stock,
//   } = item;

//   // const productList = useSelector(state => state.productList)
//   // const { page, pages } = productList

//   const userDetails = useSelector((state) => state.authReducer);

//   const myStyle = {
//     color: "red",
//     margin: "2%",
//   };

//   return (
//     <div key={index} className="col-md-3">
//       <div className="card m-3" style={{ width: "90%" }}>
//         <h2 style={{ textAlign: "center" }} className="card">
//           {name}
//         </h2>
//         <img
//           className="card-img"
//           src={`${constants.API_URL}${image}`}
//           height="320px"
//           alt="nice"
//         />
//         <div>
//           <p>
//             <span style={myStyle}>Brand : </span>
//             {brand}
//           </p>
//           <p>
//             <span style={myStyle}>Category : </span>
//             {category}
//           </p>
//           <p>
//             <span style={myStyle}>Description : </span>
//             {description}
//           </p>
//           <p>
//             <span style={myStyle}>Price : </span>
//             {price}
//           </p>
//           <p>
//             <span style={myStyle}>Stock : </span>
//             {stock}
//           </p>
//         </div>

//         {userDetails?.role === KEYS.seller ? (
//           <>
//             <Link
//               to={`/seller/edit-productdetails/${_id}`}
//               className="btn btn-success m-1"
//             >
//               Edit
//             </Link>

//             <button
//               onClick={productDeleteReducer(_id)}
//               className="btn btn-danger m-1"
//             >
//               Delete
//             </button>
//           </>
//         ) : (
//           <button
//             className="btn btn-dark m-1"
//             onClick={addToCartHandler(_id)}
//             disabled={item.stock === 0}
//           >
//             Add to Cart
//           </button>
//         )}

//         {/* <Paginate page={page} pages={pages} keyword={keyword} /> */}
//       </div>

//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   authReducer: state.authReducer,
// });

// export default withRouter(connect(mapStateToProps, { addToCart })(ProductCard));
