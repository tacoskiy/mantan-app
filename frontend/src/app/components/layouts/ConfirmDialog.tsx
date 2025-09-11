import { ConfirmDialogContent } from "@/app/types/types";
import clsx from "clsx";

interface ConfirmDialogProps{
    isOpen: boolean;
    content: ConfirmDialogContent | null;
}

const ConfirmDialog = ({isOpen, content}:ConfirmDialogProps) => {
    if(!content) return null;
    return(
        <section onClick={content.cancel} className={clsx(
            isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            "w-full h-full fixed bg-blur z-100 transition-all duration-300"
        )}>
            <div onClick={(e) => {e.stopPropagation();}} className="bg-bg-surface w-96 h-auto absolute top-1/2 left-1/2 -translate-1/2 flex flex-col gap-4 items-center p-4 rounded-4xl">
                <div className="flex flex-col gap-4 items-center p-4">
                    <p className="font-semibold text-lg">{content.mainText}</p>
                    {content.subText && <p className="font-semibold text-text-secondary">{content.subText}</p>}
                </div>
                <div className="flex gap-4 items-center justify-center w-full">
                    <button onClick={content.cancel} className="bg-bg-base py-4 px-4 rounded-2xl transition-all duration-300 active:scale-95 active:brightness-95 w-1/2">
                        {content.cancelText}
                    </button>
                    <button onClick={content.confirm} className="bg-primary py-4 px-4 rounded-2xl text-text-invert glow font-bold transition-all duration-300 active:scale-95 active:brightness-95 w-1/2">
                        {content.confirmText}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ConfirmDialog;