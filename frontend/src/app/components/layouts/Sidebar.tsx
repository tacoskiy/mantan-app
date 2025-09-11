"use client"

import { useRef } from "react";
import CartIndicator from "../elements/CartIndicator";
import OrderItemCard from "../elements/OrderItemCard";
import clsx from "clsx";
import { InCartItem } from "@/app/types/types";

interface SidebarProps {
    inCartItems: InCartItem[];
    increseQuantity: (id: number) => void;
    decreseQuantity: (id: number) => void;
    isOpen: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

const Sidebar = ({ inCartItems, increseQuantity, decreseQuantity, isOpen, onExpand, onCollapse }:SidebarProps) => {
    const startX = useRef<number|null>(null);
    const totalQuantity = inCartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleStart = (clientX: number) => {
        startX.current = clientX;
        window.addEventListener("mousemove", handleMoveMouse);
        window.addEventListener("mouseup", handleEndMouse);
        window.addEventListener("touchmove", handleMoveTouch);
        window.addEventListener("touchend", handleEndTouch);
    };

    const handleMove = (clientX: number) => {
        if (startX.current === null) return;
        const deltaX = clientX - startX.current;

        if (deltaX < -50){
            onExpand();
        } else if (deltaX > 50){
            onCollapse();
        }
    };

    const cleanup = () => {
        startX.current = null;
        window.removeEventListener("mousemove", handleMoveMouse);
        window.removeEventListener("mouseup", handleEndMouse);
        window.removeEventListener("touchmove", handleMoveTouch);
        window.removeEventListener("touchend", handleEndTouch);
    };

    // for mouse
    const handleStartMouse = (e: React.MouseEvent) => handleStart(e.clientX);
    const handleMoveMouse = (e: MouseEvent) => handleMove(e.clientX);
    const handleEndMouse = () => cleanup();

    // for touch screen
    const handleStartTouch = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
    const handleMoveTouch = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const handleEndTouch = () => cleanup();

    return(
        <div className="w-24 h-screen z-50 relative">
            <aside 
                onMouseDown={(e) => handleStartMouse(e)}
                onTouchStart={(e) => handleStartTouch(e)}
                className={clsx(
                    isOpen
                        ? "-translate-x-72 shadow-2xl"
                        : "-translate-x-0",
                    "w-96 h-full bg-bg-surface fixed border-3 rounded-l-4xl border-border flex flex-col gap-8 items-center p-8 transition-all duration-300"
                )}
            >
                <h3 className="text-lg font-bold">カート内の商品</h3>
                <div className="absolute top-36 -left-10">
                    <CartIndicator total={totalQuantity}/>
                </div>
                <ul className="w-full h-full flex flex-col gap-2 overflow-y-scroll no-scrollbar relative pb-64">
                    {inCartItems && inCartItems.length > 0 ? inCartItems.slice().reverse().map((item, index) => (
                        <OrderItemCard key={index} menuName={item.name} price={item.price} quantity={item.quantity} increaseQuantity={() => increseQuantity(item.id)} decreaseQuantity={() => decreseQuantity(item.id)}/>
                    )) : (<p className="text-md font-bold text-text-secondary text-center">カートは空です。<br />メニューから追加してください</p>)}
                </ul>
                <div className="bg-gradient-to-t from-bg-surface to-transparent w-full h-64 fixed bottom-8 left-0 pointer-events-none"/>
            </aside>
        </div>
    );
}

export default Sidebar;