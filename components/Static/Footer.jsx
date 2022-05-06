import Link from "next/link";
import locales from "../../locales.config.js";
import swr from "../../lib/swr";
import { useEffect, useState, Fragment, useRef } from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Tippy from '@tippyjs/react';
import axios from 'axios';

export default function Footer({ $ }) {
    const [ apiAlive, setApiAlive ] = useState(null);

    axios.get("https://awardbot-demo.herokuapp.com")
        .catch(() => {
            setApiAlive(false);
        }).then(res => {
            if (res) {
                setApiAlive(true);
            } else {
                setApiAlive(false);
            };
        });

    return (
        <>
            <footer className="py-10">
                <div className="pt-10 mx-auto">
                    <div className="lg:grid lg:grid-cols-6 gap-20">
                        <div className="col-span-3">
                            <div className="flex items-center space-x-5">
                                <img src="/img/logo.png" className="w-12" />
                                <p className="font-semibold text-xl text-white">Award</p>
                            </div>
                            <Menu as="div" className="relative mt-3 inline-block text-left">
                                <div>
                                    <Menu.Button className="flex z-1 items-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        <img
                                            src={`https://flagcdn.com/w80/${$.overview.country}.png`}
                                            width="24"
                                            height="18"
                                            className="mr-2 h-4 rounded-sm"
                                        />
                                        {$.overview.name}
                                        <ChevronDownIcon
                                            className="w-5 h-5 ml-2 -mr-1 transform rotate-180 text-violet-200 hover:text-violet-100"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className={`z-1 custom-scroll overflow-auto absolute mt-1 left-0 w-48 mb-2 origin-top-left bg-black bg-opacity-90 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                                        <div className="flex flex-col px-1 py-1 space-y-1">
                                            {Object.keys(locales).map((locale, index) => (
                                                <Menu.Item key={index}>
                                                    {({ active }) => (
                                                        <Link href="/" locale={locale}>
                                                            <button
                                                                className={`${locale === $.overview.country ? 'bg-amber-700 bg-opacity-5' : 'hover:bg-white hover:bg-opacity-5'} text-white transition-all duration-150 group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                            >
                                                                <img
                                                                    src={`https://flagcdn.com/w80/${locales[locale].country}.png`}
                                                                    width="24"
                                                                    height="18"
                                                                    className="mr-2 h-4 rounded-sm"
                                                                />
                                                                {locales[locale].name}
                                                            </button>
                                                        </Link>

                                                    )}
                                                </Menu.Item>
                                            ))}

                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <p className="text-white text-opacity-50 mt-3 text-sm">
                                {$.footer.description}
                            </p>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white font-medium mt-3 sm:mt-0 sm:mb-3">{$.footer.menus.first.title}</p>
                            <div>
                                <Link href="/">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                        {$.footer.menus.first.items.home}
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/dashboard">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                        {$.footer.menus.first.items.dashboard}
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <a href="https://awardbot-demo.herokuapp.com/v1/invite/discord" target="_blank" className="text-white/50 hover:text-white hover:underline transform duration-200">
                                    {$.footer.menus.first.items.support}
                                </a>
                            </div>
                            <div>
                                <a href="https://awardbot-demo.herokuapp.com/v1/invite/bot" target="_blank" className="text-white/50 hover:text-white hover:underline transform duration-200">
                                    {$.footer.menus.first.items.add}
                                </a>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white font-medium mt-3 sm:mt-0 sm:mb-3">{$.footer.menus.second.title}</p>
                            <div>
                                <Link href="/partners">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                        {$.footer.menus.second.items.partners}
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/team">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                        {$.footer.menus.second.items.team}
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <p className="text-white font-medium mt-3 sm:mt-0 sm:mb-3">{$.footer.menus.third.title}</p>
                            <div>
                                <Link href="/tos">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                        {$.footer.menus.third.items.tos}
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/privacy">
                                    <a className="text-white/50 hover:text-white hover:underline transform duration-200">
                                        {$.footer.menus.third.items.privacy}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 grid content-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        <p className="text-white text-center sm:text-left text-opacity-50">
                            {new Date().getFullYear()} &copy; {$.footer.rights}
                        </p>
                        <div className="hidden md:flex items-center justify-center">
                            {typeof apiAlive !== "undefined" && <a href="https://status.awardbot.me" target="_blank" className="flex items-center space-x-3">
                                <i className={"fad fa-circle text-xs " + (apiAlive == true ? "text-green-400" : "text-red-400")} />
                                <p className={"text-xs " + (apiAlive == true ? "text-green-400" : "text-red-400")}>
                                    {apiAlive == true ? $.footer.allServices : $.footer.someServices}
                                </p>
                            </a>}
                        </div>

                        {/* 
                            --------------------------
                                DONT TOUCH HERE!
                            --------------------------
                        */}
                        <p className="text-white text-center sm:text-right text-opacity-50">
                            {"Developed with ❤️ by clqu & Swôth."}
                        </p>
                        {/* 
                            --------------------------
                                DONT TOUCH HERE!
                            --------------------------
                        */}
                    </div>
                </div>
            </footer>
        </>
    );
};
