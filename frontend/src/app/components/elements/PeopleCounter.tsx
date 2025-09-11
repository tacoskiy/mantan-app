import CommonIcon from "../utils/CommonIcon";
import clsx from "clsx";

interface PeopleCounterProps{
    peopleCount: number;
    peopleCountIncrease: () => void;
    peopleCountDecrease: () => void;
}

const PeopleCounter = ({peopleCount, peopleCountIncrease, peopleCountDecrease}:PeopleCounterProps) => {
    return (
        <div className="bg-bg-base flex justify-between w-80 h-32 p-1 rounded-2xl items-center">
            <button onClick={peopleCount > 1 ? peopleCountDecrease : () => {}} className={clsx(
                "bg-primary h-full p-4 text-text-invert rounded-l-xl rounded-r-md transition-all duration-300 active:scale-95 active:brightness-95",
                peopleCount <= 1 && "bg-bg-surface! text-text-secondary"
            )}><CommonIcon size="24" type="minus"/></button>
            <div className="flex flex-col items-center gap-2">
                <p className="text-primary font-bold text-md">テーブル人数</p>
                <p className="text-primary font-bold text-4xl">{peopleCount}人</p>
            </div>
            <button onClick={peopleCount < 20 ? peopleCountIncrease : () => {}} className={clsx(
                "bg-primary h-full p-4 text-text-invert rounded-r-xl rounded-l-md transition-all duration-300 active:scale-95 active:brightness-95",
                peopleCount >= 20 && "bg-bg-surface! text-text-secondary"
            )}><CommonIcon size="24" type="plus"/></button>
        </div>
    );
}

export default PeopleCounter;