export interface Category{
    id: number;
    context: string;
    query: string;
}

export interface Menu{
    id: number;
    name: string;
    price: number;
    description?: string;
    category?: string;
    allergen?: string;
}

export interface InCartItem extends Menu{
    quantity: number;
}

export interface OrderedItem extends InCartItem{
    status: OrderedItemStatus;
}

export type ConfirmDialogType = "order" | "delete" | "refillWater" | "refillTea" | "cleanupDishes" | "spilledSomething" | "callStaff" | null;

export interface ConfirmDialogContent{
    mainText: string;
    subText?: string;
    cancelText: string;
    confirmText: string;
    cancel: () => void;
    confirm: () => void;
}

export interface ToastContent{
    id: number;
    message: string;
    type: "success" | "error";
    isActive?: boolean;
}

export type ModalType = "order" | "service" | "history" | "payment" | null;

export type NotifyScreenType = "orderCompleted" | "staffCalled" | "toPayment" | null;

export interface NotifyScreenContent{
    type: NotifyScreenType;
    mainText: string;
    subText?: string;
    hasButton: boolean;
    buttonText?: string;
    onButtonClick: () => void;
}

export type ServiceContent = {
    context: string;
    dialogtype: ConfirmDialogType;
}

export type OrderedItemStatus = "ordered" | "cooking" | "served" | null;

export type ModalAnimationState = "neutral" | "fadeout" | "reset" | "fadein";