import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import axios from "axios";
import { constants } from "../../../../config";
import { withRouter } from "../../../../utils";
import { Link } from "react-router-dom";

/***
 * here seller can add the products
 */
export class AddProduct extends Component {
  state = {
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    selectedFile: null,
    serverImage: "",
  };
  componentDidMount() {
    if (this.props.params?.id) {
      this.getProductDetails();
    }
  }
  getProductDetails = async () => {
    const id = this.props.params?.id;
    try {
      const { data } = await axios.get(
        `${constants.API_URL}/productdetails/${id}/`
      );
      // console.log("..data", data);
      const { brand, category, description, image, name, price, stock } = data;
      this.setState({
        brand,
        category,
        description,
        serverImage: image,
        name,
        price,
        stock,
      });
    } catch (error) {
      alert("Something wrong went");
      console.error(error);
    }
  };
  clearFields = () => {
    this.setState({
      name: "",
      brand: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      selectedFile: null,
    });
  };
  handleFileSubmit = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  /**
   * Add new product
   */
  addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("brand", this.state.brand);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("stock", this.state.stock);
    formData.append("image", this.state.selectedFile);
    // console.log("..token", this.props.userDetails?.token);
    axios
      .post(constants.API_URL + "/add_product", formData, {
        headers: {
          Authorization: `Bearer ${this.props.userDetails?.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        alert("Product Added");
        this.clearFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /**
   * Update product by id
   */
  updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("brand", this.state.brand);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);
    formData.append("price", this.state.price);
    formData.append("stock", this.state.stock);
    if (this.state.selectedFile) {
      formData.append("image", this.state.selectedFile);
    }
    try {
      const { data } = await axios.put(
        constants.API_URL + "/productdetails/" + this.props.params.id + "/",
        formData
      );
      // console.log(data);
      const { brand, category, description, image, name, price, stock } = data;
      this.setState({
        brand,
        category,
        description,
        serverImage: image,
        selectedFile: null,
        name,
        price,
        stock,
      });
      alert("Product Updated");
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const id = this.props?.params?.id;
    return (
      <body className="bg-gradient">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Add Product!</h1>
                    </div>
                    <form
                      className="user"
                      onSubmit={id ? this.updateProduct : this.addProduct}
                      encType="multipart/form-data"
                    >
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            name="name"
                            className="form-control form-control-user"
                            id="exampleProductName"
                            placeholder="product name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            className="form-control form-control-user"
                            id="exampleimage"
                            type="file"
                            name="image"
                            placeholder="Upload image"
                            onChange={this.handleFileSubmit}
                          />
                          {this.state.serverImage &&
                            !this.state.selectedFile && (
                              <img
                                src={`${constants.API_URL}${this.state.serverImage}`}
                                height="160px"
                                width="180px"
                                alt="nice"
                              />
                            )}
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="brand"
                          className="form-control form-control-user"
                          id="exampleBrandName"
                          placeholder="Brand name"
                          value={this.state.brand}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="text"
                            name="category"
                            placeholder="Category"
                            value={this.state.category}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleDescription"
                            name="description"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            required
                          />
                        </div>{" "}
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            type="number"
                            className="form-control form-control-user"
                            id="number"
                            name="price"
                            placeholder="Price"
                            value={this.state.price}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="col-sm-6">
                          <input
                            type="number"
                            className="form-control form-control-user"
                            id="exampleStock"
                            name="stock"
                            placeholder="Stock"
                            value={this.state.stock}
                            onChange={this.handleChange}
                            required
                          />
                        </div>{" "}
                      </div>
                      <hr />
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        {id ? "Update" : "Add"} Product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>

      // <form
      //   onSubmit={id ? this.updateProduct : this.addProduct}
      //   encType="multipart/form-data"
      // >
      //   <center>
      //     <div>
      //       <Card style={{ width: "35rem" }} className="m-3">
      //         <Card.Body>
      //           <h3>{id ? "Edit Product" : "Add Product"}</h3>
      //           <br />
      //           <div className="form-group" style={{ textAlign: "left" }}>
      //             <label>Product_name </label>
      //             <input
      //               className="form-control"
      //               type="text"
      //               name="name"
      //               placeholder="product name"
      //               value={this.state.name}
      //               onChange={this.handleChange}
      //               required
      //             />
      //           </div>
      //           {/* <br /> */}
      //           <div className="form-group" style={{ textAlign: "left" }}>
      //             <label>Product_image</label>
      //             <input
      //               className="form-control"
      //               type="file"
      //               name="image"
      //               placeholder="Upload image"
      //               onChange={this.handleFileSubmit}
      //             />
      //             {this.state.serverImage && !this.state.selectedFile && (
      //               <img
      //                 src={`${constants.API_URL}${this.state.serverImage}`}
      //                 height="160px"
      //                 width="180px"
      //                 alt="nice"
      //               />
      //             )}
      //           </div>
      //           {/* <br /> */}
      //           <div className="form-group" style={{ textAlign: "left" }}>
      //             <label>Brand</label>
      //             <input
      //               className="form-control"
      //               type="text"
      //               name="brand"
      //               placeholder="Brand name"
      //               value={this.state.brand}
      //               onChange={this.handleChange}
      //               required
      //             />
      //           </div>
      //           {/* <br /> */}
      //           <div className="form-group" style={{ textAlign: "left" }}>
      //             <label>Category</label>
      //             <input
      //               className="form-control"
      //               type="text"
      //               name="category"
      //               placeholder="Category"
      //               value={this.state.category}
      //               onChange={this.handleChange}
      //               required
      //             />
      //           </div>
      //           {/* <br /> */}
      //           <div className="form-group" style={{ textAlign: "left" }}>
      //             <label>Description</label>
      //             <input
      //               className="form-control"
      //               type="text"
      //               name="description"
      //               placeholder="Description"
      //               value={this.state.description}
      //               onChange={this.handleChange}
      //               required
      //             />
      //           </div>
      //           {/* <br /> */}
      //           <div className="form-group" style={{ textAlign: "left" }}>
      //             <label>Price</label>
      //             <input
      //               className="form-control"
      //               type="number"
      //               name="price"
      //               placeholder="Price"
      //               value={this.state.price}
      //               onChange={this.handleChange}
      //               required
      //             />
      //           </div>
      //           {/* <br /> */}
      //           <div className="form-group" style={{ textAlign: "left" }}>
      //             <label>Stock</label>
      //             <input
      //               className="form-control"
      //               type="number"
      //               name="stock"
      //               placeholder="Stock"
      //               value={this.state.stock}
      //               onChange={this.handleChange}
      //               required
      //             />
      //           </div>
      //           {/* <br /> */}
      //           <div className="form-group">
      //             <button
      //               type="submit"
      //               className="form-control btn btn-outline-dark m-1"
      //             >
      //               {id ? "Update" : "Add"} Product
      //             </button>
      //           </div>
      //         </Card.Body>
      //       </Card>
      //     </div>
      //   </center>
      // </form>
    );
  }
}
const mapStateToProps = (state) => ({
  userDetails: state.authReducer.userDetails,
});
export default withRouter(connect(mapStateToProps)(AddProduct));
