
import { useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics"
  },
  {
    id: "2",
    name: "Modern Laptop Backpack",
    price: 89,
    description: "Stylish and functional laptop backpack with multiple compartments and water-resistant material. Ideal for work and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories"
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 249,
    description: "Advanced fitness tracking watch with heart rate monitoring, GPS, and smartphone integration. Stay healthy and connected.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics"
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 39,
    description: "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes. Perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing"
  },
  {
    id: "5",
    name: "Professional Camera",
    price: 899,
    description: "High-performance digital camera for photography enthusiasts. Features advanced autofocus and 4K video recording.",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    category: "Electronics"
  },
  {
    id: "6",
    name: "Luxury Skincare Set",
    price: 129,
    description: "Premium skincare collection with natural ingredients. Includes cleanser, serum, and moisturizer for all skin types.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    category: "Beauty"
  }
];

export const useMockProducts = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const categories = Array.from(new Set(products.map(product => product.category)));

  return {
    products,
    loading,
    getProductById,
    getProductsByCategory,
    categories
  };
};
