interface OrderButtonSetProps{
    addToCart: () => void;
    orderDirectry: () => void;
}

const OrderButtonSet = ({addToCart, orderDirectry}:OrderButtonSetProps) => {
    return(
        <div className="flex flex-col gap-1 w-48">
            <button onClick={addToCart} className="bg-primary w-full h-auto py-6 text-text-invert font-bold rounded-t-2xl rounded-b-sm text-xl transition-all duration-300 active:brightness-90 glow">
                カートに追加
            </button>
            <button onClick={orderDirectry} className="bg-secondary w-full h-auto py-3 text-text-invert font-bold rounded-t-sm rounded-b-2xl text-md transition-all duration-300 active:brightness-90 glow">
                そのまま注文
            </button>
        </div>
    );
}

export default OrderButtonSet;