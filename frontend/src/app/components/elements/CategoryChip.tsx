import clsx from "clsx";

interface CategoryChipProps{
    context: string;
    selected: boolean;
    onClick: () => void;
}

const CategoryChip = ({context, selected, onClick}:CategoryChipProps) => {
    return(
        <button
            onClick={onClick}
            className={clsx(
                selected
                    ? "bg-primary text-white customshadow-l sc-primary z-10 font-bold"
                    : "bg-bg-surface text-text-secondary z-0",
                "py-4 px-0 rounded-2xl w-full transition-all duration-300 backdrop-blur-xs box-border glow active:scale-85"
            )}
        >{context}</button>
    );
}

export default CategoryChip;