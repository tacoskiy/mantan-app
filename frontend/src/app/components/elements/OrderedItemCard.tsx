import Image from "next/image";
import { OrderedItemStatus } from "@/app/types/types";
import clsx from "clsx";

interface OrderedItemProps{
    menuName: string;
    status: OrderedItemStatus;
    price: number;
    quantity: number;
}

const OrderedItemCard = ({menuName, status, price, quantity}:OrderedItemProps) => {
    function renderStatus(){
        switch(status){
            case "ordered":
                return <p className="font-bold text-text-secondary">注文を受け付けました</p>
            case "cooking":
                return <p className="font-bold text-secondary">調理中</p>
            case "served":
                return <p className="font-bold text-primary">配膳済み</p>
            default:
                return <p className="font-bold text-secondary">調理中</p>
        }
    }

    return (
        <div className="p-2 flex justify-between items-center border-2 border-border rounded-2xl">
            <div className="flex gap-8 items-center">
                <Image src="/img/menu-placeholder.svg" alt="Menu" width={300} height={200} className="w-24 h-24 object-cover rounded-md"/>
                <div className="flex  flex-col gap-2">
                    <p className="font-bold">{menuName}</p>
                    {renderStatus()}
                </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
                <p className={clsx(
                    "font-bold text-2xl px-4",
                    status === "served"
                        ? "text-text-primary"
                        : "text-text-secondary"
                )}>x{quantity}</p>
                <p className={clsx(
                    "font-bold text-2xl px-4",
                    status === "served"
                        ? "text-text-primary"
                        : "text-text-secondary"
                )}>¥{price}</p>
            </div>
        </div>
    );
}

export default OrderedItemCard;