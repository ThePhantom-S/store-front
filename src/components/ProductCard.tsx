
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Zap } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  image_urls?: string[];
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();
  
  // Determine which image to display
  const imageUrl = product.image || 
    (product.image_urls && product.image_urls.length > 0 
      ? product.image_urls[0] 
      : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      ...product,
      image: imageUrl  // Ensure we have a single image URL for the cart
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    buyNow({
      ...product,
      image: imageUrl
    });
    toast({
      title: "Proceeding to checkout",
      description: `${product.name} added to checkout.`,
    });
    navigate('/checkout');
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="space-y-3">
          <span className="text-2xl font-bold text-gray-900 block">
            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
          </span>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAddToCart} size="sm" variant="outline" className="flex items-center gap-2 flex-1">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button onClick={handleBuyNow} size="sm" className="flex items-center gap-2 flex-1">
              <Zap className="h-4 w-4" />
              Buy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
