import Tippy from "@tippyjs/react";
import Image from "next/image";
import { Switch, Menu, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import swr from "../../../lib/swr";
import Snackbar from "@windui/snackbar";
import axios from "axios";

export default function Main({ $, boost, guild }) {
    const Level0 = () => <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-green-600">
        <i className="mr-1 far fa-check-circle" /> Free
    </span>;

    const Level1 = () => <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-sky-600">
        <i className="mr-1 far fa-chess-knight-alt" /> {boost ? boost.levels[0] : ""}
    </span>;

    const Level2 = () => <span className="text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-pink-700">
        <i className="mr-1 far fa-chess-rook-alt" /> {boost ? boost.levels[1] : ""}
    </span>;

    const Level3 = () => <span className="text-transparent bg-clip-text bg-gradient-to-br from-rose-400 to-red-700">
        <i className="mr-1 far fa-chess-queen-alt" /> {boost ? boost.levels[2] : ""}
    </span>;

    function addZero(i) {
        if (i < 10) { i = "0" + i };
        return i;
    };

    // Embed Editor States
    const [ $_title, set_title ] = useState("Title");
    const [ $_overviewTitle, set_overviewTitle ] = useState("Overview");
    const [ $_reqsTitle, set_reqsTitle ] = useState("Requirements");
    const [ $_endsat, set_endsat ] = useState("End Date");
    const [ $_prize, set_prize ] = useState("Prize");
    const [ $_hosted, set_hosted ] = useState("Hosted by");
    const [ $_winners, set_winners ] = useState("Winners");

    // Logs States
    const [ l_loading, set_l_loading ] = useState(false);
    const [ l_enabled, set_l_enabled ] = useState(guild?._settings?.log?.enabled || false);
    const [ l_channel, set_l_channel ] = useState(false);

    const { data: _channels } = swr("https://awardbot-demo.herokuapp.com/v1/guilds/" + (guild?.id || "#") + "/channels");
    const channels = _channels ? _channels.data : null;

    const saveLog = async () => {
        if (l_loading) return;
        set_l_loading(true);

        const _save = await axios.post("https://awardbot-demo.herokuapp.com/v1/guilds/" + (guild?.id || "#") + "/settings?_token=" + 
            (typeof window !== "undefined"
            ? window.localStorage.getItem("$Award_token")
            : ""), 
        {
            action: "log",
            enabled: l_enabled ? "1" : "0",
            channel: l_channel?.id
        });

        set_l_loading(false);
        if (!_save || !_save.data || _save.data.success != true) {
            new Snackbar({
                options: {
                    type: "error"
                },
                title: "Oops!",
                message: "Something went wrong!",
            }).show();
        } else {
            new Snackbar({
                options: {
                    type: "success"
                },
                title: "Yaay!",
                message: "Successfully saved!",
            }).show();
        };
    };

    const setInput = (e, type) => {
        switch(type) {
            case "title":
                set_title(e.target.value);
                break;
            case "overview_title":
                set_overviewTitle(e.target.value);
                break;
            case "reqs_title":
                set_reqsTitle(e.target.value);
                break;
            case "ends_at":
                set_endsat(e.target.value);
                break;
            case "prize":
                set_prize(e.target.value);
                break;
            case "hosted_by":
                set_hosted(e.target.value);
                break;
            case "winners":
                set_winners(e.target.value);
                break;
        };

        if (![ "ends_at", "prize", "hosted_by", "winners" ].includes(type)) return;
        let _w = (e.target.value.length || 0) * 9;
        e.target.style.width = _w == 0 ? "75px" : (_w + "px");
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-black/10 p-3 col-span-2 rounded-xl relative">
                <div className="flex items-end justify-center absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 rounded-xl z-1">
                    <div className="pb-10">
                        <h1 className="text-center text-white/25 uppercase font-extrabold drop-shadow-xl text-3xl">COMING SOON</h1>
                        <h6 className="text-center text-xs italic text-white/20">Only those who have reached the latest boost level will be able to use it.</h6>
                    </div>
                </div>
                <div className="flex items-center justify-between px-1">
                    <h1 className="text-xl text-white font-bold"><i className="mr-1 text-amber-400 far fa-pen-fancy" /> Embed Editor</h1>
                    <Tippy placement="top" content="The feature is unlocks at this level.">
                        <div className="bg-black/10 py-2 px-4 rounded-full font-semibold text-sm">
                            <Level3 />
                        </div>
                    </Tippy>
                </div>
                <div className="mt-3 flex justify-center text-white">
                    <div className="flex-shrink-0">
                        <Image src="/img/logo.png" className="flex-shrink-0 rounded-full" width="40" height="40" />
                    </div>
                    <div id="messageContent" className="pl-[12px]">

                        <span className="flex items-center">
                            <a className="hover:underline cursor-pointer">Award</a>
                            <span className="discord-bot">bot</span>
                            <span className="timestamp">
                                <time aria-label={`Today at ${new Date().getHours()}:{new Date().getMinutes()}`} dateTime={Date.now()}>
                                    <i className="separator" aria-hidden="true"> — </i>Today at {addZero(new Date().getHours())}:{addZero(new Date().getMinutes())}
                                </time>
                            </span>
                        </span>

                        <div className="embed flex-shrink-0">
                            <div className="embed-grid flex-shrink-0">
                                <div className="embed-title">
                                    <input value={$_title} onChange={e => setInput(e, "title")} placeholder="Title" maxLength={32} type="text" className="transform duration-200 hover:bg-black/20 focus:bg-black/20 w-full bg-transparent border-0 focus:outline-none font-bold" />
                                </div>
                                <div className="embed-fields">
                                    <div className="embed-field13">
                                        <div className="embed-bold">
                                            <input value={$_overviewTitle} onChange={e => setInput(e, "overview_title")} placeholder="Overview Title" maxLength={16} type="text" className="transform duration-200 hover:bg-black/20 focus:bg-black/20 w-full bg-transparent border-0 focus:outline-none font-semibold underline" />
                                        </div>
                                        <div className="embed-text">
                                            <div className="flex items-center">
                                                <input placeholder="Ends at" value={$_endsat} onChange={e => setInput(e, "ends_at")} style={{ width: "75px" }} maxLength={16} type="text" className="transform duration-200 hover:bg-black/20 focus:bg-black/20 bg-transparent border-0 focus:outline-none" />
                                                : <Tippy content={new Date().toLocaleString()}><span className="ml-1 embed-timestamp">{new Date().toLocaleString()}</span></Tippy>
                                            </div>
                                            <div className="flex items-center">
                                                <input placeholder="Prize" value={$_prize} onChange={e => setInput(e, "prize")} style={{ width: "75px" }} maxLength={16} type="text" className="transform duration-200 hover:bg-black/20 focus:bg-black/20 bg-transparent border-0 focus:outline-none" />
                                                : <code className="embed-code embed-inline">Prize</code>
                                            </div>
                                            <div className="flex items-center">
                                                <input placeholder="Hosted by" value={$_hosted} onChange={e => setInput(e, "hosted_by")} style={{ width: "75px" }} maxLength={16} type="text" className="transform duration-200 hover:bg-black/20 focus:bg-black/20 bg-transparent border-0 focus:outline-none" />
                                                : <span className="mention" role="button">@Award</span>
                                            </div>
                                            <div className="flex items-center">
                                                <input placeholder="Winners" value={$_winners} onChange={e => setInput(e, "winners")} style={{ width: "75px" }} maxLength={16} type="text" className="transform duration-200 hover:bg-black/20 focus:bg-black/20 bg-transparent border-0 focus:outline-none" />
                                                : <code className="embed-code embed-inline">10</code>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="embed-field13">
                                        <div className="embed-bold">
                                            <input value={$_reqsTitle} onChange={e => setInput(e, "reqs_title")} placeholder="Requirements Title" maxLength={16} type="text" className="transform duration-200 hover:bg-black/20 focus:bg-black/20 w-full bg-transparent border-0 focus:outline-none font-semibold underline" />
                                        </div>
                                        <div className="embed-text">
                                            No requirements.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <button className="embed-button">
                                <div className="embed-buttonContent">
                                    <div className="embed-buttonItems" aria-hidden="false">
                                        <img src="/img/globe.svg" alt="🌐" draggable="false" className="embed-buttonEmoji" />
                                        <div className="embed-buttonLabel">Join on Website</div>
                                        <svg className="embed-launchIcon" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"></path>
                                            <path fill="currentColor" d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </button>
                            <button className="embed-button">
                                <div className="embed-buttonContent">
                                    <div className="embed-buttonItems" aria-hidden="false">
                                        <img src="/img/tada.svg" alt="🎉" draggable="false" className="embed-buttonEmoji" />
                                        <div className="embed-buttonLabel">Join on Discord</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                    <Tippy placement="top" content={<p className="text-center">You can add text to areas with italics and low opacity. You can edit the text you want by clicking on it. (Required fields cannot be edited!)</p>}>
                        <button className="flex items-center justify-center text-zinc-900 rounded-xl shadow-xl shadow-sky-600/10 h-8 w-8 bg-sky-400">
                            <i className="far fa-question-circle" />
                        </button>
                    </Tippy>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center justify-center text-sm text-zinc-900 rounded-xl shadow-xl shadow-rose-600/10 h-8 w-20 font-semibold bg-rose-400">
                            <i className="far fa-times mr-1.5" /> Reset
                        </button>
                        <button className="flex items-center justify-center text-sm text-zinc-900 rounded-xl shadow-xl shadow-emerald-600/10 h-8 w-20 font-semibold bg-emerald-400">
                            <i className="far fa-check mr-1.5" /> Save
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-black/10 col-span-2 md:col-span-1 p-3 rounded-xl relative">
                <div className="flex items-center justify-between px-1">
                    <h1 className="text-xl text-white font-bold"><i className="mr-1 text-amber-400 far fa-print" /> Logs</h1>
                    <Tippy placement="top" content="The feature is unlocks at this level.">
                        <div className="bg-black/10 py-2 px-4 rounded-full font-semibold text-sm">
                            <Level0 />
                        </div>
                    </Tippy>
                </div>
                <div className="mt-3 h-[86.5%] flex flex-col justify-between text-white">
                    <div>
                        <div className="p-2 rounded-xl bg-black/10 flex flex-col items-center">
                            <h1 className="font-semibold">Post Logs to Discord Channel</h1>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs text-white/25 uppercase font-bold">DISABLED</span>
                                <Switch
                                    checked={l_enabled}
                                    onChange={set_l_enabled}
                                    className={`${l_enabled ? "bg-amber-400" : "bg-gray-500"}
                                    relative inline-flex flex-shrink-0 h-[28px] w-[48px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`${l_enabled ? "translate-x-5" : "translate-x-0"}
                                        pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                    />
                                </Switch>
                                <span className="text-xs text-white/25 uppercase font-bold">ENABLED</span>
                            </div>
                        </div>
                        <div className={"p-2 rounded-xl mt-3 bg-black/10 flex flex-col items-center transform duration-200" + (!l_enabled ? " opacity-25 pointer-events-none" : "")}>
                            <h1 className="font-semibold">Log Channel</h1>
                            <Menu
                                as="div"
                                className="mt-2 w-full relative inline-block text-left"
                            >
                                <div>
                                    <Menu.Button className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-400 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none py-4 px-6 flex justify-between items-center">
                                        <div className="flex items-center gap-x-1 text-white text-opacity-60">
                                            {channels && (l_channel ? <>
                                                <i className="fa fa-hashtag text-white text-opacity-20" />
                                                {l_channel?.name}
                                       ?      || "null"</> : (guild?._settings?.log?.channel ? <>
                                                <i className="fa fa-hashtag text-white text-opacity-20" />
                                                {channels.find(__c => __c.id == guild?._settings?.log?.channel)?.name}
                                            </> : <>
                                                <i className="fa fa-hashtag text-white text-opacity-20" />
                                                {channels[0].name}
                                            </>))}
                                        </div>
                                        <div>
                                            <i className="fa fa-chevron-down text-white"></i>
                                        </div>
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
                                    <Menu.Items className="z-10 absolute left-0 w-full mt-2 origin-top-right bg-black overflow-auto max-h-80 border border-black border-opacity-20 bg-opacity-95 rounded-lg p-1">
                                        <div className="px-1 py-1 w-full">
                                            {channels ? (
                                            <>
                                                {channels.map((item, index) => (
                                                <Menu.Item key={index}>
                                                    {({ active }) => (
                                                    <button
                                                        onClick={() => set_l_channel(item)}
                                                        className={`w-full rounded-lg hover:bg-zinc-900 p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                                                    >
                                                        <i className="fa fa-hashtag text-xl text-white text-opacity-20" />
                                                        <span>{item.name}</span>
                                                    </button>
                                                    )}
                                                </Menu.Item>
                                                ))}
                                            </>
                                            ) : (
                                            <Menu.Item>
                                                {({ active }) => (
                                                <button
                                                    className={`w-full justify-center rounded-lg p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                                                >
                                                    <i className="fa fa-spinner-third fa-spin text-xl text-white text-opacity-20" />
                                                </button>
                                                )}
                                            </Menu.Item>
                                            )}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                    <button onClick={saveLog} className="ml-auto flex items-center justify-center text-sm text-zinc-900 rounded-xl shadow-xl shadow-emerald-600/10 h-8 w-20 font-semibold bg-emerald-400">
                        {l_loading ? <i className="fad fa-spinner-third fa-spin" /> : <>
                            <i className="far fa-check mr-1.5" /> Save
                        </>}
                    </button>
                </div>
            </div>
        </div>
    );
};;