export default function Callback() {
    if (typeof window != "undefined") {
        window.close();
    };
    
    return (
        <div className="flex items-center justify-center">
            <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
        </div>
    );
};