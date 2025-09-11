interface SpacerProps{
    size: string;
    
}

const Spacer = ({size}:SpacerProps) => {
    return(
        <div className="w-full" style={{ height: size }}></div>
    );
}

export default Spacer;