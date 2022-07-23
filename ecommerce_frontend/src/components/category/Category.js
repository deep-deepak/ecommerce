import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
/***
 * category function
 */
function Category() {
  // keyword variable initialization
  let history = useHistory();

  // category variable for getting values from backend
  const [category, setCategory] = useState("");

  // min_value and max_val from getting minimum and maximum price
  const [min_price, setMinPrice] = useState("");
  const [max_price, setMaxPrice] = useState("");

  // brand variable for getting values from backend
  const [brand, setBrand] = useState("");

  // get full URL with params
  const currentURL = window.location.href;

  // split the full URL by '=' to get category name
  const splitURL = currentURL.split("=")[1];

  // All categories to map on homepage
  const categories = ["All", "Clothes", "Groceries", "Electronics"];

  // All brands to map on homepage
  const brands = [
    "All",
    "Apple",
    "Arrow",
    "Fruits",
    "Cannon",
    "Decor",
    "Logitech",
    "Sony",
  ];

  // All min_prices to map on homepage
  const minimumPrice = ["All", 100, 200, 300, 400, 500, 600, 700, 10000];

  // All max_prices to map on homepage
  const maximumPrice = [
    "All",
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    1000,
    20000,
    50000,
    60000,
  ];

  useEffect(() => {
    // if URL has category = 'All', then redirect user to homepage
    if (splitURL === "All") {
      history.push("/");
    }
  });

  // handleChange for category selection
  const handleChange = (e) => {
    const cat = categories[e.target.value];
    setCategory(e.target.value);
    history.push(`/?category=${cat}`);
  };

  // handleChange for brand selection
  const handleBrandChange = (e) => {
    const bran = brands[e.target.value];
    setBrand(e.target.value);
    history.push(`/?brand=${bran}`);
  };

  // handleChange for min. price selection
  const handleMinPriceChange = (e) => {
    const min = minimumPrice[e.target.value];
    setMinPrice(e.target.value);
    history.push(`/?min_price=${min}`);
  };

  // handleChange for max. price selection
  const handleMaxPriceChange = (e) => {
    const max = maximumPrice[e.target.value];
    setMaxPrice(e.target.value);
    history.push(`/?max_price=${max}`);
  };

  return (
    <div>
      {/* Category */}
      <div className="row">
        <div className="col-md-4">
          <label for="categories">Choose a Category : </label>

          <select
            name="categories"
            id="categories"
            onChange={(e) => handleChange(e)}
            value={category}
            // defaultValue={{ id: categories, value: "All" }}
            // className="browser-default custom-select"
          >
            {/* <option value="category" selected></option> */}
            {/* <option selected="All" value="All"></option> */}
            {categories.map((address, key) => (
              <option value={key}>{address}</option>
            ))}
          </select>

          {/* Brand */}
        </div>
        <div className="col-md-4">
          <label for="brand">Choose a Brand:</label>
          <select
            name="brand"
            id="brand"
            onChange={(e) => handleBrandChange(e)}
            value={brand}
            // className="browser-default custom-select"
          >
            {brands.map((address, key) => (
              <option value={key}>{address}</option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="col-md-5">
          <label for="min_price">Choose a Min. Price:</label>
          <select
            name="setMinPrice"
            id="setMinPrice"
            onChange={(e) => handleMinPriceChange(e)}
            value={min_price}
            // className="browser-default custom-select"
          >
            {minimumPrice.map((address, key) => (
              <option value={key}>{address}</option>
            ))}
          </select>
        </div>

        {/* Max Price */}
        <div className="col-md-5">
          <label for="max_price">Choose a Max. Price:</label>
          <select
            name="max_price"
            id="max_price"
            onChange={(e) => handleMaxPriceChange(e)}
            value={max_price}
            // className="browser-default custom-select"
          >
            {maximumPrice.map((address, key) => (
              <option value={key}>{address}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
export default Category;
