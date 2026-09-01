import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) {
    return <div className="pt-32 text-center text-gray-600">Loading product details...</div>;
  }

  if (error) {
    return <div className="pt-32 text-center text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="pt-32 text-center text-gray-600">No product found</div>;
  }

  // PRODUCTION REWRITE: Bypasses the login wall entirely
  const handleAddToCart = () => {
    // Pass the entire product object so the context can populate the cart page correctly
    addToCart(product); 
    alert(`${product.name} added to cart! 🛒`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-24 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img 
              src={`${product.image}`} 
              alt={product.name} 
              className="max-h-80 w-auto object-contain rounded-lg" 
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
              <p className="text-2xl font-bold text-green-600 mb-6">
                ₹{product.price}
              </p>
            </div>

            <div>
              {/* Clean Add to Cart Action */}
              <button 
                onClick={handleAddToCart} 
                className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Add to Cart 🛒
              </button>

              {/* Back to Home Navigation via Link for SPA routing */}
              <div className="mt-6">
                <Link to="/" className="text-blue-600 hover:underline flex items-center gap-1">
                  &larr; Back to Home
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
