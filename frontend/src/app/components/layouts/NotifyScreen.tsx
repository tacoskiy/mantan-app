import { NotifyScreenContent } from "@/app/types/types";
import clsx from "clsx";

interface NotifyScreenProps{
    content: NotifyScreenContent | null;
    isOpen: boolean;
}

const NotifyScreen = ({content, isOpen}:NotifyScreenProps) => {
    if (!content) return null;
    return(
        <section className={clsx(
            "fixed top-0 left-0 bg-bg-surface w-full h-full z-100 flex flex-col gap-24 items-center justify-center transition-all duration-300 delay-100",
            isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
        )}>
            <div className="flex flex-col gap-8 items-center">
                <p className="font-bold text-5xl text-primary">{content.mainText}</p>
                {content.subText && <p className="font-bold text-4xl text-primary opacity-75">{content.subText}</p>}
            </div>
            {content.hasButton && <button onClick={content.onButtonClick} className="px-24 py-12 rounded-2xl bg-primary text-text-invert font-bold text-2xl transition-all duration-300 active:scale-95 active:brightness-95">{content.buttonText ?? "この画面を閉じる"}</button>}
        </section>
    );
}

export default NotifyScreen;