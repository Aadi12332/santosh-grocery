import { Upload, Box, Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function AddProduct({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const [tiers, setTiers] = useState([{ qty: 10, price: 0 }]);
  const addTier = () => {
    setTiers([...tiers, { qty: 0, price: 0 }]);
  };
  const removeTier = (i: number) => {
    setTiers(tiers.filter((_, index) => index !== i));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="lg:text-[34px] text-3xl font-playfair font-semibold cursor-pointer flex items-center gap-2"
          onClick={() => setActiveTab("products")}
        >
          <ArrowLeft />
          Add New Product
        </h1>

        <p className="text-[#6A7282] mt-2 lg:text-[18px] text-base">
          Create a new product listing for your bulk catalog.
        </p>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        
        <div className="space-y-6">
          
          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
            
            <h3 className="font-playfair text-xl"> Basic Information </h3>
            <p className="text-[#64748B] mb-6">
              
              Product name, category and identification.
            </p>
            <div className="space-y-4">
              
              <div>
                
                <label className="text-sm text-[#374151]">
                  Product Name
                </label>
                <input
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 h-12 mt-1 outline-none"
                  placeholder="e.g. Organic Avocados (Hass)"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                
                <div>
                  
                  <label className="text-sm text-[#374151]">
                    Category
                  </label>
                  <select className="w-full border border-[#E5E7EB] rounded-lg px-3 h-12 mt-1 outline-none">
                    
                    <option>Select category</option>
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Dairy</option>
                    <option>Meat</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  
                  <label className="text-sm text-[#374151]">SKU</label>
                  <input
                    className="w-full border border-[#E5E7EB] rounded-lg px-3 h-12 mt-1 outline-none"
                    placeholder="e.g. AVO-HASS-01"
                  />
                </div>
              </div>
              <div>
                
                <label className="text-sm text-[#374151]">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 py-3 mt-1 outline-none"
                />
              </div>
            </div>
          </div>
          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
            
            <h3 className="font-playfair text-xl">
              
              Pricing & Inventory
            </h3>
            <p className="text-[#64748B] mb-6">
              
              Manage unit costs and stock levels.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              
              <div>
                
                <label className="text-sm text-[#374151]">Unit Type</label>
                <select className="w-full border border-[#E5E7EB] rounded-lg px-3 h-12 mt-1 outline-none">
                  
                  <option>Select unit</option>
                  <option>kg</option>
                  <option>g</option>
                  <option>l</option>
                  <option>ml</option>
                </select>
              </div>
              <div>
                
                <label className="text-sm text-[#374151]">
                  Base Price (per unit)
                </label>
                <input
                  type="number"
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 h-12 mt-1 outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                
                <label className="text-sm text-[#374151]">
                  Initial Stock
                </label>
                <input
                  type="number"
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 h-12 mt-1 outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                
                <label className="text-sm text-[#374151]">
                  Low Stock Alert
                </label>
                <input
                  type="number"
                  className="w-full border border-[#E5E7EB] rounded-lg px-3 h-12 mt-1 outline-none"
                  placeholder="10"
                />
              </div>
            </div>
            <div className="mt-6">
              
              <div className="flex justify-between items-center mb-4">
                
                <div className="flex items-center gap-2">
                  
                  <Box size={18} />
                  <h4 className="font-medium"> Bulk Pricing Tiers </h4>
                </div>
                <button
                  onClick={addTier}
                  className="flex items-center gap-2 border border-[#E5E7EB] px-3 py-2 rounded-lg"
                >
                  
                  <Plus size={16} /> Add Tier
                </button>
              </div>
              <div className="border border-[#E5E7EB] rounded-lg p-4 space-y-3">
                
                {tiers.map((t, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3">
                    
                    <input
                      className="border border-[#E5E7EB] rounded-lg px-3 h-12"
                      placeholder="Min Quantity"
                    />
                    <input
                      className="border border-[#E5E7EB] rounded-lg px-3 h-12"
                      placeholder="Unit Price"
                    />
                    <button onClick={() => removeTier(i)}>
                      
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#64748B] mt-2">
                
                Add tiers to encourage larger orders (e.g. Buy 10+ for
                $5/unit)
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          
          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
            
            <h3 className="font-playfair text-xl mb-4"> Product Image </h3>
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-10 text-center">
              
              <Upload size={28} className="mx-auto text-[#2563EB]" />
              <p className="mt-3 font-medium"> Click to upload image </p>
              <p className="text-sm text-[#64748B]">
                
                SVG, PNG, JPG or GIF (max 5MB)
              </p>
            </div>
          </div>
          <div className="border border-[#E5E7EB] bg-white rounded-lg lg:rounded-xl p-6">
            
            <h3 className="font-playfair text-xl mb-4"> Visibility </h3>
            <div className="space-y-4">
              
              <div>
                
                <label className="text-sm text-[#374151]"> Status </label>
                <select className="w-full border border-[#E5E7EB] rounded-lg px-3 h-12 mt-1">
                  
                  <option>Active</option> 
                  <option>Draft</option>

                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                
                <input type="checkbox" /> Mark as Featured Product
              </label>
            </div>
          </div>
          <div className="space-y-3">
            
            <button onClick={() => setActiveTab("products")} className="flex items-center justify-center gap-2 bg-[#2563EB] text-white w-full py-3 rounded-lg shadow">
              
              <Save size={18} /> Publish Product
            </button>
            <button onClick={() => setActiveTab("products")} className="w-full border border-[#E5E7EB] py-3 rounded-lg">
              
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
