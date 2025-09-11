"use client";

import { useMemo, useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import CategoryBar from "../components/layouts/CategoryBar";
import MenuCardContainer from "../components/layouts/MenuCardContainer";
import Modal, { HistoryModalContent, OrderModalContent, PaymentModalContent, ServiceModalContent } from "../components/layouts/Modal";
import Spacer from "../components/utils/Spacer";
import { Category, ConfirmDialogContent, Menu, InCartItem, ToastContent, ModalType, NotifyScreenType, ConfirmDialogType, NotifyScreenContent, OrderedItem } from "@/app/types/types";
import ConfirmDialog from "../components/layouts/ConfirmDialog";
import NotifyScreen from "../components/layouts/NotifyScreen";
import Toast from "../components/layouts/Toast";
import Floating from "../components/layouts/Floating";
import SplashScreen from "../components/layouts/SplashScreen";
import { menuData } from "../data/menu";

const TabletPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [inCartItems, setInCartItems] = useState<InCartItem[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<Menu>();
    const [orderedItems, setOrederedItems] = useState<OrderedItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [peopleCount, setPeopleCount] = useState<number>(1);
    const [isSplashVisible, setSplashVisible] = useState<boolean>(true);

    const modal = useModalState();
    const confirmDialog = useConfirmDialogState();
    const notifyScreen = useNotifyScreenState();
    const toasts = useToastsState();
    const drawer = useDrawerState();

    const categories : Category[] = [
        {id: 0, context: "すべて", query: ""},
        {id: 1, context: "お肉", query: "meat"},
        {id: 2, context: "お魚", query: "fish"},
        {id: 3, context: "サラダ", query: "salad"},
        {id: 4, context: "ドリンク", query: "drink"},
        {id: 5, context: "その他", query: "other"},
        {id: 6, context: "カトラリー", query: "cutlery"},
    ]

    const menu: Menu[] = useMemo(() => menuData, []);

    const getDialogContent = (type: ConfirmDialogType) : ConfirmDialogContent | null => {
        switch (type){
            case "order":
                return {
                    mainText: `${selectedMenu?.name}を注文しますか？`,
                    subText: "カートに入れることなく直接注文します",
                    cancel: confirmDialog.close,
                    confirm: () => staffCall(),
                    cancelText: "キャンセル",
                    confirmText: "注文する"
                }
            case "delete":
                return {
                    mainText: `${selectedMenu?.name}をカートから削除しますか？`,
                    cancel: confirmDialog.close,
                    confirm: () => staffCall(),
                    cancelText: "キャンセル",
                    confirmText: "削除"
                }
            case "refillWater":
                return {
                    mainText: `お水の追加を頼みますか?`,
                    cancel: confirmDialog.close,
                    confirm: () => staffCall(),
                    cancelText: "いいえ",
                    confirmText: "はい"
                }
            case "refillTea":
                return {
                    mainText: `お茶の追加を頼みますか?`,
                    cancel: confirmDialog.close,
                    confirm: () => staffCall(),
                    cancelText: "いいえ",
                    confirmText: "はい"
                }
            case "cleanupDishes":
                return {
                    mainText: `食器を片付けてもよろしいですか?`,
                    subText: "食べ終わった食器のみを片付けます",
                    cancel: confirmDialog.close,
                    confirm: () => staffCall(),
                    cancelText: "いいえ",
                    confirmText: "はい"
                }
            case "spilledSomething":
                return {
                    mainText: `テーブルの掃除を頼みますか?`,
                    cancel: confirmDialog.close,
                    confirm: () => staffCall(),
                    cancelText: "いいえ",
                    confirmText: "はい"
                }
            case "callStaff":
                return {
                    mainText: `テーブルに店員を呼びますか?`,
                    subText: "少々お時間をいただく場合がございます",
                    cancel: confirmDialog.close,
                    confirm: () => staffCall(),
                    cancelText: "いいえ",
                    confirmText: "はい"
                }
            default:
                return null;
        }
    }

    const getNotifyContent = (type: NotifyScreenType) : NotifyScreenContent | null =>{
        switch (type){
            case "orderCompleted":
                return {
                    type: "orderCompleted",
                    mainText: "注文が完了しました",
                    subText: "しばらくお待ちください",
                    hasButton: true,
                    onButtonClick: clearState,
                }
            case "staffCalled":
                return {
                    type: "staffCalled",
                    mainText: "ただいま店員が参ります",
                    subText: "しばらくお待ちください",
                    hasButton: true,
                    onButtonClick: clearState,
                }
            case "toPayment":
                return {
                    type: "toPayment",
                    mainText: "お会計の準備ができました",
                    subText: "レジへお進みください",
                    hasButton: false,
                    onButtonClick: clearState,
                }
            default:
                return null
        }
    }

    // Overlay component functions

    function useModalState(){
        const [state, setState] = useState<{type: ModalType; isOpen: boolean}>({
            type: null,
            isOpen: false
        });
        
        const open = (type: ModalType) => {
            setState({type: type, isOpen: true});
        }

        const change = (type: ModalType) => {
            setState(prev => ({...prev, type: type}));
        }

        const close = () => {
            setState(prev => ({...prev, isOpen: false}));
        }

        return {state, open, close, change};
    }

    function useConfirmDialogState(){
        const [state, setState] = useState<{content: ConfirmDialogContent | null; isOpen: boolean}>({
            content: null,
            isOpen: false
        });

        const open = (type: ConfirmDialogType) => {
            setState({content: getDialogContent(type), isOpen: true})
        }

        const close = () => {
            setState(prev => ({...prev, isOpen: false}));
        }

        return {state, open, close}
    }

    function useNotifyScreenState(){
        const [state, setState] = useState<{content: NotifyScreenContent | null; isOpen: boolean}>({
            content: null,
            isOpen: false
        });

        const open = (type: NotifyScreenType) => {
            setState({content: getNotifyContent(type), isOpen: true});
        }

        const close = () => {
            setState(prev => ({...prev, isOpen: false}));
        }

        return {state, open, close};
    }

    function useToastsState(){
        const [items, setItems] = useState<ToastContent[]>([]);
        const MAX_COUNTS = 3;

        const add = (message: string, type: ToastContent["type"] = "success") => {
            const id = Date.now() + Math.random();
            setItems((prev) => {
                const newItems = [
                    ...prev.map((item) => ({ ...item, isActive: false })),
                    { id, message, type, isActive: true }
                ]

                if (newItems.length > MAX_COUNTS){
                    return newItems.slice(newItems.length - MAX_COUNTS);
                }

                return newItems;
            });
            setTimeout(() => {
                setItems((prev) => prev.map((item) =>
                    item.id === id ? { ...item, isActive: false } : item
                ));
            }, 3000);
        }

        return {items, add};
    }

    function useDrawerState(){
        const [isExpanded, setExpanded] = useState<boolean>(false);

        const open = () => {
            setExpanded(true);
        }

        const close = () => {
            setExpanded(false);
        }

        return {isExpanded, open, close};
    }

    // Calcuarate functions
    
    const filteredMenu = useMemo(() => {
        if (selectedCategory === "") return menu;
        return menu.filter((item) => {
        const cat = item.category ?? "other";
        return cat.includes(selectedCategory);
        });
    }, [menu, selectedCategory])

    function handleMenuCardClick(id: number){
        modal.open("order");
        setSelectedMenu(menu.find(item => item.id === id));
    }

    function addInCartItem(id: number){
        const menuItem = menu.find(item => item.id === id);
        if (!menuItem) return;
        
        const newCartItem: InCartItem = {
            ...menuItem,
            quantity: 1,
        }

        setInCartItems(prevItems => {
            const existItem = prevItems.find(item => item.id === id);

            if (existItem){
                if (existItem.quantity >= 5) {
                    toasts.add("同じ商品は5つまで登録できます", "error");
                    return [...prevItems]
                } else {
                    toasts.add(`${menuItem?.name}の数量を${existItem.quantity + 1}に変更しました`)
                }
                return prevItems.map(item =>item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
            } else {
                toasts.add(`${menuItem?.name}をカートに追加しました`);
                return [...prevItems, newCartItem];
            }
        });

        modal.close();
    }

    function orderItemIncrease(id: number){
        setInCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    function orderItemDecrease(id: number){
        setInCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    }

    function orderInCartItems () {
        const newOrderedItems : OrderedItem[] = inCartItems.map((item) => ({
            ...item,
            status: "ordered"
        }));

        const total = inCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        setOrederedItems((prev) => ([...prev, ...newOrderedItems]));
        notifyScreen.open("orderCompleted");
        setTotalAmount(prev => (prev + total))
        setInCartItems([]);
    }

    function orderDirectry(){
        notifyScreen.open("orderCompleted");
    }

    function staffCall(){
        notifyScreen.open("staffCalled");
    }

    function clearState(){
        modal.close();
        confirmDialog.close();
        notifyScreen.close();
    }

    // service modal function

    function handleServiceButtonClick(dialogType: ConfirmDialogType){
        confirmDialog.open(dialogType);
    }

    return(
        <div className="flex">
            <main onClick={drawer.close} className="w-full z-10">
                <CategoryBar category={categories} onSelect={(query) => setSelectedCategory(query)}/>
                <MenuCardContainer menu={filteredMenu} onCardClick={(id) => handleMenuCardClick(id)} addToCart={(id) => addInCartItem(id)}/>
                <Spacer size="100px"/>
            </main>
            <Sidebar isOpen={drawer.isExpanded} onExpand={drawer.open} onCollapse={drawer.close} inCartItems={inCartItems} increseQuantity={(id) => orderItemIncrease(id)} decreseQuantity={(id) => orderItemDecrease(id)}/>
            <Floating isCartEmpty={inCartItems.length === 0} isSidebarOpen={drawer.isExpanded} openCart={drawer.open} confirmOrder={() => orderInCartItems()} openHistoryModal={() => modal.open("history")} openServiceModal={() => modal.open("service")}/>
            <Modal isOpen={modal.state.isOpen} closeModal={() => modal.close()} expand={modal.state.type !== "order"}>
                {(() => {
                    switch(modal.state.type){
                        case "order":
                            return selectedMenu && <OrderModalContent content={selectedMenu} addToCart={() => addInCartItem(selectedMenu.id)} orderDirectry={() => confirmDialog.open("order")}/>
                        case "service":
                            return <ServiceModalContent onServiceButtonClick={(type) => handleServiceButtonClick(type)} onCutleryButtonClick={() => {}}/>
                        case "history":
                            return <HistoryModalContent toPayment={() => modal.change("payment")} totalAmount={totalAmount} orderedItems={orderedItems}/>
                        case "payment":
                            return <PaymentModalContent totalAmount={totalAmount} peopleCount={peopleCount} peopleCountIncrease={() => setPeopleCount(prev => prev + 1)} peopleCountDecrease={() => setPeopleCount(prev => prev - 1)} cancel={modal.close} confirmPayment={() => notifyScreen.open("toPayment")}/>
                        default:
                            return <p className="text-alert">Cant find ModalContent error</p>
                    }
                })()}
            </Modal>
            <ConfirmDialog isOpen={confirmDialog.state.isOpen} content={confirmDialog.state.content}/>
            {toasts.items.map((item) => (
                <Toast key={item.id} id={item.id} context={item.message} type={item.type} isActive={item.isActive!}/>
            ))}
            <NotifyScreen content={notifyScreen.state.content} isOpen={notifyScreen.state.isOpen} />
            <SplashScreen peopleCount={peopleCount} isVisible={isSplashVisible} start={() => setSplashVisible(false)} peopleCountIncrease={() => setPeopleCount(prev => prev + 1)} peopleCountDecrease={() => setPeopleCount(prev => prev - 1)}/>
        </div>
    );
}

export default TabletPage;