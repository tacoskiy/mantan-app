import Image from "next/image";
import CommonIcon from "../utils/CommonIcon";

interface MenuCardProps{
    name: string;
    price: number;
    onClick: () => void;
    addToCart: () => void;
}

const MenuCard = ({name, price, onClick, addToCart}:MenuCardProps) => {
    return(
        <article onClick={onClick} className="bg-bg-surface p-3 flex flex-col gap-3 rounded-2xl relative active:scale-96 active:brightness-97 transition-all duration-300 glow">
            <Image src="/img/menu-placeholder.svg" alt="Menu" width={300} height={200} className="w-full h-50 object-cover rounded-md"/>
            <div className="flex flex-col gap-4 p-2">
                <h3 className="font-bold text-2xl">{name}</h3>
                <p className="font-bold text-2xl text-text-secondary">¥{price}</p>
            </div>
            <button onClick={(e) => {
                e.stopPropagation();
                addToCart();
            }} className="flex items-center gap-2 absolute right-3 bottom-3 bg-bg-surface p-2 border-2 border-primary rounded-xl text-primary transition-all duration-300 active:bg-primary active:text-text-invert">
                <CommonIcon type="plus" color="text-invert" size="30px"/>
                <p className="font-bold">カートに追加</p>
            </button>
        </article>
    );
}

export default MenuCard;