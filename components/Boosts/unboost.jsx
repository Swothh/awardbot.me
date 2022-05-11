import { Menu, Dialog, Transition } from '@headlessui/react'
import {  useRef, useState, Fragment, useEffect } from 'react'
import axios from 'axios';
import Snackbar from '@windui/snackbar';
import Countdown from "../Countdown";
import JSConfetti from 'js-confetti';

export default function Boost({ isOpen, closeModal, user, guild, boost, mutate }) {
  const [ loading, setLoading ] = useState(false);
  const boostServer = async id => {
    if (loading) return;
    setLoading(id);

    const _boost = await axios.delete(
        "https://award-demo.clquu.repl.co/v1/boost/" + guild.id +
        "?_token=" + (typeof window !== "undefined" ? window.localStorage.getItem("$Award_token") : "") + 
        "&b=" + id
    );

    if (_boost?.data?.success == true) {
        await mutate();
    };

    setLoading(false);
    return new Snackbar({
        options: {
            type: _boost?.data?.success ? "success" : "error"
        },
        title: _boost?.data?.success ? "Yaay!" : "Oops!",
        message: _boost?.data?.message || "Something went wrong!"
    }).show();
  };

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
                    Cancel boost on server?
                </Dialog.Title>
                <div className="my-5">
                    <div className={"grid grid-cols-3 bg-black/20 text-white rounded-xl " + ((boost.user.boosts || []).filter(_b => _b.used_in_id == guild.id && Date.now() < (_b.expires_at || Infinity)).length > 6 ? "h-96 overflow-y-scroll" : "")}>
                        <div className="col-span-2">
                            {(boost.user.boosts || []).filter(_b => _b.used_in_id == guild.id && Date.now() < (_b.expires_at || Infinity)).map((_boost, __i) => (
                                <div key={__i} className={"h-16 space-x-2 border-b border-white/10 flex items-center justify-center " + (__i % 2 == 1 ? "bg-black/10" : "")}>
                                    <div className="text-white flex items-center w-12 justify-center">
                                        <span className="opacity-50 text-xs">#</span><h1 className="text-lg font-bold">{__i + 1}</h1>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <h1 className="font-semibold text-sm">Boost #{__i + 1}</h1>
                                            <span className="text-sky-400 bg-sky-400 bg-opacity-10 py-0.5 px-2 rounded-xl text-xs">
                                                Using at <b className="font-semibold">{_boost.used_in}</b>
                                            </span>
                                        </div>
                                        <p className={"text-[10px] mt-1 " + (((_boost.expires_at || Infinity) - Date.now()) <= 86400000 ? "boost-warning" : (((_boost.expires_at || Infinity) - Date.now()) <= 1296000000 ? "text-sky-400" : "text-emerald-400"))}>
                                            <Countdown ms={(_boost.expires_at || Infinity) - Date.now()} isBoost={true} line={false} />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {(boost.user.boosts || []).filter(_b => _b.used_in_id == guild.id && Date.now() < (_b.expires_at || Infinity)).map((_boost, __i) => (
                                <div key={__i} className={"h-16 space-x-2 border-b border-white/10 flex items-center justify-end px-3 " + (__i % 2 == 1 ? "bg-black/10" : "")}>
                                    <button onClick={() => boostServer(_boost.id)} className="flex items-center justify-center font-semibold w-28 py-2 rounded-xl shadow-lg hover:opacity-75 cursor-pointer text-rose-400 bg-rose-400/10 shadow-rose-600/5">
                                        {loading == _boost.id ? <i className="py-1 fad fa-spinner-third fa-spin" /> : "Cancel"}
                                    </button>
                                </div>
                            ))}
                        </div>
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