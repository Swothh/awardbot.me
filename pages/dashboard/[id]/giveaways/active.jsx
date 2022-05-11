import Link from 'next/link';
import Sidebar from "../../../../components/Dashboard/Static/Sidebar";
import TypeFilter from "../../../../components/Dashboard/Giveaways/TypeFilter";
import { useRouter } from "next/router";
import swr from "../../../../lib/swr";


const Giveaways = ({ $ }) => {
    const { id } = useRouter().query;
    const { data: _user } = swr("https://award-demo.clquu.repl.co/v1/auth/me");
    const user = _user ? _user.data : null;

    const { data: _guild } = swr("https://award-demo.clquu.repl.co/v1/guilds/" + id + "/check");
    const guild = _guild ? _guild.data : null;

    const { data: _stats } = swr("https://award-demo.clquu.repl.co/v1/guilds/" + id + "/stats");
    const stats = _stats ? _stats.data : null;

    const { data: _giveaways } = swr("https://award-demo.clquu.repl.co/v1/giveaway/list?id=" + id);
    const giveaways = _giveaways ? _giveaways.data : null;

    const defaultResponse = <div className="p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
        <div className="flex col-span-5 items-center justify-center">
            <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
        </div>
    </div>;

    if (_user && _guild) {
        if (!user || !guild || !giveaways) {
            return defaultResponse;
        } else if (guild && user) {
            let findGuild = user.guilds.find(g => g.id == guild.id);
            if (!findGuild || !findGuild.permissions.find(_p => _p == "MANAGE_GUILD")) return defaultResponse;
        };
    };

    return <>
        <div className="p-5 lg:p-10 w-full lg:grid lg:grid-cols-6 gap-8">
            {!_user || !_guild || !stats ? <div className="flex col-span-6 items-center justify-center">
                <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
            </div> : <>
                <Sidebar $={$} guild={guild} />
                <div className="col-span-5 pt-5 lg:pt-0 lg:pl-20 w-full">
                <TypeFilter 
                        $={$}
                        title="Active Giveaways" 
                        description="Here, your completed giveaways are listed."
                        giveaways={giveaways}
                        id={id}
                        type="CONTINUES"
                    />
                </div>
            </>}
        </div>
    </>
}

export default Giveaways;