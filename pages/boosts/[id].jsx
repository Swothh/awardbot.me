import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Tippy from "@tippyjs/react";
import { useRouter } from "next/router";
import swr from "../../lib/swr";
import Image from "next/image";

import Boosters from '../../components/Boosts/boosters';
import UnBoost from '../../components/Boosts/unboost';
import Boost from '../../components/Boosts/boost';

export default function Boosts({ $ }) {
    const { id } = useRouter().query;
    const [ M1, setM1 ] = useState(false);
    const [ M2, setM2 ] = useState(false);
    const [ M3, setM3 ] = useState(false);

    const { data: _user } = swr("https://api.awardbot.me/v1/auth/me");
	const user = _user ? _user.data : null;

    const { data: _guild } = swr("https://api.awardbot.me/v1/guilds/" + id + "/check");
    const guild = _guild ? _guild.data : null;

    const { data: _boost, mutate: boostMutate } = swr("https://api.awardbot.me/v1/boost/" + id, "post");
    const boost = _boost ? _boost.data : null;

    const Level1 = () => <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-sky-600">
        {boost ? boost.levels[0] : ""}
    </span>;

    const Level2 = () => <span className="text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-pink-700">
        {boost ? boost.levels[1] : ""}
    </span>;

    const Level3 = () => <span className="text-transparent bg-clip-text bg-gradient-to-br from-rose-400 to-red-700">
        {boost ? boost.levels[2] : ""}
    </span>;


    return (
        <div>
            {!guild || !user || !boost ? <div className="flex items-center justify-center">
                <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
            </div> : <div>
                <Boosters user={user} guild={guild} boost={boost} isOpen={M1} closeModal={() => setM1(false)} />
                <Boost user={user} guild={guild} boost={boost} mutate={boostMutate} isOpen={M2} closeModal={() => setM2(false)} />
                <UnBoost user={user} guild={guild} boost={boost} mutate={boostMutate} isOpen={M3} closeModal={() => setM3(false)} />
                <div className="flex items-end justify-center flex-wrap gap-x-8">
                    <div className="flex items-end justify-end flex-col">
                        <div className="flex items-center justify-end gap-x-4">
                            <div>
                                <h1 className="text-right text-3xl font-extrabold text-white">{guild.name}</h1>
                                <h6 className="text-right text-xl text-white/50 text-semibold">
                                    <span className="text-transparent font-extrabold pr-1 bg-clip-text bg-gradient-to-br from-pink-400 to-fuschia-700">
                                        {boost.guild.boosts.length}
                                    </span>
                                    boosts!
                                </h6>
                            </div>
                            <Image
                                src={guild.icon ? ("https://cdn.discordapp.com/icons/" + guild.id + "/" + guild.icon) : "/img/logo.png"} 
                                className="rounded-full shadow-lg shadow-zinc-amber-600/10"
                                width="128"
                                height="128"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_fgltupfx.json"  background="transparent"  speed="1"  style={{ width: "300px", height: "200px" }}  loop  autoplay />
                    </div>
                </div>
                <div className="mt-5 flex flex-col justify-center items-center">
                    <p className="text-3xl font-extrabold text-white">
                        {boost.guild.level > 0 ? <>
                            The current level is {boost.guild.level == 3 ? <Level3 /> : (boost.guild.level == 2 ? <Level2 /> : <Level1 />)}!
                        </> : <>
                            {boost.prices[0]} boosts required for <Level1 /> level!
                        </>}
                    </p>
                    <p className="mt-2 text-white text-opacity-50 text-center">When the boost number of the server increases, <br /> it gains new features. You can cancel the <br /> boost after boosting the server! <Tippy placement="top" content="Anderson, don't talk out loud. You lower the IQ of the whole street.">
                        <span className="text-xs opacity-25">
                            ^_^
                        </span>
                    </Tippy></p>
                </div>
                <div className="flex items-center justify-center mb-10 mt-20 gap-x-4">
                    <button onClick={() => setM1(!M1)} className="hover:opacity-75 cursor-pointer font-semibold w-40 py-3 rounded-xl bg-amber-400 text-zinc-900 shadow-lg shadow-amber-600/10">
                        Boosters
                    </button>
                    <button onClick={() => setM2(!M2)} className="hover:opacity-75 cursor-pointer font-semibold w-40 py-3 rounded-xl bg-emerald-400 text-zinc-900 shadow-lg shadow-emerald-600/10">
                        Boost
                    </button>
                    <button onClick={() => setM3(!M3)} className="hover:opacity-75 cursor-pointer font-semibold w-40 py-3 rounded-xl bg-rose-400 text-zinc-900 shadow-lg shadow-rose-600/10">
                        Cancel Boost
                    </button>
                </div>
                <div className="grid grid-cols-12 md:max-w-screen-md mx-auto">
                    <div className="w-full h-full relative">
                        <div className={"mx-auto rounded-t-full w-2 bg-amber-400 " + (boost.guild.level >= 3 ? "h-full rounded-b-full" : (boost.guild.level >= 2 ? "h-2/3" : (boost.guild.level >= 1 ? "h-1/3" : "hidden")))} />
                        <div className={"mx-auto rounded-b-full w-2 bg-zinc-800 " + (boost.guild.level >= 3 ? "hidden" : (boost.guild.level >= 2 ? "h-1/3" : (boost.guild.level >= 1 ? "h-2/3" : "h-full rounded-t-full")))} />
                        <div className="absolute inset-0 flex flex-col items-center justify-between">
                            <Tippy placement="left" content={<>Unlock{boost.guild.level >= 1 ? "ed" : "s"} at <b>{boost.prices[0]}</b> boosts!</>}>
                                <i className={"my-16 h-8 fad fa-circle text-2xl cursor-pointer " + (boost.guild.level >= 1 ? "text-amber-500" : "text-zinc-700")} />
                            </Tippy>
                            <Tippy placement="left" content={<>Unlock{boost.guild.level >= 2 ? "ed" : "s"} at <b>{boost.prices[1]}</b> boosts!</>}>
                                <i className={"my-16 h-8 fad fa-circle text-2xl cursor-pointer " + (boost.guild.level >= 2 ? "text-amber-500" : "text-zinc-700")} />
                            </Tippy>
                            <Tippy placement="left" content={<>Unlock{boost.guild.level >= 3 ? "ed" : "s"} at <b>{boost.prices[2]}</b> boosts!</>}>
                                <i className={"my-16 h-8 fad fa-circle text-2xl cursor-pointer " + (boost.guild.level >= 3 ? "text-amber-500" : "text-zinc-700")} />
                            </Tippy>
                        </div>
                    </div>
                    <div className="col-span-11">
                        {boost.levels.map((_level, _index) => (
                            <div key={_index} className="relative">
                                <div className={(_index != 2 ? "mb-10" : "") + " lg:h-40 bg-black/20 rounded-xl shadow-lg shadow-black/10 p-3 flex items-center"}>
                                    <div className="arrow" />
                                    <div className="w-32">
                                        <h1 className="font-extrabold text-2xl text-center">{_index == 2 ? <Level3 /> : (_index == 1 ? <Level2 /> : <Level1 />)}</h1>
                                        <div className="w-full flex items-center justify-evenly">
                                            <b className="text-sm text-white font-extrabold">L</b>
                                            <b className="text-sm text-white font-extrabold">E</b>
                                            <b className="text-sm text-white font-extrabold">V</b>
                                            <b className="text-sm text-white font-extrabold">E</b>
                                            <b className="text-sm text-white font-extrabold">L</b>
                                        </div>
                                        <div className="mt-3 flex items-center justify-center">
                                            {boost.guild.level >= (_index + 1) ? <>
                                                <h1 className="font-bold text-emerald-400 text-lg"><i className="far fa-unlock-alt mr-1" /> Unlocked</h1>
                                            </> : <>
                                                <h1 className="font-bold text-rose-400 text-lg"><i className="far fa-lock-alt mr-1" /> Locked</h1>
                                            </>}
                                        </div>
                                        <h6 className="text-xs text-white/50 text-center">({boost.prices[_index]} boosts)</h6>
                                    </div>
                                    <div className="flex-1 pl-5 gap-2 grid grid-cols-1 md:grid-cols-2">
                                        {boost.guild.benefits.filter(_b => _b.level == (_index + 1)).map((benefit, __index) => (
                                            <div key={__index} className="h-10 text-sm flex items-center px-3 justify-between text-white bg-black/20 rounded">
                                                <div>
                                                    <i className={benefit.icon + " mr-2 " + (_index == 2 ? "text-rose-400" : (_index == 1 ? "text-fuchsia-400" : "text-sky-400"))} />
                                                    {benefit.title}
                                                </div>
                                                <Tippy placement="top" content={<p><span className="capitalize">{benefit.category}:</span> {benefit.infoText}</p>}>
                                                    <i className={"far fa-info-circle " + (_index == 2 ? "text-rose-400" : (_index == 1 ? "text-fuchsia-400" : "text-sky-400"))} />
                                                </Tippy>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </div>
    );
};