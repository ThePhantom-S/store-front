import React, { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    paymentMethod: "Online Payment",
    notes: "",
  });

  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode ||
      !formData.country
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newOrderId = "ORD" + Math.floor(Math.random() * 1000000);
    setOrderId(newOrderId);

    alert(`Order Confirmed!\nYour Order ID is: ${newOrderId}`);

    clearCart();

    navigate("/");
  };

  // Remove direct DOM manipulation for cartCount.
  // Instead, update your cart icon component by passing item count as prop or via context.
  // So removing this effect to keep React principles.
  /*
  useEffect(() => {
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
      cartCountEl.textContent = items.reduce((acc, item) => acc + item.quantity, 0);
    }
  }, [items]);
  */

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Customer Form */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6">Customer Information</h3>

          <form onSubmit={handlePlaceOrder}>
            {/* Personal Details */}
            <div className="mb-8">
              <h5 className="text-lg font-semibold mb-4">Personal Details</h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h5 className="text-lg font-semibold mb-4">Shipping Address</h5>

              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Street Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State/Province <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Postal/Zip Code <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country <span className="text-red-600">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mb-8">
              <h5 className="text-lg font-semibold mb-4">Payment Details</h5>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method <span className="text-red-600">*</span>
                </label>

                <label className="inline-flex items-center mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online Payment"
                    checked={formData.paymentMethod === "Online Payment"}
                    onChange={handleInputChange}
                    className="form-radio text-red-600"
                  />
                  <span className="ml-2">Online Payment (UPI)</span>
                </label>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                <h6 className="mb-3 font-semibold">Scan QR Code to Pay</h6>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://sreeayiengaran.com/pay"
                  alt="Payment QR Code"
                  className="mx-auto mb-3 max-w-[200px]"
                />
                <p className="text-sm text-gray-600 mb-0">
                  Scan this QR code using any UPI app to complete your payment
                </p>
                <p className="text-sm text-gray-600">
                  Or use UPI ID: pay@sreeayiengaran.axisbank
                </p>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-8">
              <h5 className="text-lg font-semibold mb-4">Additional Information</h5>

              <textarea
                id="notes"
                name="notes"
                placeholder="Special instructions for delivery or prescription details"
                rows="3"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={items.length === 0}
              className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition ${
                items.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-20 self-start">
          <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 mb-6 max-h-[400px] overflow-auto">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                      <div>
                        <h6 className="font-semibold">{item.name}</h6>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <span className="text-red-600 font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
