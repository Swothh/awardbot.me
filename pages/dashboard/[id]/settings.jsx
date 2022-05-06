import Sidebar from "../../../components/Dashboard/Static/Sidebar";
import Main from "../../../components/Dashboard/Index/Settings";
import { useRouter } from "next/router";
import swr from "../../../lib/swr";

export default function Dashboard({ $ }) {
    const { id } = useRouter().query;
    const { data: _user } = swr("https://awardbot-demo.herokuapp.com/v1/auth/me");
	const user = _user ? _user.data : null;

    const { data: _guild } = swr("https://awardbot-demo.herokuapp.com/v1/guilds/" + id + "/check");
    const guild = _guild ? _guild.data : null;

    const { data: _boost } = swr("https://awardbot-demo.herokuapp.com/v1/boost/" + id, "post");
    const boost = _boost ? _boost.data : null;

    const defaultResponse = <div className="p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
        <div className="flex col-span-5 items-center justify-center">
            <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
        </div>
    </div>;

    const errResponse = <div className="p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
        <div className="flex col-span-5 gap-x-4 items-center justify-center">
            <i className="fal fa-bug text-rose-400 text-2xl" />
            <h1 className="text-rose-200">You are not authorized to manage this server!</h1>
        </div>
    </div>;

    if (_user && _guild && _boost) {
        if (!user || !guild || !boost) {
            return defaultResponse;
        } else if (guild && user) {
            let findGuild = user.guilds.find(g => g.id == guild.id);
            if (!findGuild || !findGuild.permissions.find(_p => _p == "MANAGE_GUILD")) return errResponse;
        };
    };

    return (
        <div className="p-5 lg:p-10 w-full lg:grid lg:grid-cols-6 gap-8">
            {!_user || !_guild ? <div className="flex col-span-6 items-center justify-center">
                <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
            </div> : <>
                <Sidebar $={$} guild={guild} />
                <div className="col-span-5 pt-5 lg:pt-0 lg:pl-20 w-full">
                    <Main $={$} boost={boost} guild={guild} user={user} />
                </div>
            </>}
        </div>
    );
};