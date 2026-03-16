import { X, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export default function CreateInvoiceModal({ open, onClose }: { open: boolean, onClose: () => void }) {

    const [items, setItems] = useState([{ desc: "", qty: 1, price: "" }])

    const addItem = () => {
        setItems([...items, { desc: "", qty: 1, price: "" }])
    }

    const removeItem = (i: number) => {
        setItems(items.filter((_, index) => index !== i))
    }

    if (!open) return null

    return (

        <div
            className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
            onClick={onClose}
        >

            <div
                className="bg-white max-w-[756px] w-[95%] rounded-xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex justify-between items-start p-6 border-b">

                    <div>

                        <h3 className="font-playfair text-2xl">
                            New Invoice
                        </h3>

                        <p className="text-[#64748B] mt-1">
                            Create a new invoice for a client.
                        </p>

                    </div>

                    <button onClick={onClose} className="text-[#64748B]">
                        <X size={20} />
                    </button>

                </div>



                <div className="p-6 space-y-6">

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <label className="text-sm text-[#62748E]">
                                CLIENT
                            </label>

                            <select className="w-full border border-[#E5E7EB] rounded-lg h-12 px-3 mt-1 outline-none">
                                <option>Select client</option>
                                <option> client 1</option>
                                <option> client 2</option>
                                <option> client 3</option>
                                <option> client 4</option>
                            </select>

                        </div>



                        <div>

                            <label className="text-sm text-[#62748E]">
                                DUE DATE
                            </label>

                            <input
                                type="date"
                                className="w-full border border-[#E5E7EB] rounded-lg h-12 px-3 mt-1 outline-none"
                            />

                        </div>

                    </div>



                    <div>

                        <div className="flex justify-between items-center mb-3">

                            <p className="text-sm text-[#62748E]">
                                LINE ITEMS
                            </p>

                            <button
                                onClick={addItem}
                                className="flex items-center gap-2 text-[#2563EB]"
                            >
                                <Plus size={16} />
                                Add Item
                            </button>

                        </div>



                        <div className="space-y-3">

                            {items.map((item, i) => (

                                <div key={i} className="grid grid-cols-[1fr_120px_140px_auto] gap-3">

                                    <input
                                        placeholder="Item Description"
                                        className="border border-[#E5E7EB] rounded-lg h-12 px-3 outline-none"
                                    />

                                    <input
                                        type="number"
                                        defaultValue={1}
                                        className="border border-[#E5E7EB] rounded-lg h-12 px-3 outline-none"
                                    />

                                    <input
                                        placeholder="Price"
                                        className="border border-[#E5E7EB] rounded-lg h-12 px-3 outline-none"
                                    />

                                    <button
                                        onClick={() => removeItem(i)}
                                        className="text-[#94A3B8]"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>



                    <div className="border-t pt-6 flex justify-end">

                        <div className="w-[260px] space-y-2 text-sm">

                            <div className="flex justify-between text-[#64748B]">
                                <span>Subtotal</span>
                                <span>$0.00</span>
                            </div>

                            <div className="flex justify-between text-[#64748B]">
                                <span>Tax (0%)</span>
                                <span>$0.00</span>
                            </div>

                            <div className="flex justify-between text-[#0F172A] font-semibold text-lg pt-2">
                                <span>Total</span>
                                <span>$0.00</span>
                            </div>

                        </div>

                    </div>

                </div>



                <div className="flex justify-end gap-6 border-t p-6">

                    <button onClick={onClose} className="text-[#64748B]">
                        Cancel
                    </button>

                    <button className="bg-[#2563EB] text-white px-6 py-2 rounded-lg shadow">
                        Create Invoice
                    </button>

                </div>

            </div>

        </div>

    )
}