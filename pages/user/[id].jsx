import { useRouter } from "next/router";
import swr from "../../lib/swr";
import Avatar from "../../components/Avatar";
import Countdown from "../../components/Countdown";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import GiveawayCards from '../../components/GiveawayCards';

export default function User({ $ }) {
    const router = useRouter();
    const { id } = router.query;

    const { data: _user } = swr(
        "https://awardbot-demo.herokuapp.com/v1/user/" + id + "/profile"
    );
    const user = _user ? _user.data : null;

    const { data: _giveaways } = swr(
        "https://awardbot-demo.herokuapp.com/v1/user/" + id + "/giveaways"
    );
    const giveaways = _giveaways ? _giveaways.data : null;

    const defaultResponse = (
        <div className="p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
            <div className="flex col-span-5 items-center justify-center">
                <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
            </div>
        </div>
    );

    console.log(user, giveaways);

    if (_user && _giveaways) {
        if (!user || !giveaways) {
            return defaultResponse;
        }
    }
    const connections = [
        {
            id: "youtube",
            border: "border-red-600/20",
            bg: "bg-red-600",
            bgDark: "bg-red-700",
            link: "https://youtube.com/channel/[id]",
            icon: 'fab fa-youtube',
            userCheck: _user
                ? user
                    ? user["youtube"]
                        ? user["youtube"]
                        : null
                    : null
                : null,
        },
        {
            id: "github",
            border: "border-black/20",
            bg: "bg-black/75",
            bgDark: "bg-black",
            link: "https://github.com/[id]",
            icon: 'fab fa-github',
            userCheck: _user
                ? user
                    ? user["github"]
                        ? user["github"]
                        : null
                    : null
                : null,
        },
        {
            id: "twitch",
            border: "border-violet-600/20",
            bg: "bg-violet-600",
            bgDark: "bg-violet-700",
            link: "https://twitch.com/[id]",
            icon: 'fab fa-twitch',
            userCheck: _user
                ? user
                    ? user["twitch"]
                        ? user["twitch"]
                        : null
                    : null
                : null,
        },
        {
            id: "twitter",
            border: "border-sky-600/20",
            bg: "bg-sky-600",
            bgDark: "bg-sky-700",
            link: "https://twitter.com/@[id]",
            icon: 'fab fa-twitter',
            userCheck: _user
                ? user
                    ? user["twitter"]
                        ? user["twitter"]
                        : null
                    : null
                : null,
        },
        {
            id: "tiktok",
            border: "border-purple-600/20",
            bg: "bg-purple-600",
            bgDark: "bg-purple-700",
            link: "https://tiktok.com/@[id]",
            icon: 'fab fa-tiktok',
            userCheck: _user
                ? user
                    ? user["tiktok"]
                        ? user["tiktok"]
                        : null
                    : null
                : null,
        },
    ];
    return (
        <>
            {!_user || !_giveaways ? (
                <div className="flex col-span-6 items-center justify-center">
                    <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
                </div>
            ) : (
                    <>
                        <div className="lg:grid lg:grid-cols-12 lg:gap-4 mt-10">
                            <div className="col-span-3 w-full">
                                <div className="flex w-full flex-col items-center">
                                    <div className="flex-shrink-0 border-[2.2px] w-[8rem] h-[8rem] border-amber-500/50 mb-2 rounded-full">
                                        <Avatar
                                            src={`https://cdn.discordapp.com/avatars/${user.profile.id}/${user.profile.avatar}`}
                                            className="rounded-full mx-auto"
                                            height="512"
                                            width="512"
                                        />
                                    </div>
                                    <p className="relative text-3xl font-semibold line-clamp-1 italic text-black dark:text-white capitalize">{user.profile.username}
                                    
                                    {user.permissions.includes('*') && (
                                        <Tippy content="Administrator">
                                            <i className="fa fa-crown text-2xl text-amber-500 mr-1 absolute -left-3 -rotate-[30deg] -top-3" />
                                        </Tippy>
                                    )}
                                    </p>
                                    <div className="flex items-center mt-2 gap-x-2">
                                        {user.permissions.includes('MODERATOR') && (
                                            <i className="fal fa-bolt text-2xl text-amber-500 mr-1" />
                                        )}
                                        
                                    </div>
                                    <div className="mt-5 w-full">
                                        <div className="flex items-center text-voilet-500 dark:text-amber-500 font-medium text-2xl text-left">
                                            <i className="fal fa-external-link text-voilet-500 mr-2" />
                                            <span className="text-voilet-500">{$.user.connections.title}</span>
                                        </div>
                                        <a href={`https://discord.com/users/${user.id}`} className="flex items-center shadow-xl" target="_blank">
                                            <div className="mt-2 bg-indigo-700 text-center px-4 py-2 rounded-l-lg text-white">
                                                <i className="fab fa-discord" />
                                            </div>
                                            <div className="mt-2 bg-indigo-600 w-full px-4 py-2 rounded-r-lg text-white">
                                                <p className="line-clamp-1">{user.profile.username}#{user.profile.discriminator}</p>
                                            </div>
                                        </a>
                                        {connections
                                            .filter((a) => a.userCheck)
                                            .map((item, index) => (
                                                <a href={item.link.replace(
                                                    "[id]",
                                                    item.userCheck.username
                                                        ? item.userCheck.username
                                                        : item.userCheck.id
                                                )} key={index} className="flex items-center shadow-xl w-full" target="_blank">
                                                <div className={`mt-2 ${item.bgDark} text-center px-4 py-2 rounded-l-lg text-white`} >
                                                    <i className={`${item.icon}`} />
                                                </div>
                                                <div className={`mt-2 ${item.bg} w-full px-4 py-2 rounded-r-lg text-white`}>
                                                        <p className="line-clamp-1">@
                                    {item.userCheck.username
                                                                ? item.userCheck.username
                                                                : item.userCheck.name}</p>
                                                    </div>
                                                </a>
                                            ))}
                                    </div>

                                </div>
                            </div>
                            <div className="col-span-9 pt-5 lg:pt-0 w-full">
                                <span className="text-2xl font-semibold mb-5 pr-1 text-white">
                                    {$.user.profile.giveaways.title.replace('{USER}', user.profile.username)}
                                </span>
                                {_giveaways ? (
                                    giveaways ? (
                                        <>
                                            <GiveawayCards marginTop="mt-2" gap="gap-5" $={$} data={giveaways} />
                                        </>
                                    ) : (
                                            <></>
                                        )
                                ) : (
                                        <defaultResponse />
                                    )}
                            </div>
                        </div>
                    </>
                )};
    </>
    );
}
