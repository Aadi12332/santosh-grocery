import { AlertCircle, Plus, TriangleAlertIcon } from "lucide-react";

export default function StockAdjustmentModal({open, onClose}: {open: boolean; onClose: () => void}) {

    if (!open) return null

    return (
        
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >

            <div
                className="bg-[#fff] max-w-[640px] w-[96%] max-h-[95vh] rounded-xl shadow-xl overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex justify-between items-start p-6 border-b bg-[#F8FAFC80]">

                    <div>

                        <h3 className="font-playfair text-2xl">
                            Stock Adjustment
                        </h3>

                        <p className="text-[#64748B] mt-1">
                            Manually adjust inventory levels for a product.
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-[#64748B]"
                    >
                        ✕
                    </button>

                </div>



                <div className="p-6 space-y-6 bg-white">

                    <div>

                        <label className="text-sm text-[#374151]">
                            Product
                        </label>

                        <select className="w-full border border-[#E5E7EB] rounded-lg h-12 px-3 mt-1 outline-none">
                            <option>Select product</option>
                            <option value="">Product 1</option>
                            <option value="">Product 2</option>
                            <option value="">Product 3</option>
                            <option value="">Product 4</option>
                        </select>

                    </div>



                    <div>

                        <label className="text-sm text-[#374151] mb-2 block">
                            Adjustment Type
                        </label>

                        <div className="grid grid-cols-3 gap-3">

                            <button className="border border-[#3B82F6] bg-blue-50 text-[#155DFC] rounded-lg py-4 flex flex-col items-center gap-1">
                                <Plus size={20} />
                                Stock In
                            </button>

                            <button className="border border-[#E5E7EB] rounded-lg py-4 flex flex-col items-center gap-1">
                                <AlertCircle size={20} />
                                Correction
                            </button>

                            <button className="border border-[#E5E7EB] rounded-lg py-4 flex flex-col items-center gap-1">
                                <TriangleAlertIcon size={20} />
                                Loss/Damage
                            </button>

                        </div>

                    </div>



                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="text-sm text-[#374151]">
                                Quantity
                            </label>

                            <input
                                type="number"
                                placeholder="0"
                                className="w-full border border-[#E5E7EB] rounded-lg h-12 px-3 mt-1 outline-none"
                            />

                        </div>

                        <div>

                            <label className="text-sm text-[#374151]">
                                Bin Location
                            </label>

                            <input
                                placeholder="e.g. A-12-05"
                                className="w-full border border-[#E5E7EB] rounded-lg h-12 px-3 mt-1 outline-none"
                            />

                        </div>

                    </div>



                    <div>

                        <label className="text-sm text-[#374151]">
                            Reason / Notes
                        </label>

                        <textarea
                            rows={4}
                            placeholder="Explain the reason for this adjustment..."
                            className="w-full border border-[#E5E7EB] rounded-lg px-3 py-3 mt-1 outline-none"
                        />

                    </div>

                </div>



                <div className="flex justify-end gap-4 border-t p-6 bg-[#F8FAFC80]">

                    <button
                        onClick={onClose}
                        className="text-[#64748B]"
                    >
                        Cancel
                    </button>

                    <button className="bg-[#2563EB] text-white px-6 py-2 rounded-lg shadow">
                        Confirm
                    </button>

                </div>

            </div>

        </div>

    )

}