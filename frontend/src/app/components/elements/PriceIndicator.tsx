interface PriceIndicatorProps{
    price: number;
}

const PriceIndicator = ({price}:PriceIndicatorProps) => {
    return(
        <div className="flex flex-col gap-1 items-start">
            <p className="font-bold text-6xl">¥{price}</p>
            <p className="font-bold text-xl text-text-secondary">¥{price + (price * 0.08)}(税込)</p>
        </div>
    );
}

export default PriceIndicator;