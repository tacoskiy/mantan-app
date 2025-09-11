import clsx from "clsx";

interface CommonButtonProps{
    context: string;
    color?: "primary" | "alert" | "secondary";
    invert?: boolean;
    onClick: () => void;
}

const CommonButton = ({ context, color = "primary", invert = false, onClick }:CommonButtonProps) => {
    return (
        <button onClick={onClick} className={clsx(
            invert
                ? "bg-bg-surface"
                : `bg-${color}`,
            "p-4 rounded-md transition-all duration-300 active:scale-98 active:brightness-95",
        )}>
            <p className={clsx(
                invert
                    ? `text-${color}`
                    : "text-text-invert",
                "font-bold text-md"
            )}>{context}</p>
        </button>
    );
}

export default CommonButton;