import CommonIcon from "../utils/CommonIcon";

interface CartIndicatorProps{
    total: number;
}

const CartIndicator = ({total}:CartIndicatorProps) => {
    return(
        <button className="flex flex-col gap-1">
            <div className="w-16 aspect-square h-auto flex items-center justify-center bg-primary rounded-t-xl rounded-b-sm"><p className="text-text-invert font-bold text-xl">{total}</p></div>
            <div className="w-16 aspect-square h-auto flex items-center justify-center bg-text-primary rounded-t-sm text-text-invert rounded-b-xl"><CommonIcon type="cart" size="24"/></div>
        </button>
    );
}

export default CartIndicator;