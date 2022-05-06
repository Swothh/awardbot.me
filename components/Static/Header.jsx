import locales from "../../locales.config.js";
import Link from "next/link";
import swr from "../../lib/swr";
import { useEffect, useState, Fragment, useRef } from "react";
import { useRouter } from "next/router";
import { Menu, Transition, Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Key from "../Key.jsx";
import { useTheme } from 'next-themes';
import Window from "@windui/window";

const MobileNavbar = ({ Menu, open, setOpen, NavItems }) => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    return <>
        <div onClick={() => setOpen(false)} className={`${open ? '' : 'hidden'} w-full h-full z-50 fixed overflow-none top-0 backdrop-blur-sm lg:hidden`} />
        <div className={`transform ${open ? '' : 'translate-x-full'} transition-all duration-300 bg-black bg-opacity-90 text-white w-80 fixed rounded-l-xl z-60 right-0 top-0 h-full lg:translate-x-full`}>
            <div className="relative w-full h-full">

                <div className="flex justify-between border-b border-white/20 items-center px-5 py-4">
                    <div className="flex items-center">
                        <img width="32" className="icon-glow" src="/img/logo.png" />
                        <p className=" font-extrabold ml-1 text-2xl">Award</p>
                    </div>
                    <button onClick={() => setOpen(!open)}><i className="cursor-pointer fa fa-times text-xl mr-2" /></button>
                </div>
                {NavItems.filter(a => a.link).map((item, itemIndex) => (
                    <Link href={item.href} key={itemIndex}>
                        <div key={itemIndex} className={`${router.asPath === item.href ? 'bg-white bg-opacity-5' : ''} my-2 cursor-pointer p-4 opacity-75 hover:opacity-100 hover:underline transition-all duration-150 block`}>
                            <i className={`${router.asPath === item.href ? item.activeIcon : item.icon} mr-2`} />{item.name}
                        </div>
                    </Link>
                ))}
                {NavItems.filter(a => !a.link).map((item, itemIndex) => (
                    <a href={item.href} key={itemIndex}>
                        <div key={itemIndex} className={`my-2 cursor-pointer p-4 opacity-75 hover:opacity-100 hover:underline transition-all duration-150 block`}>
                            <i className={`${router.asPath === item.href ? item.activeIcon : item.icon} mr-2`} />{item.name}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </>
}
const Header = ({ $, NavItems }) => {
    const { data: _user, mutate } = swr("https://api.awardbot.me/v1/auth/me");
    const user = _user ? _user.data : null;
    const [open, setOpen] = useState(false);
    const [colors, setColors] = useState(false);
    const [isDiscovered, setIsDiscovered] = useState(false);
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            if (localStorage.theme) {
                setIsDiscovered(true);
            };
        };
    }, []);

    const colorsThemes = [
        { id: 'violet', color: 'violet', label: 'Violet' },
        { id: 'blue', color: 'blue', label: 'Sky' },
        { id: 'emerald', color: 'emerald', label: 'Emerald' },
        { id: 'rose', color: 'rose', label: 'Rose' },
        { id: 'amber', color: 'amber', label: 'Amber' },
    ];
    useEffect(() => {
        setOpen(open);
        if(open) setColors(false);
    }, [open])
    const dropdownItems = [
        {
            icon: <i className="w-8 flex items-center justify-center fal fa-user"></i>,
            title: $.user.dropdown.profile,
            description: $.user.dropdown._profile,
            type: "link",
            href: "/user/[id]"
        },
        {
            icon: <i className="w-8 flex items-center justify-center fal fa-server"></i>,
            title: $.user.dropdown.guilds,
            description: $.user.dropdown._guilds,
            type: "link",
            href: "/dashboard"
        },
        {
            icon: <i className="w-8 flex items-center justify-center fal fa-heart"></i>,
            title: $.user.dropdown.connections,
            description: $.user.dropdown._connections,
            type: "link",
            href: "/account/connections"
        },
        {
            icon: <i className="w-8 flex items-center justify-center fal fa-gift"></i>,
            title: $.user.dropdown.redeem,
            description: $.user.dropdown._redeem,
            type: "link",
            href: "/account/redeem"
        },
        {
            icon: <i className="w-8 flex items-center justify-center fal fa-bell-on"></i>,
            title: "Notifications",
            description: "View your notifications!",
            type: "click",
            ping: (() => {
                if (typeof localStorage == "undefined") return true;
                if (!user) return true;
                if (localStorage.getItem("$Award_nc") != (user.notifications || []).length) return true;
                return false;
            })(),
            event: function() {
                if (!user) return;
                if (typeof document == "undefined") return;
                if (typeof localStorage == "undefined") return;
                if (document.querySelector(".windui-window")) return;
                localStorage.setItem("$Award_nc", (user.notifications || []).length);
                this.ping = false;

                new Window({
                    icon: "🔔",
                    title: "Your Notifications",
                    options: {
                        iconColor: "#18181b",
                        headerBg: "var(--500)",
                        headerColor: "#18181b",
                        bodyBg: "#151515"
                    },
                    body: `
                    <ul class="space-y-3">
                        ${(user.notifications || []).map(n => `
                            <li>
                                <div class="p-3 bg-black/20 rounded-lg">
                                    <h1 class="text-sm">🎉 You've won the <u>${n.giveaway.title}</u> giveaway!</h1>
                                    <h6 class="text-sm text-zinc-300">Your reward is here: <u style="color: var(--400);">${typeof n.reward == "object" ? JSON.stringify(n.reward) : n.reward}</u></h6>
                                    <i class="text-xs text-zinc-400">If the prize is invalid, contact the giveaway owner.</i>
                                </div>
                            </li>
                        `).join("")}
                        ${(user.notifications || []).length < 1 ? `
                            <li class="p-5">
                                <h3 class="text-center">😞 No notification here!</h3>
                            </li>
                        ` : ``}
                    </ul>
                    `
                }).open();
            }
        },
        {
            icon: <i className="w-8 flex items-center justify-center fal fa-desktop"></i>,
            title: $.user.dropdown.panel,
            description: $.user.dropdown._panel,
            type: "link",
            href: "/panel",
            permission: "VIEW_PANEL"
        }
    ];
    const ChangeColor = id => {
        setTheme(id);
        setIsDiscovered(true);
    }
    
    const [hue, setHue] = useState("");
    const [banner, setBanner] = useState(false);
    useEffect(() => {
        if (typeof localStorage == "undefined") return;
        const banner = localStorage.getItem("$Award_close_banner");
        if (!banner) setBanner(true);
        const theme = localStorage.getItem("theme");
        if (theme === "violet") setHue("hue-rotate-[230deg]");
        if (theme === "blue") setHue("hue-rotate-[180deg]");
        if (theme === "emerald") setHue("hue-rotate-[70deg]");
        if (theme === "rose") setHue("hue-rotate-[330deg]");
        if (theme === "amber") setHue("");
    }, []);
    
    return (
        <>
          {banner && <div className="bg-amber-900/20 py-2 px-4 rounded-xl mt-5 md:flex items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <img className="w-8 h-8" src="https://serity.me/img/serity-logo.png" />
                <h1 className="font-light text-zinc-200">
                  <b className="font-semibold text-white">Award</b> is part of <b className="font-semibold text-white">Serity</b>
                </h1>
              </div>
              <div className="flex items-center justify-end md:justify-start space-x-4">
                <a href="https://serity.me" target="_blank" className="hover:underline text-white font-light">
                  <i className="fal fa-up-right-from-square mr-1" /> Visit Website
                </a>
                <a className="cursor-pointer" onClick={() => {
                  if (typeof localStorage == "undefined") return;
                  localStorage.setItem("$Award_close_banner", 1);
                  setBanner(false);
                }}>
                  <i className="far fa-x text-sm text-white" />
                </a>
              </div>
            </div>}
            <header>
                <div className="max-w-7xl px-5 mx-auto py-5 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                            <img src="/img/logo-64.png" 
                                className={`
                                    rounded-full ${hue}
                                `}
                                width="48" height="48"
                            />
                            <p className="invisible md:visible text-xl text-white font-semibold">
                                <span className="text-amber-400">Award</span>Bot
                            </p>
                        </div>
                        <ul className="hidden lg:flex items-center space-x-4">
                            {NavItems.filter(a => a.link).map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    <Link href={item.href} >
                                        <a className={`border-b-2 ${router.asPath === item.href ? 'text-amber-500 border-amber-500' : 'border-black/0 text-white/75 hover:text-white'} transition-all duration-200 font-medium pb-3`}>
                                            {item.name}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                            {NavItems.filter(a => !a.link).map((item, itemIndex) => (
                                <li key={itemIndex}>
                                    <a target="_blank" href={item.href} >
                                        <div className={`border-b-2 ${router.asPath === item.href ? 'text-amber-500 border-amber-500' : 'border-black/0 text-white/75 hover:text-white'} transition-all duration-200 font-medium`}>
                                            {item.name}
                                        </div>
                                    </a>
                                </li>
                            ))}

                        </ul>
                    </div>
                    <div className="flex items-center space-x-2 relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="
                                bg-transparent
                                py-2
                                px-3
                                text-white
                                rounded-md
                                text-center
                                lg:hidden
                                hover:bg-amber-400 hover:bg-opacity-20
                        ">
                            <i className={`fa ${open ? 'fa-times' : 'fa-bars'} text-lg`} />
                        </button>
                        <Menu as="div" className="relative text-left">
                            <div>
                                <Menu.Button>
                                    <div onClick={() => setColors(!colors)} className="bg-gradient-to-tl from-amber-500 to-amber-700 text-white w-11 h-11 rounded-xl hover:opacity-80 transition-all duration-200 relative">
                                        <div className="flex w-full h-full items-center justify-center">
                                            <i className="far fa-swatchbook text-zin-900" />
                                            {!isDiscovered && <>
                                                <div className="absolute animate-ping -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-red-600 to-red-700 rounded-full" />
                                                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-red-600 to-red-700 rounded-full" />
                                            </>}
                                        </div>
                                    </div>
                                </Menu.Button>
                            </div>
                            <Transition
                                show={colors}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute z-50 text-base right-0 p-1 w-56 mt-2 origin-top-right border bg-white border-black/10 dark:border-white/10 dark:bg-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" static>
                                    <div className="px-1 py-2 space-y-1">
                                    {colorsThemes.map((th, thIdx) => (
                                    <Menu.Item key={thIdx}>
                                            <button
                                            onClick={() => ChangeColor(th.id)}
                                            className={`group flex rounded-md items-center w-full px-3 py-2 transition-all duration-150 ${theme === th.id ? `text-white bg-500 shadow-md shadow-violet-500/10` : 'text-black/75 dark:text-white/75 hover:text-black/100 dark:hover:text-white/100 hover:bg-gray-100/50 dark:hover:bg-gray-800/20'} `}
                                            >
                                            <div className="w-full flex items-center justify-between">
                                                <span>{th.label} </span>
                                                <i className={`${theme === th.id ? 'border-white dark:border-black' : 'border-black/0'} border-2 rounded-full fad fa-circle text-500-${String(th.color)} mr-1`}/>
                                            </div>
                                            </button>
                                    </Menu.Item>
                                    ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        
                        {!_user && <i className="fad fa-spinner-third fa-spin text-white text-2xl" />}
                        {_user && (!user ? <Link href={`/api/auth/login?url=/dashboard`} locale="en">
                            <a className="w-auto flex items-center justify-center shadow-lg gap-x-2 shadow-amber-600/20 rounded-xl py-2.5 font-medium px-7 bg-gradient-to-tl from-amber-500 to-amber-700 text-white  hover:opacity-80 transition duration-200">
                                {$.navbar.login} 
                            </a>
                        </Link> : <Popover className="relative inline-block">
                            {({ open, close }) => (
                                <>
                                    <Popover.Button className="relative">
                                        <img
                                            onClick={() => setColors(false)}
                                            className="rounded-full cursor-pointer"
                                            width="48"
                                            height="48"
                                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                                            onError={e => (e.target.src = "/img/logo.png")}
                                            alt={user.username}
                                        />
                                        {dropdownItems.find(i => i.ping) && <>
                                            <i style={{
                                                "--fa-secondary-opacity": "1",
                                                "--fa-secondary-color": "#181818"
                                            }} className="z-10 fad fa-circle absolute top-0 right-0 text-xs text-amber-400" />
                                            <i className="fad fa-circle absolute top-0 right-0 animate-ping text-xs text-amber-400" />
                                        </>}
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -right-5 md:right-0 sm:px-0 lg:max-w-xl">
                                            <div className="dropdown-container overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                            <div className="relative grid gap-8 p-7 lg:grid-cols-2">
                                                {dropdownItems.map((item, index) => {
                                                    if (item.permission) {
                                                        if (!user) return;
                                                        if (!user.permissions.some(_p => _p == "*" || _p == item.permission)) return;
                                                    };

                                                    const child = <a className="flex items-center p-2 px-3 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-zinc-900/20 focus:outline-none">
                                                        <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 text-amber-400 sm:h-12 sm:w-12">
                                                            <div className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-700 sm:h-12 flex items-center justify-center sm:w-12 text-3xl">
                                                                {item.icon}
                                                            </div>
                                                            {item.ping && <>
                                                                <i style={{
                                                                    "--fa-secondary-opacity": "1",
                                                                    "--fa-secondary-color": "#181818"
                                                                }} className="z-10 fad fa-circle absolute top-3 right-3 text-xs text-amber-500" />
                                                                <i className="fad fa-circle absolute top-3 right-3 animate-ping text-xs text-amber-500" />
                                                            </>}
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="text-sm font-medium text-white">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-sm text-gray-400">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </a>;

                                                    return item.type != "link" ? <a className="cursor-pointer" onClick={() => {
                                                        close();
                                                        item.event();
                                                    }}>
                                                        {child}
                                                    </a> : <Link key={index} href={item.href.replace('[id]', user.id)}>
                                                        {child}
                                                    </Link>
                                                })}
                                            </div>
                                            <div className="p-4">
                                                <a
                                                onClick={() => {
                                                    window?.localStorage?.removeItem("$Award_token");
                                                    mutate();
                                                }}
                                                className="cursor-pointer flow-root px-4 py-3 transition duration-150 ease-in-out rounded-md hover:bg-zinc-900/20 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                >
                                                <span className="flex items-center">
                                                    <i className="mr-1 flex items-center justify-center text-amber-500 fal fa-sign-out"></i>
                                                    <span className="text-sm font-medium text-amber-500">
                                                        {$.user.dropdown.logout}
                                                    </span>
                                                </span>
                                                <span className="block text-sm text-gray-400">
                                                    {$.user.dropdown._logout}
                                                </span>
                                                </a>
                                            </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                        )}
                    </div>
                </div>
            </header>
            
            <MobileNavbar open={open} setOpen={setOpen} NavItems={NavItems} Menu={() => setOpen(!open)} />
        </>
    );
};

export default Header;
