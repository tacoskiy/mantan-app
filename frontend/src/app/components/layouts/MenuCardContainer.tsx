import MenuCard from "../elements/MenuCard";
import { Menu } from "@/app/types/types";

interface MenuCardContainerProps{
    menu: Menu[];
    onCardClick: (menuId: number) => void;
    addToCart: (id: number) => void;
}

const MenuCardContainer = ({menu, onCardClick, addToCart}:MenuCardContainerProps) => {
    return(
        <section className="grid grid-cols-3 gap-3 p-4 pb-64">
            {menu.map((e) => (
                <MenuCard key={e.id} name={e.name} price={e.price} onClick={() => onCardClick(e.id)} addToCart={() => addToCart(e.id)}/>
            ))}
        </section>
    );
}

export default MenuCardContainer;