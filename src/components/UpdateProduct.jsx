import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );

        setProduct(response.data);
      
        const responseImage = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const imageFile = await converUrlToFile(responseImage.data, response.data.imageName);
        setImage(imageFile);     
        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    console.log("image Updated", image);
  }, [image]);

  const converUrlToFile = async (blobData, fileName) => {
    const file = new File([blobData], fileName, { type: blobData.type });
    return file;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("images", image);
    console.log("productsdfsfsf", updateProduct);
    const updatedProduct = new FormData();
    updatedProduct.append("imageFile", image);
    updatedProduct.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
    );

    console.log("formData : ", updatedProduct);
    axios
      .put(`http://localhost:8080/api/product/${id}`, updatedProduct, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product updated successfully:", updatedProduct);
        alert("Product updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        console.log("Product unsuccessful update", updateProduct);
        alert("Failed to update product. Please try again.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="update-product-container">
      <div className="center-container" style={{ marginTop: "7rem" }}>
        <h1>Update Song Details</h1>
        <form className="row g-3 pt-1" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.name}
              value={updateProduct.name}
              onChange={handleChange}
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
              placeholder={product.brand}
              value={updateProduct.brand}
              onChange={handleChange}
              id="
              brand"
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.description}
              name="description"
              onChange={handleChange}
              value={updateProduct.description}
              id="description"
            />
          </div>
          {/* Removed Price Section */}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
              id="category"
            >
              <option value="">Select Category</option>
              <option value="Fearless">Fearless</option>
              <option value="Midnights">Midnights</option>
              <option value="Red">Red</option>
              <option value="1989">1989</option>
              <option value="Reputation">Reputation</option>
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
              <h6>Rate</h6>
            </label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              placeholder={product.stockQuantity}
              value={updateProduct.stockQuantity}
              name="stockQuantity"
              id="stockQuantity"
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <img
              src={image ? URL.createObjectURL(image) : "Image unavailable"}
              alt={product.imageName}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                padding: "5px",
                margin: "0",
              }}
            />
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              placeholder="Upload image"
              name="imageUrl"
              id="imageUrl"
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={updateProduct.productAvailable}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
