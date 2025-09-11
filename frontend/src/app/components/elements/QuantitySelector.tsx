import clsx from "clsx";
import CommonIcon from "../utils/CommonIcon";

interface QuantitySelectorProps{
    quantity: number;
    increase: () => void;
    decrease: () => void;
}

const QuantitySelector = ({quantity, increase, decrease}:QuantitySelectorProps) => {
    return(
        <div className="flex items-center gap-4 bg-bg-base p-1 rounded-full h-fit">
            <button
                onClick={
                    quantity > 0 ? decrease : () => {}
                }
                className={
                    clsx(
                        quantity > 0
                            ? "bg-primary text-text-invert"
                            : "bg-alert text-text-invert",
                        "flex items-center justify-center w-8 aspect-square rounded-full active:scale-90 transition-all duration-150"
                    )
                }
            >
                {quantity > 0 ? <CommonIcon type="minus"/> : <CommonIcon type="trash"/>}
            </button>
            <p className="font-bold">{quantity}</p>
            <button
                onClick={
                    quantity < 5 ? increase : () => {}
                }
                className={
                    clsx(
                        quantity < 5
                            ? "bg-primary text-text-invert"
                            : "bg-bg-surface text-text-secondary",
                        "flex items-center justify-center w-8 aspect-square rounded-full active:scale-90 transition-all duration-150"
                    )
                }>
                <CommonIcon type="plus" color="" size="24px"/>
            </button>
        </div>
    );
}

export default QuantitySelector;