import { Menu, Dialog, Transition } from '@headlessui/react'
import {  useRef, useState, Fragment, useEffect } from 'react'
import Countdown from "../Countdown";

export default function Boosters({ isOpen, closeModal, user, guild, boost }) {
  let _boosters = {};
  boost.guild.boosts.forEach(_b => {
    if (!_boosters[_b.user.id]) {
        _boosters[_b.user.id] = {
            user: _b.user,
            boosts: []
        };
    };

    _boosters[_b.user.id].boosts.push({
        id: _b.id,
        expires_at: _b.expires_at
    });
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
        >
            <div className={"fixed inset-0 bg-black/75 " + (isOpen ? "modal-fade-in" : "modal-fade-out")} />
            <div className="min-h-screen px-4 text-center">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
            >
                &#8203;
            </span>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="inline-block w-full max-w-md p-5 my-8 overflow-hidden text-left align-middle transition-all transform bg-zinc-900 shadow-xl rounded-2xl">
                <Dialog.Title
                    as="h1"
                    className="text-2xl font-extrabold leading-6 text-white"
                >
                    Boosters
                </Dialog.Title>
                <div className="my-5">
                    <div className={"bg-black/20 text-white rounded-xl " + ((boost.guild.boosts || []).length > 6 ? "h-96 overflow-y-scroll" : "")}>
                        {Object.keys(_boosters).map((_booster, _index) => <div className="w-full grid grid-cols-2" key={_index}>
                            <div className={"h-full flex space-x-3 items-center px-5 border-b border-r border-white/10 " + (_index % 2 == 0 ? "bg-black/10" : "")}>
                                <img 
                                    src={`https://cdn.discordapp.com/avatars/${_boosters[_booster].user.id}/${_boosters[_booster].user.avatar}`} 
                                    onError={e => (e.target.src = "/img/logo.png")}
                                    alt={_boosters[_booster].user.username}
                                    className="h-12 w-12 rounded-full"
                                />
                                <h1 className="font-bold text-lg text-white">{_boosters[_booster].user.username}<span className="font-normal text-sm opacity-50">#{_boosters[_booster].user.discriminator}</span></h1>
                            </div>
                            <div>
                                {_boosters[_booster].boosts.map((_boost, __i) => (
                                    <div key={__i} className={"h-16 space-x-2 border-b border-white/10 flex items-center justify-center " + (_index % 2 == 1 ? "bg-black/10" : "")}>
                                        <div className="text-white flex items-center w-12 justify-center">
                                            <span className="opacity-50 text-xs">#</span><h1 className="text-lg font-bold">{__i + 1}</h1>
                                        </div>
                                        <p className={"text-xs flex-1 " + (((_boost.expires_at || Infinity) - Date.now()) <= 86400000 ? "boost-warning" : (((_boost.expires_at || Infinity) - Date.now()) <= 1296000000 ? "text-sky-400" : "text-emerald-400"))}>
                                            <Countdown ms={(_boost.expires_at || Infinity) - Date.now()} isBoost={true} />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>)}
                        {(boost.guild.boosts || []).length <= 0 && <div className="col-span-2 py-3 flex items-center justify-center">
                            <h1 className="font-bold text-white text-opacity-25 uppercase text-xs">Nobody boosted the server!</h1>
                        </div>}
                    </div>
                </div>

                <div className="mt-4">
                    <button onClick={closeModal} className="flex items-center justify-center hover:opacity-75 cursor-pointer font-semibold w-20 py-2 rounded-xl bg-amber-400 text-zinc-900 shadow-lg shadow-amber-600/10">
                        Close
                    </button>
                </div>
                </div>
            </Transition.Child>
            </div>
        </Dialog>
    </Transition>
  );
};