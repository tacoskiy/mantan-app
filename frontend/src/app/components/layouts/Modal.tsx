import { ConfirmDialogType, Menu, OrderedItem, ServiceContent } from "@/app/types/types";
import clsx from "clsx";
import { ReactNode } from "react";
import Image from "next/image";
import CommonIcon from "../utils/CommonIcon";
import PriceIndicator from "../elements/PriceIndicator";
import OrderButtonSet from "../elements/OrderButtonSet";
import CommonButton from "../elements/CommonButton";
import OrderedItemCard from "../elements/OrderedItemCard";
import PeopleCounter from "../elements/PeopleCounter";

interface ModalProps{
    children: ReactNode;
    isOpen: boolean;
    expand?: boolean;
    closeModal: () => void;
}

const Modal = ({children, isOpen, closeModal}:ModalProps) => {
    return (
        <section onClick={closeModal} className={clsx(
            isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            "w-full h-screen bg-blur fixed z-100 transition-opacity duration-300",
            // expand
            //     ? "py-24"
            //     : "py-48"
        )}>
            <div className="w-fit h-fit bg-bg-surface absolute top-1/2 left-1/2 -translate-1/2 rounded-2xl p-4" onClick={(e) => {e.stopPropagation();}}>
                {children}
                <button onClick={closeModal} className="w-16 h-16 bg-alert text-text-invert rounded-r-xl absolute top-8 -right-16 active:w-20 active:-right-20 active:brightness-75 transition-all duration-300">
                    <CommonIcon type="cancel" color="text-invert" size="32"/>
                </button>
            </div>
        </section>
    );
}

// Modal Children

interface OrderModalProps{
    content: Menu;
    addToCart: () => void;
    orderDirectry: () => void;
}

