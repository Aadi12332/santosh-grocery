import { Search, Filter, Download, MoreHorizontal } from "lucide-react"

export default function ProductsTable({ setActiveTab }: { setActiveTab: (tab: string) => void }) {

  const products = [
    {
      name: "Organic Whole Milk",
      sku: "DY-001",
      category: "Dairy",
      price: "$5.99",
      stock: 45,
      status: "Active",
      img: "https://images.unsplash.com/photo-1580910051074-3eb694886505"
    },
    {
      name: "Artisan Sourdough Bread",
      sku: "BK-023",
      category: "Bakery",
      price: "$8.50",
      stock: 12,
      status: "Active",
      img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec"
    },
    {
      name: "Extra Virgin Olive Oil",
      sku: "PN-104",
      category: "Pantry",
      price: "$24.99",
      stock: 8,
      status: "Low Stock",
      img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5"
    },
    {
      name: "Fresh Avocados (Pack of 4)",
      sku: "PR-552",
      category: "Produce",
      price: "$6.99",
      stock: 0,
      status: "Out of Stock",
      img: "https://images.unsplash.com/photo-1601039641847-7857b994d704"
    },
    {
      name: "Truffle Cheese",
      sku: "DY-009",
      category: "Dairy",
      price: "$18.99",
      stock: 25,
      status: "Inactive",
      img: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b"
    }
  ]

  const statusStyles: any = {
    Active: "bg-green-100 text-green-700",
    "Low Stock": "bg-yellow-100 text-yellow-700",
    "Out of Stock": "bg-red-100 text-red-700",
    Inactive: "bg-gray-200 text-gray-600"
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Products
          </h1>

          <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
            Manage your product catalog, inventory, and pricing.
          </p>
        </div>

        <button onClick={() => setActiveTab("addproduct")} className="bg-[#F54900] text-white rounded-lg px-5 py-2.5 shadow-sm">
          + Add New Product
        </button>

      </div>


      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

          <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 w-full lg:w-[320px]">
            <Search size={18} className="text-[#6A7282]" />
            <input
              placeholder="Search products..."
              className="w-full px-3 py-2 outline-none text-sm"
            />
          </div>

          <div className="flex gap-3">

            <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 shadow-sm bg-white">
              <Filter size={16} />
              Filters
            </button>

            <button className="flex items-center gap-2 border border-[#E5E7EB] rounded-lg px-4 py-2 shadow-sm bg-white">
              <Download size={16} />
              Export
            </button>

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b text-[#6A7282] text-sm">

              <tr>
                <th className="py-3 text-sm font-medium text-[#62748E] min-w-6">
                  <input type="checkbox" className="accent-[#F54900] cursor-pointer" />
                </th>

                <th className="py-3 text-sm font-medium text-[#62748E]">PRODUCT</th>
                <th className="py-3 text-sm font-medium text-[#62748E]">SKU</th>
                <th className="py-3 text-sm font-medium text-[#62748E]">CATEGORY</th>
                <th className="py-3 text-sm font-medium text-[#62748E]">PRICE</th>
                <th className="py-3 text-sm font-medium text-[#62748E]">STOCK</th>
                <th className="py-3 text-sm font-medium text-[#62748E]">STATUS</th>
                <th className="py-3 text-sm font-medium text-[#62748E] text-center">ACTION</th>
              </tr>

            </thead>

            <tbody>

              {products.map((p, i) => (

                <tr key={i} className="border-b last:border-none">

                  <td className="py-4">
                    <input type="checkbox" className="accent-[#F54900] cursor-pointer" />
                  </td>

                  <td className="py-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={p.img}
                        className="w-12 h-12 min-w-12 rounded-lg object-cover"
                      />

                      <span className="text-[#111827] font-medium">
                        {p.name}
                      </span>

                    </div>

                  </td>

                  <td className="py-4 text-[#6A7282]">
                    {p.sku}
                  </td>

                  <td className="py-4 text-[#374151]">
                    {p.category}
                  </td>

                  <td className="py-4 font-medium">
                    {p.price}
                  </td>

                  <td className="py-4">
                   <span
  className={`px-2 py-1 rounded-md text-sm ${
    p.status === "Out of Stock"
      ? "bg-red-100 text-red-600"
      : p.status === "Low Stock"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-[#374151]"
  }`}
>
  {p.stock}
</span>
                  </td>

                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>

                  <td className="py-4 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        <div className="flex items-center justify-between mt-6 text-sm text-[#6A7282]">

          <p>
            Showing 5 of 84 products
          </p>

          <div className="flex gap-3">

            <button className="border border-[#E5E7EB] px-4 py-1.5 rounded-lg bg-gray-100">
              Previous
            </button>

            <button className="border border-[#E5E7EB] px-4 py-1.5 rounded-lg bg-white">
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}