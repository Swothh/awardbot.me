
import Main from "../../../components/Account/Connections";
import { useRouter } from "next/router";
import swr from "../../../lib/swr";

export default function Connections({ $ }) {
    
    const { data: _user } = swr("https://api.awardbot.me/v1/auth/me");
	const user = _user ? _user.data : null;

    const defaultResponse = <div className="p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
        <div className="flex col-span-5 items-center justify-center">
            <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
        </div>
    </div>;


    if (_user) {
        if (!user) {
            return defaultResponse;
        }
    };

    return (
        <div className="py-5 lg:py-10 w-full">
            {!_user ? <div className="flex col-span-6 items-center justify-center">
                <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
            </div> : <>
                <Main $={$} user={user} />
            </>}
        </div>
    );
};