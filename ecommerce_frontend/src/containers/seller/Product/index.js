import React from "react";
import { Link } from "react-router-dom";

import ProductsList from "./ProductsList";

function SellerProducts() {
  return (
    <div>
      <div>
        {/* <Link to="" className="btn btn-dark m-3">
          Add product
        </Link> */}
        <ProductsList />
      </div>
    </div>
  );
}

export default SellerProducts;