const OrderModalContent = ({content, addToCart, orderDirectry}:OrderModalProps) => {
    const allergenList = content.allergen?.split(" ");
    
    return (
        <article className="flex gap-4 h-fit w-200">
            <div className="relative h-96 w-64 overflow-clip rounded-md">
                <Image fill src="/img/menu-placeholder.svg" alt="" className="object-cover w-24 h-full bg-primary"/>
            </div>
            <div className="p-2 flex flex-col w-full justify-between">
                <div className="flex flex-col gap-2 w-full">
                    <h2 className="font-bold text-2xl">{content.name}</h2>
                    <p>{content.description}</p>
                    <ul className="flex gap-1">
                        {
                            allergenList?.map((item, index) => (
                                <div key={index} className="py-2 px-3 rounded-full bg-bg-base w-fit font-bold text-sm">
                                    {item}
                                </div>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex justify-between w-full">
                    <PriceIndicator price={content.price}/>
                    <OrderButtonSet  addToCart={addToCart} orderDirectry={orderDirectry}/>
                </div>
            </div>
        </article>
    );
}

interface ServiceModalProps{
    onServiceButtonClick: (dialogType: ConfirmDialogType) => void;
    onCutleryButtonClick: () => void;
}

const ServiceModalContent = ({ onCutleryButtonClick, onServiceButtonClick }:ServiceModalProps) => {
    const services : ServiceContent[] = [
        {context: "お水を追加", dialogtype: "refillWater"},
        {context: "お茶を追加", dialogtype: "refillTea"},
        {context: "食器の片付け", dialogtype: "cleanupDishes"},
        {context: "何かをこぼしてしまった", dialogtype: "spilledSomething"},
    ]

    return (
        <article className="flex flex-col gap-4 w-200 justify-center items-center h-130">
            <div className="p-4 h-fit">
                <h2 className="font-bold block">何かお手伝いできますか?</h2>
            </div>
            <div className="flex gap-4 w-full h-full">
                <div className="bg-primary w-full rounded-lg text-text-invert flex flex-col p-4 gap-2 h-full">
                    <div className="flex flex-col gap-4 items-center px-12 h-full justify-center">
                        <CommonIcon type={"water"} size="64"/>
                        <p className="font-bold text-xl">サービス</p>
                    </div>
                    {services.map((item, index) => (
                        <CommonButton key={index} context={item.context} onClick={() => onServiceButtonClick(item.dialogtype)} invert={true}/>
                    ))}
                </div>
                <div className="w-full flex flex-col gap-4 h-auto">
                    <div className="bg-bg-base h-full rounded-lg text-primary flex flex-col p-4">
                        <div className="flex gap-4 items-center px-12 h-full justify-center">
                            <CommonIcon type={"cutlery"} size="64"/>
                            <p className="font-bold text-xl">カトラリー</p>
                        </div>
                        <CommonButton context={"食器の注文はこちらから"} onClick={onCutleryButtonClick} invert={false}/>
                    </div>
                    <div className="bg-bg-base h-full rounded-lg text-secondary flex flex-col p-4">
                        <div className="flex gap-4 items-center px-12 h-full justify-center">
                            <CommonIcon type={"callStaff"} size="64"/>
                            <p className="font-bold text-xl">その他</p>
                        </div>
                        <CommonButton color="secondary" context={"店員を呼ぶ"} onClick={() => onServiceButtonClick("callStaff")} invert={false}/>
                    </div>
                </div>
            </div>
        </article>
    );
}

interface HistoryModalProps{
    totalAmount: number;
    orderedItems: OrderedItem[];
    toPayment: () => void;
}

const HistoryModalContent = ({totalAmount, orderedItems, toPayment}:HistoryModalProps) => {
    return (
        <article className="flex h-130 w-200 gap-4">
            <div className="flex-7 rounded-2xl relative z-0">
                <ul className="flex flex-col gap-2 overflow-scroll h-full no-scrollbar relative pb-64">
                    {orderedItems.length > 0 
                        ? orderedItems.map((item, index) => <OrderedItemCard key={index} menuName={item.name} status={item.status} price={item.price * item.quantity} quantity={item.quantity}/>)
                        : <p className="p-8 w-full font-bold text-center text-text-secondary">まだ何も注文されていません</p>
                    }
                </ul>
                <div className="bg-gradient-to-t from-bg-surface to-transparent w-full h-64 absolute bottom-0 left-0 pointer-events-none"/>
            </div>
            <div className="flex-4 flex flex-col justify-between relative z-10">
                <div className="flex flex-col gap-2 p-4">
                    <p className="font-bold">合計金額</p>
                    <p className="text-secondary font-bold text-5xl">¥{totalAmount}</p>
                </div>
                <button disabled={orderedItems.length === 0} onClick={toPayment} className={clsx(
                    orderedItems.length === 0
                        ? "bg-inactive sc-inactive active:brightness-95"
                        : "bg-primary sc-primary active:brightness-95 active:scale-95",
                    "w-full px-0 py-8 glow rounded-2xl text-text-invert font-bold customshadow-m transition-all duration-300"
                )}>{orderedItems.length === 0 ? "商品を注文してください" : "お会計へ進む"}</button>
            </div>
        </article>
    );
}

interface PaymentModalProps{
    totalAmount: number;
    peopleCount: number;
    peopleCountIncrease: () => void;
    peopleCountDecrease: () => void;
    cancel: () => void;
    confirmPayment: () => void;
}

const PaymentModalContent = ({totalAmount, peopleCount, peopleCountIncrease, peopleCountDecrease, cancel, confirmPayment}:PaymentModalProps) => {
    function splitBill(total: number, people: number, roundUnit = 100) {
        const perPerson = Math.floor(total / people / roundUnit) * roundUnit;
        const totalCollected = perPerson * people;
        const organizerPays = total - totalCollected;

        return {
            perPerson,
            organizerPays
        };
    }


    return (
        <article className="w-full h-full flex flex-col gap-12 justify-between">
            <div className="flex flex-col gap-12 w-200 h-fit">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2 p-4 flex-4">
                            <p className="font-bold text-text-secondary">合計金額</p>
                            <p className="text-secondary font-bold text-6xl">¥{totalAmount}</p>
                    </div>
                    <PeopleCounter peopleCount={peopleCount} peopleCountIncrease={peopleCountIncrease} peopleCountDecrease={peopleCountDecrease} />
                </div>
                <div className={
                    clsx(
                        "flex items-center w-full h-24 overflow-visible transition-all duration-300",
                        peopleCount === 1
                            ? "h-0! opacity-0"
                            : "h-24! opacity-100"
                    )
                }>
                    <div className={
                        clsx(
                            "h-24 bg-primary rounded-l-2xl rounded-r-md text-center border-2 border-primary flex flex-col justify-center overflow-hidden transition-all duration-300",
                            splitBill(totalAmount, peopleCount).organizerPays === 0
                                ? "w-0! border-none! opacity-0"
                                : "w-full! mr-2 opacity-100"
                        )
                    }>
                        <p className="font-bold text-text-invert whitespace-nowrap w-full text-center">幹事様:<span className="font-bold text-2xl px-2">¥{splitBill(totalAmount, peopleCount).organizerPays + splitBill(totalAmount, peopleCount).perPerson}</span></p><p className="whitespace-nowrap w-full text-center font-bold text-text-invert">（ 端数を含みます ）</p>
                    </div>
                    <div className={
                        clsx(
                            "w-full h-24 bg-bg-surface px-4 rounded-r-2xl rounded-l-md text-center border-2 border-primary flex flex-col justify-center transition-all duration-300",
                            splitBill(totalAmount, peopleCount).organizerPays === 0
                                ? "rounded-l-2xl!"
                                : "rounded-l-md"
                        )
                    }><p className="font-bold text-primary">{
                        splitBill(totalAmount, peopleCount).organizerPays === 0
                                ? "おひとり様当たり:"
                                : "その他のお客様:"
                    }<span className="font-bold text-2xl px-2">¥{splitBill(totalAmount, peopleCount).perPerson}</span></p></div>
                </div>
            </div>
            <div className={clsx(
                "w-full border-1 border-border",
                peopleCount === 1
                            ? "opacity-0"
                            : "opacity-100"
            )}></div>
            <div className="flex justify-between gap-12">
                <button onClick={cancel} className={clsx(
                    "flex-4 px-0 py-8 rounded-2xl text-text-primary font-bold customshadow-m transition-all duration-300 bg-bg-base active:brightness-95 active:scale-95"
                )}>まだ注文する</button>
                <button onClick={confirmPayment} className={clsx(
                    "flex-5 px-0 py-8 glow rounded-2xl text-text-invert font-bold customshadow-m transition-all duration-300 bg-secondary sc-secondary active:brightness-95 active:scale-95"
                )}>お会計を確定</button>
            </div>
        </article>
    );
}

export default Modal;

export {OrderModalContent, ServiceModalContent, HistoryModalContent, PaymentModalContent};