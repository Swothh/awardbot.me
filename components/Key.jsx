export default function Key({ value, light = false }) {
    if (!value) return <></>;
    return <div className="flex items-center justify-center gap-x-1">
        {value.split("+").map((val, index) => (
            <span key={index} className={"keyboard-key leading-none " + (light ? "light" : "dark")}>
                {val && (val == "enter" ? "↩" : (
                    val == "shift" ? "⬆" : val.toUpperCase()
                ))}
            </span>
        ))}
    </div>
};