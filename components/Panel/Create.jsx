import { Menu, Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'
import Snackbar from '@windui/snackbar';
import axios from 'axios';
import JSConfetti from "js-confetti";

export default function Create({ isOpen, closeModal, mutateList }) {
    const [ loading, setLoading ] = useState(false);
    const [ url, setUrl ] = useState("");
    const [ banner, setBanner ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");

    const addPartner = async () => {
        if (loading) return;
        setLoading(true);
        
        const _add = await axios.post(
            "https://award-demo.clquu.repl.co/v1/partners/add?_token=" + 
            (typeof window !== "undefined"
            ? window.localStorage.getItem("$Award_token")
            : ""),
        {
            url,
            banner,
            title,
            description: desc
        });

        mutateList();
        setLoading(false);
        new Snackbar({
            options: {
                type: _add ? _add.data ? _add.data.success == true ? "success" : "error" : "error" : "error"
            },
            title: _add ? _add.data ? _add.data.success == true ? "Yaay!" : "Oops!" : "Oops!" : "Oops!",
            message: _add ? _add.data ? _add.data.message : "Something went wrong!" : "Something went wrong!",
        }).show();

        if (_add && _add.data && _add.data.success == true) {
            new JSConfetti().addConfetti();
            closeModal();

            setUrl("");
            setBanner("");
            setTitle("");
            setDesc("");
        };
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
                    Add Partner
                </Dialog.Title>
                <div className="my-5">
                    <span className="text-xs text-zinc-400 ml-2">Banner URL:</span>
                    <input value={banner} onChange={e => setBanner(e.target.value)} placeholder="https://..." type="text" className="mb-2 text-white bg-black/10 py-2 px-4 rounded-xl focus:outline-none w-full border border-white/10 focus:border-amber-400 focus:text-amber-400 transform duration-200" spellCheck={false} autoComplete={false} />
                    <span className="text-xs text-zinc-400 ml-2">Title:</span>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Award" type="text" className="mb-2 text-white bg-black/10 py-2 px-4 rounded-xl focus:outline-none w-full border border-white/10 focus:border-amber-400 focus:text-amber-400 transform duration-200" spellCheck={false} autoComplete={false} />
                    <span className="text-xs text-zinc-400 ml-2">Description:</span>
                    <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Lorem ipsum dolor sit amet." type="text" className="mb-2 text-white bg-black/10 py-2 px-4 rounded-xl focus:outline-none w-full border border-white/10 focus:border-amber-400 focus:text-amber-400 transform duration-200" spellCheck={false} autoComplete={false} />
                    <span className="text-xs text-zinc-400 ml-2">Website URL:</span>
                    <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://awardbot.me" type="text" className="text-white bg-black/10 py-2 px-4 rounded-xl focus:outline-none w-full border border-white/10 focus:border-amber-400 focus:text-amber-400 transform duration-200" spellCheck={false} autoComplete={false} />
                </div>

                <div className="mt-4 flex items-center space-x-2">
                    <button onClick={closeModal} className="flex items-center justify-center hover:opacity-75 cursor-pointer font-semibold w-20 py-2 rounded-xl bg-amber-400 text-zinc-900 shadow-lg shadow-amber-600/10">
                        Close
                    </button>
                    <button onClick={addPartner} className="flex items-center justify-center hover:opacity-75 cursor-pointer font-semibold w-20 py-2 rounded-xl bg-emerald-400 text-zinc-900 shadow-lg shadow-emerald-600/10">
                        {loading ? <i className="fad py-1 fa-spinner-third fa-spin" /> : "Add"}
                    </button>
                </div>
                </div>
            </Transition.Child>
            </div>
        </Dialog>
    </Transition>
  );
};