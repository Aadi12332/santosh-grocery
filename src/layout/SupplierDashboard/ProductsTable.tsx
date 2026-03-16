import { Search, Filter, Download, Plus } from "lucide-react"

export default function ProductsTable({ setActiveTab }: { setActiveTab: (tab: string) => void }) {

  const products = [
    {
      name: "Organic Avocados (Hass)",
      category: "Fresh Produce",
      img: "https://picsum.photos/60?1",
      unit: "Crate (40 ct)",
      sku: "HASS-01",
      price: "$85.00",
      tiers: [
        { label: "1-10", price: "$85.00" },
        { label: "11-50", price: "$78.00" },
        { label: "50+", price: "$72.50" }
      ],
      stock: 450,
      status: "In Stock"
    },
    {
      name: "Basmati Rice (Premium Aged)",
      category: "Grains",
      img: "https://picsum.photos/60?2",
      unit: "Sack (20kg)",
      sku: "RIC-BAS-20",
      price: "$42.00",
      tiers: [
        { label: "1-20", price: "$42.00" },
        { label: "20+", price: "$38.00" }
      ],
      stock: 1200,
      status: "In Stock"
    },
    {
      name: "Atlantic Salmon Fillets",
      category: "Seafood",
      img: "https://picsum.photos/60?3",
      unit: "Box (5kg)",
      sku: "SAL-05",
      price: "$125.00",
      tiers: [
        { label: "1-5", price: "$125.00" },
        { label: "6+", price: "$115.00" }
      ],
      stock: 25,
      status: "Low Stock"
    },
    {
      name: "Extra Virgin Olive Oil",
      category: "Oils",
      img: "https://picsum.photos/60?4",
      unit: "Can (5L)",
      sku: "EV-05",
      price: "$55.00",
      tiers: [
        { label: "1-10", price: "$55.00" },
        { label: "10-50", price: "$48.00" },
        { label: "50+", price: "$45.00" }
      ],
      stock: 80,
      status: "In Stock"
    },
    {
      name: "Paper Takeout Containers",
      category: "Packaging",
      img: "https://picsum.photos/60?5",
      unit: "Carton (500pc)",
      sku: "BOX-500",
      price: "$95.00",
      tiers: [
        { label: "1-5", price: "$95.00" },
        { label: "5-20", price: "$85.00" },
        { label: "20+", price: "$75.00" }
      ],
      stock: 2500,
      status: "In Stock"
    }
  ]

  const statusStyles: any = {
    "In Stock": "bg-green-100 text-green-700",
    "Low Stock": "bg-red-100 text-red-600"
  }

  return (

    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

        <div>
          <h1 className="lg:text-[34px] text-3xl font-playfair font-semibold">
            Product Catalog
          </h1>

          <p className="text-[#64748B] mt-2">
            Manage your bulk inventory and pricing tiers.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border border-[#E5E7EB] bg-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <Download size={16} />
            Import CSV
          </button>

          <button onClick={() => setActiveTab("add-product")} className="bg-[#155DFC] text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <Plus size={16} />
            Add Product
          </button>

        </div>

      </div>


      <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-3 lg:p-6">

        <div className="flex flex-col lg:flex-row gap-3 mb-6">

          <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3 flex-1">
            <Search size={18} className="text-[#64748B]" />
            <input placeholder="Search by name, SKU, or category..." className="w-full px-3 py-2 outline-none text-sm" />
          </div>

          {["Category: All", "Status: Active", "Stock: Any"].map((f, i) => (
            <button key={i} className="border border-[#E5E7EB] bg-white rounded-lg px-4 py-2 text-sm flex items-center gap-2">
              <Filter size={14} />
              {f}
            </button>
          ))}

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b text-[#64748B] text-sm">

              <tr>
                <th className="py-3">PRODUCT</th>
                <th className="py-3">SKU / UNIT</th>
                <th className="py-3">BASE PRICE</th>
                <th className="py-3">BULK TIERS</th>
                <th className="py-3">STOCK</th>
                <th className="py-3">STATUS</th>
                <th className="py-3">ACTION</th>
              </tr>

            </thead>

            <tbody>

              {products.map((p, i) => (

                <tr key={i} className="border-b last:border-none">

                  <td className="py-5">

                    <div className="flex items-center gap-3">

                      <img src={p.img} className="w-12 h-12 rounded-lg object-cover" />

                      <div>
                        <p className="font-medium text-[#111827]">{p.name}</p>
                        <p className="text-sm text-[#64748B]">{p.category}</p>
                      </div>

                    </div>

                  </td>


                  <td className="py-5">

                    <div>
                      <p className="text-[#111827]">{p.unit}</p>
                      <p className="text-sm text-[#64748B]">{p.sku}</p>
                    </div>

                  </td>


                  <td className="py-5 font-medium">
                    {p.price}
                  </td>


                  <td className="py-5">

                    <div className="space-y-1">

                      {p.tiers.map((t: any, index: number) => (
                        <div key={index} className="flex gap-2 text-sm">
                          <span className="text-[#64748B]">{t.label}:</span>
                          <span className="text-green-600 font-medium">{t.price}</span>
                        </div>
                      ))}

                    </div>

                  </td>


                  <td className="py-5 font-medium">
                    {p.stock}
                  </td>


                  <td className="py-5">

                    <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>

                  </td>


                  <td className="py-5">
                    <button className="px-3 py-1 border border-[#E5E7EB] rounded-lg text-sm">
                      Edit
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )
}