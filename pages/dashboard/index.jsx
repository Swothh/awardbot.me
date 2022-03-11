import Link from "next/link";
import { useRouter } from "next/router";
import swr from "../../lib/swr";
import axios from "axios";

export default function Dashboard({ $ }) {
	const { data: _user } = swr("https://api.awardbot.me/v1/auth/me");
	const user = _user ? _user.data : null;
	const router = useRouter();

	if (_user && !user) {
		if (typeof window !== "undefined") {
			window.location.href = "/";
			return <></>;
		};
	};

	const addBot = id => {
		let $w = window.open(
			"https://api.awardbot.me/v1/invite/bot?__w=1&__beta=" + 
			(process.env.NODE_ENV === 'production' ? 'false' : 'true') + 
			"&disable_select=true&id=" + id,
			"_blank",
			"toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=400,height=1400"
		);

		let $i = setInterval(async () => {
			if (!$w.closed) return;
			const push = () => router.push("/dashboard/" + id);
			const check = await axios.get("https://api.awardbot.me/v1/auth/me?_token=" + window?.localStorage?.getItem("$Award_token"));
			clearInterval($i);

			if (check && check.data && check.data.data) {
				let $u = check.data.data;
				let $g = $u.guilds.find(g => g.id == id);
				if ($g && $g.bot_added == true) push();
			};
		}, 1000);
	};

    return (<>
        <div className="py-10">
            <p className="animateHeader text-center font-semibold text-xl text-white">
                {$.dashboard.selectServer.title}
            </p>
            <div className="flex items-center text-white/50 justify-center">
				<Link href="/api/auth/login" locale="en">
					<a dangerouslySetInnerHTML={{ __html: $.dashboard.selectServer.description }}>
						
					</a>
				</Link>
            </div>
            <div className="space-y-10 max-w-4xl mt-20 mx-auto">
                {!_user ? <div className="flex items-center justify-center">
					<i className="fad fa-spinner-third fa-spin text-white text-2xl" />
				</div> : (
					user?.guilds?.filter(_g => _g.bot_added == true).concat(user?.guilds?.filter(_g => _g.bot_added == false)).filter(_g => _g.permissions.includes('MANAGE_GUILD')).map((guild, index) => (
						<div key={index} className="flex items-center justify-between">
							<div className="flex items-center space-x-5">
								<img
									src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}?size=80`}
									onError={e => (e.target.src = "/img/logo.png")}
									className="rounded-full w-16"
								/>
								<div>
									<p className="font-medium text-white">{guild.name}</p>
									<p className="text-white text-opacity-50 text-sm">
										{$.dashboard.selectServer.serverUnderText}
									</p>
								</div>
							</div>
							<div>
								{guild.bot_added == true ? <Link href={"/dashboard/" + guild.id}>
									<a className="shadow-lg shadow-amber-600/20 rounded-xl py-2.5 font-medium px-7 text-zinc-900 bg-amber-400 hover:bg-opacity-50 transition duration-200">
									{$.dashboard.selectServer.buttons.manage}
									</a>
								</Link> : <a onClick={() => addBot(guild.id)} className="cursor-pointer shadow-lg shadow-emerald-600/20 rounded-xl py-2.5 font-medium px-7 text-zinc-900 bg-emerald-400 hover:bg-opacity-50 transition duration-200">
									{$.dashboard.selectServer.buttons.add}
								</a>}
							</div>
						</div>
					))
				)}
            </div>
        </div>
    </>);
};