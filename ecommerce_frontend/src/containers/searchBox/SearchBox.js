import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/***
 * JSX format of the search box
 */
function SearchBox() {
  const [keyword, setKeyword] = useState("");
  let history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/search?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  return (
    <Form onSubmit={submitHandler} inline="true">
      <div className="input-group ">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setKeyword(e.target.value)}
          aria-describedby="search-addon"
        />
        <button type="submit" className="btn btn-outline-dark">
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        classNameNameName="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-danger" classNameNameName="p-2">
        search
      </Button> */}
    </Form>
  );
}
export default SearchBox;
