
export const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose EliteShop?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to providing you with the best shopping experience possible. 
              From carefully curated products to exceptional customer service, we go above 
              and beyond to exceed your expectations.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                <p className="text-gray-600">Hand-selected products that meet our high standards</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Fast Shipping</h3>
                <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Expert Support</h3>
                <p className="text-gray-600">Our team is here to help with any questions</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
                <p className="text-gray-600">Your privacy and security are our top priority</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
              alt="About Us"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
