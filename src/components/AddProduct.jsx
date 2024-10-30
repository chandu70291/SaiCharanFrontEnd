import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSongChange = (e) => {
    setSong(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append("songFile", song);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Song added successfully:", response.data);
        alert("Song added successfully");
      })
      .catch((error) => {
        console.error("Error adding song:", error);
        alert("Error adding song");
      });
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Song Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Song Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>About</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Enter the song about"
              value={product.brand}
              onChange={handleInputChange}
              id="brand"
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add song description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
              id="description"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Album</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleInputChange}
              name="category"
              id="category"
            >
              <option value="">Select category</option>
              <option value="Fearless">Fearless</option>
              <option value="Midnights">Midnights</option>
              <option value="Red">Red</option>
              <option value="1989">1989</option>
              <option value="Folklore">Folklore</option>
              <option value="Speak Now">Speak Now</option>
              <option value="The Tortured Poets Department">The Tortured Poets Department</option>
              <option value="Evermore">Evermore</option>
              <option value="Lover">Lover</option>
              <option value="Live from clear channel">Live from clear channel</option>
              <option value="Beautiful eyes">Beautiful eyes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Rating</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Rate"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
              id="stockQuantity"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
              id="releaseDate"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Song</h6>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={handleSongChange}
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct({ ...product, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label">Song Available</label>
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
