import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import UpdateProduct from "./UpdateProduct";

const Product = () => {
  const { id } = useParams();
  const { data, addToCart, removeFromCart, cart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName && response.data.songName) {
          fetchImage();
          fetchSong();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };

    const fetchSong = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/product/${id}/song`,
        { responseType: "blob" }
      );
      setSongUrl(URL.createObjectURL(response.data));
    };
    
    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      console.log("Song deleted successfully");
      alert("Song deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting Song:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handleAddToCart = () => {
    addToCart({ songUrl });
    alert("Song added to favourites");
  };

  if (!product) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }

  return (
    <>
      <div className="containers" style={{ display: "flex" }}>
        <img
          className="left-column-img"
          src={imageUrl}
          alt={product.imageName}
          style={{ width: "50%", height: "auto" }}
        />

        <div className="right-column" style={{ width: "50%" }}>
          <div className="product-description">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 'lighter' }}>
                {product.category}
              </span>
              <p className="release-date" style={{ marginBottom: "2rem" }}>
                <h6>Release Date : <span> <i> {new Date(product.releaseDate).toLocaleDateString()}</i></span></h6>
              </p>
            </div>
            
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", textTransform: 'capitalize', letterSpacing: '1px' }}>
              {product.name}
            </h1>
            <i style={{ marginBottom: "3rem" }}>{product.brand}</i>
            <p style={{ fontWeight: 'bold', fontSize: '1rem', margin: '10px 0px 0px' }}>SONG DESCRIPTION :</p>
            <p style={{ marginBottom: "1rem" }}>{product.description}</p>
          </div>

          <div className="product-stockQuantity">
            <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
              {"Rating :" + product.stockQuantity}
            </span>
            <button
              className={`btn ${
                !product.productAvailable ? "disabled-btn" : ""
              }`}
              onClick={handleAddToCart}
              disabled={!product.productAvailable}
              style={{
                padding: "1rem 0rem",
                fontSize: "1rem",
                backgroundColor: "#FF69B4",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: "20px",
                marginBottom: "1rem",
                marginLeft: "right",
              }}
            >
              {product.productAvailable ? "Add to Favourites" : "Add to Favourites"}
            </button>
            <audio
              controls
              src={songUrl}
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              Your browser does not support the <code>audio</code> element.
            </audio>
            <h6 style={{ marginBottom: "1rem" }}>
              Song Available :{" "}
              <i style={{ color: "green", fontWeight: "bold" }}>
                {product.stockQuantity}
              </i>
            </h6>
          </div>
          <div className="update-button" style={{ display: "flex", gap: "1rem" }}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleEditClick}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={deleteProduct}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
