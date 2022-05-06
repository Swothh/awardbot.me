import swr from "../../lib/swr";
import Nav from "../../components/Panel/Nav";

export default function Panel() {
    const { data: _user } = swr("https://awardbot-demo.herokuapp.com/v1/auth/me");
	const user = _user ? _user.data : null;

    const { data: _partners, mutate } = swr("https://awardbot-demo.herokuapp.com/v1/others/partners");
    const partners = _partners ? _partners.data : null;

    return (
        <>
            {(!_user || !user || !_partners || !partners) && <div className="sm:my-10 p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
                <div className="flex col-span-5 items-center justify-center">
                    <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
                </div>
            </div>}
            {(user && partners && !user.permissions.some(_p => _p == "*" || _p == "VIEW_PANEL")) && <div className="sm:my-10 p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
                <div className="flex col-span-5 items-center justify-center">
                    <i className="fa fa-times text-rose-400 text-2xl" />
                    <h6 className="text-rose-400 ml-2">You are not authorized to view this page!</h6>
                </div>
            </div>}
            {(user && partners && user.permissions.some(_p => _p == "*" || _p == "VIEW_PANEL")) && <div className="w-full mt-10">
                <Nav />
                <h1 className="text-3xl text-white font-bold mt-5">Home</h1>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-2 md:gap-4">
                    <div className="bg-gradient-to-bl from-rose-600/20 p-3 rounded-xl flex items-center justify-between">
                        <div>
                            <h1 className="text-sm text-zinc-300 italic">Partners Count</h1>
                            <h6 className="text-2xl text-white font-semibold">{partners.length}</h6>
                        </div>
                        <i className="far fa-handshake rotate-12 text-white/10 text-5xl lg:text-6xl" />
                    </div>
                    <div className="bg-gradient-to-bl from-sky-600/20 p-3 rounded-xl flex items-center justify-between">
                        <div>
                            <h1 className="text-sm text-zinc-300 italic">-</h1>
                            <h6 className="text-2xl text-white font-semibold">-</h6>
                        </div>
                        <i className="far fa-users rotate-12 text-white/10 text-5xl lg:text-6xl" />
                    </div>
                    <div className="bg-gradient-to-bl from-amber-600/20 p-3 rounded-xl flex items-center justify-between">
                        <div>
                            <h1 className="text-sm text-zinc-300 italic">-</h1>
                            <h6 className="text-2xl text-white font-semibold">-</h6>
                        </div>
                        <i className="far fa-users rotate-12 text-white/10 text-5xl lg:text-6xl" />
                    </div>
                    <div className="bg-gradient-to-bl from-emerald-600/20 p-3 rounded-xl flex items-center justify-between">
                        <div>
                            <h1 className="text-sm text-zinc-300 italic">-</h1>
                            <h6 className="text-2xl text-white font-semibold">-</h6>
                        </div>
                        <i className="far fa-users rotate-12 text-white/10 text-5xl lg:text-6xl" />
                    </div>
                </div>
            </div>}
        </>
    );
};