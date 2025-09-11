import Image from "next/image";
import PeopleCounter from "../elements/PeopleCounter";
import clsx from "clsx";

interface SplashScreenProps{
    start: () => void;
    peopleCount: number;
    peopleCountIncrease: () => void;
    peopleCountDecrease: () => void;
    isVisible: boolean;
}

const SplashScreen = ({start, peopleCount, peopleCountIncrease, peopleCountDecrease, isVisible}:SplashScreenProps) => {
    return (
        <section className={clsx(isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none", "bg-bg-surface w-full h-screen fixed z-100 flex justify-center items-center transition-all duration-300")}>
            <div className="flex justify-center items-center gap-24 h-84">
                <div className="flex flex-col gap-8 items-center">
                    <PeopleCounter peopleCount={peopleCount} peopleCountIncrease={peopleCountIncrease} peopleCountDecrease={peopleCountDecrease} />
                    <button onClick={start} className={clsx(
                        "w-80 py-8 glow rounded-2xl text-text-invert font-bold customshadow-m transition-all duration-300 bg-primary sc-primary active:brightness-95 active:scale-95"
                    )}>注文をスタート</button>
                </div>
                <div className="border-primary border-1 h-full w-0"></div>
                <div className="flex flex-col gap-8">
                    <p className="text-7xl font-bold text-primary">ようこそ!!</p>
                    <p className="text-xl font-bold text-primary">人数を選択し、スタートを押してください</p>
                </div>
            </div>
            <Image src="/img/logo.svg" alt="Menu" width={300} height={200} className="w-auto h-24 object-cover rounded-md absolute bottom-6 left-1/2 -translate-1/2 opacity-50"/>
        </section>
    );
}

export default SplashScreen;