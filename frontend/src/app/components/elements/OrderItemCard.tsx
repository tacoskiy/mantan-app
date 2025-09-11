import QuantitySelector from "./QuantitySelector";

interface OrderItemCardProps{
    menuName: string;
    price: number;
    quantity: number;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
}

const OrderItemCard = ({menuName, price, quantity, increaseQuantity, decreaseQuantity}:OrderItemCardProps) => {
    return(
        <article className="flex justify-between items-center w-full border-2 border-border p-2 rounded-xl">
            <div className="flex flex-col justify-between px-1">
                <h3 className="font-bold text-md">{menuName}</h3>
                <p className="font-bold text-md text-text-secondary">¥{price}</p>
            </div>
            <QuantitySelector increase={increaseQuantity} decrease={decreaseQuantity} quantity={quantity}/>
        </article>
    );
}

export default OrderItemCard;