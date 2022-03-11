import Link from "next/link";
import { useRouter } from 'next/router';

export default function Sidebar({ $, guild }) {
    const router = useRouter();

    const itemsConfig = {
        iconColor: 'text-amber-500',
        activeIconColor: 'text-white',
        textColor: 'text-white',
        activeTextColor: 'text-white'
    };

    const items = [
        {
            more: false,
            icon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.iconColor} fal fa-home`} />,
            activeIcon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.activeIconColor} fa fa-home`} />,
            title: "Dashboard",
            url: "/dashboard/"+guild.id,
        },
        {
            more: false,
            icon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.iconColor} fal fa-plus-circle`} />,
            activeIcon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.activeIconColor} fa fa-plus-circle`} />,
            title: "Create Giveaway",
            url: "/dashboard/"+guild.id+"/giveaways/create",
        },
        {
            more: false,
            icon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.iconColor} fal fa-stopwatch-20`} />,
            activeIcon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.activeIconColor} fa fa-stopwatch-20`} />,
            title: "Active Giveaways",
            url: "/dashboard/"+guild.id+"/giveaways/active",
        },
        {
            more: false,
            icon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.iconColor} fal fa-heart-broken`} />,
            activeIcon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.activeIconColor} fa fa-heart-broken`} />,
            title: "Ended Giveaways",
            url: "/dashboard/"+guild.id+"/giveaways/ended",
        },
        {
            more: false,
            icon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.iconColor} fal fa-list`} />,
            activeIcon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.activeIconColor} fa fa-list`} />,
            title: "All Giveaways",
            url: "/dashboard/"+guild.id+"/giveaways",
        },
        {
            more: true,
            icon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.iconColor} fal fa-gem`} />,
            activeIcon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.activeIconColor} fa fa-crystal`} />,
            title: "Boosts",
            url: "/boosts/"+guild.id,
        },
        {
            more: true,
            icon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.iconColor} fal fa-cog`} />,
            activeIcon: <i className={`flex justify-center text-lg w-8 ${itemsConfig.activeIconColor} fa fa-cog`} />,
            title: "Settings",
            url: "/dashboard/"+guild.id+"/settings",
        }
    ];

    return (<>
        <div className="sidebar h-full w-full lg:-ml-10">

            <div
                className="w-full lg:w-[16rem] xl:w-[18rem] left-0 rounded-xl space-y-1 p-4 lg:sticky lg:top-20 block text-white bg-black/10 rounded-lg"
                >
                <div className="flex items-center mb-3 gap-x-2">
                    <img
                        className="h-16 rounded-full shadow-lg shadow-amber-800/10"
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
                        onError={e => (e.target.src = "/img/logo.png")}
                        alt={guild.name}
                    />
                    <div>
                        <p className="text-xs italic text-white text-opacity-50">
                            You're managing:
                        </p>
                        <h1 className="font-bold text-lg text-white leading-none">{guild.name}</h1>
                    </div>
                </div>
                <p className="font-medium text-lg text-white">Pages</p>
                <div className="pb-1"></div>
                {items.filter(a => !a.more).map((item, index) => (
                    <Link key={index} href={item.url}>
                        <a className={`flex items-center gap-x-2 rounded-xl p-2 transition duration-100 ${router.asPath === item.url ? 'shadow-lg shadow-amber-600/20 bg-gradient-to-bl from-amber-500 to-amber-700 hover:opacity-75' : 'hover:bg-black hover:bg-opacity-20'}`}>
                            {router.asPath === item.url ? item.activeIcon : item.icon}
                            <h3 className={`${router.asPath === item.url ? itemsConfig.activeTextColor : itemsConfig.textColor} font-medium`}>
                                {item.title}
                            </h3>  
                        </a>
                    </Link>
                ))}
                <p className="pt-3 font-medium text-lg text-white">
                    More
                </p>
                <div className="pb-1"></div>
                {items.filter(a => a.more).map((item, index) => (
                    <Link key={index} href={item.url}>
                        <a className={`flex items-center gap-x-2 rounded-xl p-2 transition duration-100 ${router.asPath === item.url ? 'shadow-lg shadow-amber-600/20 bg-gradient-to-bl from-amber-500 to-amber-700 hover:opacity-75' : 'hover:bg-black hover:bg-opacity-20'}`}>
                            {router.asPath === item.url ? item.activeIcon : item.icon}
                            <h3 className={`${router.asPath === item.url ? itemsConfig.activeTextColor : itemsConfig.textColor} font-medium`}>
                                {item.title}
                            </h3>  
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    </>);
};;