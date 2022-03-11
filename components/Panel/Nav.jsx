import Link from "next/link";
import { useRouter } from 'next/router';

export default function Nav() {
    const NavItems = [
        {
            href: "/panel",
            icon: "fal fa-tachometer-alt",
            active: "fa fa-tachometer-alt",
            title: "Home"
        },
        {
            href: "/panel/partners",
            icon: "fal fa-handshake",
            active: "fa fa-handshake",
            title: "Partners"
        },
        {
            href: "/panel/online",
            icon: "fal fa-users",
            active: "fa fa-users",
            title: "Online Users"
        },
        {
            href: "/panel/promocode",
            icon: "fal fa-party-horn",
            active: 'fa fa-party-horn',
            title: "Manage Promos"
        }
    ];
    const router = useRouter();
    return (
        
        <div className="text-white p-2 bg-neutral-900 w-full rounded-xl">
            <div className="space-x-2 flex-col w-full lg:flex-row flex items-center ">
                {NavItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <a className={`font-semibold px-4 py-2 rounded-xl ${router.asPath === item.href ? 'bg-gradient-to-tr from-amber-500 to-amber-700 shadow-xl shadow-amber-600/20' : 'bg-black/10 hover:bg-black/20'} transition duration-200`}>
                            <i className={`${router.asPath === item.href ? item.active : item.icon} mr-1`} />{item.title}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};