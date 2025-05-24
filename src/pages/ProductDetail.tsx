
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_urls: string[];
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load product details",
        variant: "destructive",
      });
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const imageUrl = product.image_urls && product.image_urls.length > 0 
        ? product.image_urls[0]
        : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";
      
      addToCart({
        ...product,
        image: imageUrl
      }, quantity);
      
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} added to your cart.`,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const imageUrl = product.image_urls && product.image_urls.length > 0 
        ? product.image_urls[0]
        : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";
      
      buyNow({
        ...product,
        image: imageUrl
      }, quantity);
      
      toast({
        title: "Proceeding to checkout",
        description: `${quantity} x ${product.name} added to checkout.`,
      });
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Button asChild>
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image Carousel */}
          <ProductImageCarousel 
            images={product.image_urls || []} 
            productName={product.name} 
          />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.category && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
                  {product.category}
                </span>
              )}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-gray-900">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 flex items-center gap-2"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                
                <Button 
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center gap-2"
                  size="lg"
                >
                  <Zap className="h-4 w-4" />
                  Buy Now - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Premium quality materials</li>
                <li>• Free shipping on orders over $50</li>
                <li>• 30-day return guarantee</li>
                <li>• Expert customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
