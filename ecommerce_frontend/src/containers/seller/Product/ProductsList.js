import React, { Component } from "react";
import axios from "axios";
import ProductCard from "../../../components/ProductCard";
import { connect } from "react-redux";
import { KEYS } from "../../../config/constants";
import { listProducts } from "../../../redux/actions/productActions";
import queryString from "querystring";
import { withRouter } from "react-router-dom";
import Paginate from "../../paginate/Paginate";
import Category from "../../../components/category/Category";

/***
 * showing our product card here
 */
export class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],

      page: "",
      pages: "",
      keyword: "",
      category: "",
      min_price: "",
      max_price: "",
      brand: "",
      range: "",
    };
  }
  // fetch data
  componentDidMount() {
    this.getProducts();
  }
  // is invoked immediately after updating occurs. This method is not called for the initial render.
  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getProducts();
    }
  }
  /**
   * Get product
   */
  getProducts = async () => {
    const { keyword, page, category, min_price, max_price, brand, range } =
      queryString.parse(this.props.location.search?.replace("?", ""));
    this.setState({
      page: page,
      pages: 4,
      keyword: keyword,
    });

    // console.log("keyword...", pages);
    // console.log("..id", this.props.userDetails?.id);
    // const { data } = await axios.get("http://127.0.0.1:8000/get_product",
    this.props.listProducts(
      this.props.userDetails?.role === KEYS.seller
        ? this.props.userDetails?.id
        : null,
      keyword,
      page,
      category,
      min_price,
      max_price,
      brand,
      range
    );
    //     {
    //       params: { userId: this.props.userDetails?.role === KEYS.seller ? this.props.userDetails?.id : null }
    //     };
    //     console.log("data", data);
    //     this.setState({ products: data });
    //   } catch (error) {
    //     alert("Something went wrong");
    //     console.error(error);
    //   }
  };
  /**
   * Delete product
   */
  deleteProduct = async (id) => {
    const status = window.confirm("Do you want to delete this product?");
    if (!status) {
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/productdetails/${id}/`);
      alert("Product deleted");
      let tempProducts = [...this.state.products];
      const arrIndex = tempProducts.findIndex((obj) => obj._id === id);
      tempProducts.splice(arrIndex, 1);
      this.setState({ products: tempProducts });
    } catch (error) {
      alert("Error: " + error);
    }
  };
  render() {
    return (
      <div className="row m-3">
        <Category
          location={this.props.location}
          category={this.props.category}
          brand={this.props.brand}
          min_price={this.props.min_price}
          max_price={this.props.max_price}
          range={this.props.range}
        />
        {this.props.products?.map((item, index) => (
          <ProductCard
            key={item._id}
            item={item}
            deleteProduct={this.deleteProduct}
          />
        ))}
        {/* <center> */}
        <div>
          <Paginate
            page={this.state.page}
            pages={this.state.pages}
            // keyword={this.state.keyword}
          />
        </div>
        {/* </center> */}
      </div>
    );
  }
}
/**
The authReducer normally looks at the authAction type field to decide what happens

in class based function we can call reducers by connect(mapStateToProps)
**/
const mapStateToProps = (state) => ({
  userDetails: state.authReducer.userDetails,
  products: state.productListReducer?.products,
  loading: state.productListReducer?.loading,
});
export default withRouter(
  connect(mapStateToProps, { listProducts })(ProductsList)
);
