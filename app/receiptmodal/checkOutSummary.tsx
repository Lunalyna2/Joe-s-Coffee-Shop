import { Plus, Check } from 'lucide-react';
//checkout summary component for the receipt modal
export const CheckoutSummary = ({ 
  subtotal, 
  finalTotal, 
  change, 
  discountType, 
  setDiscountType, 
  discountValue, 
  setDiscountValue,
  paymentReceived, 
  setPaymentReceived,
  cookingRequest, 
  setCookingRequest,
  isEditingRequest, 
  setIsEditingRequest,
  onPlaceOrder, 
  canPlaceOrder
}: any) => (
  <section className="shrink-0 p-5 bg-white border-t border-[#DCC7AA] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
    {/*cooking request section*/}
    <div className="mb-3 flex justify-center w-full">
      {!isEditingRequest ? (
        <button 
          onClick={() => setIsEditingRequest(true)} 
          className="text-[11px] font-black text-[#4B3832] flex items-center gap-1.5 uppercase tracking-widest text-center px-4 max-w-full group">
          <Plus size={10} strokeWidth={3} className="shrink-0" /> 
          <span className="break-all line-clamp-2">
            {cookingRequest || "Special Request"}
          </span>
        </button>
      ) : (
        //cooking request input section 
        <div className="flex items-center bg-[#F5E6CA] rounded-full pr-1 py-0.5 border border-[#DCC7AA] w-full max-w-50">
           <input 
             autoFocus 
             className="bg-transparent pl-3 text-[10px] font-black outline-none w-full text-[#4B3832] uppercase" 
             value={cookingRequest || ''} 
             onChange={(e) => setCookingRequest(e.target.value)} 
             placeholder="NOTES"/>
           <button 
             onClick={() => setIsEditingRequest(false)} 
             className="bg-[#4B3832] text-white rounded-full p-1 shrink-0">
             <Check size={10} strokeWidth={3} />
           </button>
        </div>
      )}
    </div>
    {/*pricing summary section*/}
    <div className="bg-[#F5E6CA]/20 rounded-2xl p-4 border border-[#DCC7AA]/20 space-y-2">
      <div className="flex justify-between text-[11px] font-black text-[#4B3832] uppercase tracking-widest">
        <span>Subtotal</span>
        <span>₱{subtotal.toFixed(2)}</span>
      </div>
      {/*discount section*/}
      <div className="flex justify-between items-center py-1">
         <div className="flex gap-0.5">
            <button 
              onClick={() => setDiscountType('amount')} 
              className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-black transition-colors ${discountType === 'amount' ? 'bg-[#4B3832] text-white' : 'bg-white text-[#DCC7AA]'}`}>
              ₱
            </button>
            <button 
              onClick={() => setDiscountType('percent')} 
              className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-black transition-colors ${discountType === 'percent' ? 'bg-[#4B3832] text-white' : 'bg-white text-[#DCC7AA]'}`}>
              %
            </button>
         </div>
         <input 
            type="number" 
            className="bg-white rounded w-24 text-right px-2 py-1 outline-none font-black text-[12px] text-[#4B3832] border border-[#DCC7AA]/30"
            value={discountValue === 0 ? '' : (discountValue || '')} 
            onChange={(e) => {
              const val = e.target.value;
              setDiscountValue(val === '' ? 0 : Number(val));
            }} 
            placeholder="0.00"/>
      </div>
      {/*total due section*/}
      <div className="flex justify-between items-end border-t border-dashed border-[#DCC7AA] pt-3 pb-1">
         <span className="text-[10px] font-black text-[#4B3832] uppercase italic tracking-widest">Total Due</span>
         <span className="text-xl font-black text-[#4B3832] leading-none tracking-tighter">₱{finalTotal.toFixed(2)}</span>
      </div>
      {/*payment received input section*/}  
      <div className="flex items-center justify-between gap-3 pt-1">
         <span className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest">Cash Received</span>
         <input 
            type="number" 
            className="bg-white w-40 text-right px-3 py-2 font-black text-lg text-[#4B3832] border-2 border-[#4B3832] rounded-lg outline-none focus:ring-2 ring-[#4B3832]/20"
            value={paymentReceived === 0 ? '' : (paymentReceived || '')} 
            onChange={(e) => {
              const val = e.target.value;
              setPaymentReceived(val === '' ? 0 : Number(val));
            }} 
            placeholder="0.00"/>
      </div>
      {/*change section*/}
      <div className="flex justify-between items-center pt-1">
        <span className="text-[10px] font-black text-[#DCC7AA] uppercase tracking-widest">Change</span>
        <span className="text-sm font-black text-[#6F4E37]">₱{change.toFixed(2)}</span>
      </div>
    </div>
    {/*place order button, disabled if payment is insufficient*/}  
    <button 
      onClick={onPlaceOrder} 
      disabled={!canPlaceOrder}
      className="w-full mt-4 bg-[#4B3832] text-[#DCC7AA] rounded-xl py-5 text-[10px] font-black tracking-[0.3em] uppercase disabled:opacity-30 disabled:grayscale transition-all active:scale-[0.98]">
      {canPlaceOrder ? "Complete Order" : "Check Payment"}
    </button>
  </section>
);