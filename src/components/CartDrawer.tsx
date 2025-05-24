import { Button } from "@/components/ui/button";
import { SheetTitle } from "@/components/ui/sheet"; // Only using SheetTitle for title styling
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart, totalPrice, itemCount } = useCart();

  if (!isOpen) return null;

  // Prevent click inside drawer from closing it
  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Shopping cart with ${itemCount} items`}
        className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl p-4 flex flex-col z-50"
        onClick={handleDrawerClick}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <SheetTitle className="text-lg font-bold">
            Shopping Cart ({itemCount})
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            <X />
          </Button>
        </div>

        {/* Items List or Empty Message */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
              <p>Your cart is empty</p>
              <Button asChild variant="default" className="mt-4" onClick={onClose}>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                {/* Item Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                {/* Name, Price, Quantity Controls */}
                <div className="flex-1 mx-4">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2 mt-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      aria-label={`Decrease quantity of ${item.name}`}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Remove button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer: Total and Checkout */}
        {items.length > 0 && (
          <div className="pt-4 border-t mt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full mt-4" onClick={onClose}>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </aside>
    </>
  );
};
