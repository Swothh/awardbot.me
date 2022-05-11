import swr from "../../lib/swr";
import Nav from "../../components/Panel/Nav";
import Create from "../../components/Panel/Create";

export default function Panel() {
    const { data: _user } = swr("https://award-demo.clquu.repl.co/v1/auth/me");
	const user = _user ? _user.data : null;

    const { data: _partners, mutate } = swr("https://award-demo.clquu.repl.co/v1/others/partners");
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
                <h1 className="text-3xl text-white font-bold mt-5">Promocode Create</h1>

            </div>}
        </>
    );
};