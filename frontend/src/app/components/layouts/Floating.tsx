import clsx from "clsx";

interface FloatingProps{
    isSidebarOpen: boolean;
    isCartEmpty: boolean;
    openHistoryModal: () => void;
    openServiceModal: () => void;
    openCart: () => void;
    confirmOrder: () => void;
}

const Floating = ({isSidebarOpen, openHistoryModal, openServiceModal, openCart, confirmOrder, isCartEmpty}:FloatingProps) => {
    return(
        <nav className="flex justify-between fixed bottom-0 left-0 w-full z-100 items-end bg-gradient-to-t from-bg-surface to-transparent">
            <div className="flex gap-4 px-4 items-end">
                <button onClick={openHistoryModal} className="floating-tab sc-secondary">注文履歴/お会計</button>
                <button onClick={openServiceModal} className="floating-tab sc-secondary py-8!">サービス/店員呼び出し</button>
            </div>
            <div className="p-4">
                <button disabled={isSidebarOpen && isCartEmpty} onClick={isSidebarOpen ? confirmOrder : openCart} className={clsx(
                    isSidebarOpen
                        ? isCartEmpty
                            ? "w-84 bg-inactive sc-inactive active:brightness-95"
                            : "w-84 bg-alert sc-alert active:brightness-95 active:scale-95"
                        : "w-64 bg-primary sc-primary active:brightness-95 active:scale-95",
                    "px-0 py-8 glow rounded-2xl text-text-invert font-bold customshadow-m transition-all duration-300"
                )}>{isSidebarOpen ? "注文を確定" : "カートを確認"}</button>
            </div>
        </nav>
    );
}

export default Floating;