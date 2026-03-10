export function ConfirmStep() {

  const order = {
    name: "Premium Matcha Tea Set",
    qty: 1,
    price: "$45.00",
    payment: "Mastercard •••• 4242",
    address: ["123 Luxury Lane", "Apt 4B"],
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7"
  }

  return (
    <div className="border border-[#1D293D] rounded-2xl p-6 bg-[#0F172B80]">

      <h2 className="font-playfair text-2xl mb-6 text-white">
        Review Order
      </h2>

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <img
            src={order.image}
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div>

            <p className="text-white text-lg font-playfair">
              {order.name}
            </p>

            <p className="text-[#94A3B8]">
              Qty:
            </p>

            <p className="text-[#94A3B8]">
              {order.qty}
            </p>

          </div>

        </div>

        <span className="text-white text-xl">
          {order.price}
        </span>

      </div>

      <div className="border-t border-[#1E293B] my-6"></div>

      <div className="flex justify-between mb-6">

        <p className="text-[#94A3B8]">
          Payment
        </p>

        <p className="text-white">
          {order.payment}
        </p>

      </div>

      <div className="flex justify-between">

        <p className="text-[#94A3B8]">
          Deliver to
        </p>

        <div className="text-right text-white">
          <p>{order.address[0]}</p>
          <p>{order.address[1]}</p>
        </div>

      </div>

    </div>
  )
}