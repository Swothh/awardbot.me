import swr from "../../lib/swr";
import Nav from "../../components/Panel/Nav";
import { useState } from "react";
import Snackbar from "@windui/snackbar";
import axios from "axios";
import Create from "../../components/Panel/Create";

export default function Panel() {
    const [ loading, setLoading ] = useState(false);
    const [ modal, setModal ] = useState(false);
    const { data: _user } = swr("https://award-demo.clquu.repl.co/v1/auth/me");
	const user = _user ? _user.data : null;

    const { data: _partners, mutate } = swr("https://award-demo.clquu.repl.co/v1/others/partners");
    const partners = _partners ? _partners.data : null;

    const deletePartner = (id, _name) => {
        if (loading) return;
        setLoading(id);

        let autoCancel = setTimeout(() => {
            setLoading(false);
        }, 10000);
        
        new Snackbar({
            title: "Are you sure?",
            message: `Click confirm to delete the partner named '${_name}'.`,
            options: {
                type: "warning",
                duration: 10000,
                components: {
                    confirmEvent: async ({ $ }) => {
                        $.hide();
                        clearTimeout(autoCancel);
                        const _delete = await axios.post(
                            "https://award-demo.clquu.repl.co/v1/partners/delete?_token=" + 
                            (typeof window !== "undefined"
                            ? window.localStorage.getItem("$Award_token")
                            : ""),
                        {
                            id
                        });
                
                        mutate();
                        setLoading(false);
                        new Snackbar({
                            options: {
                                type: _delete ? _delete.data ? _delete.data.success == true ? "success" : "error" : "error" : "error"
                            },
                            title: _delete ? _delete.data ? _delete.data.success == true ? "Yaay!" : "Oops!" : "Oops!" : "Oops!",
                            message: _delete ? _delete.data ? _delete.data.message : "Something went wrong!" : "Something went wrong!",
                        }).show();
                    },
                    cancelEvent: ({ $ }) => {
                        clearTimeout(autoCancel);
                        setLoading(false);
                        $.hide();
                    }
                }
            }
        }).show();
    };

    return (
        <>
            {(!_user || !user || !_partners || !partners) && <div className="sm:my-10 p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
                <div className="flex col-span-5 items-center justify-center">
                    <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
                </div>
            </div>}
            {(user && partners && !user.permissions.some(_p => _p == "*" || _p == "VIEW_PANEL")) && <div className="sm:my-10 p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
                <div className="flex col-span-5 items-center justify-center">
                    <i className="fa fa-times text-rose-400 text-2xl" />
                    <h6 className="text-rose-400 ml-2">You are not authorized to view this page!</h6>
                </div>
            </div>}
            {(user && partners && user.permissions.some(_p => _p == "*" || _p == "VIEW_PANEL")) && <div className="w-full mt-10">
                <Create isOpen={modal} closeModal={() => setModal(false)} mutateList={mutate} />
                <Nav />
                <div className="flex items-center justify-between mt-5">
                    <h1 className="text-3xl text-white font-bold">Manage Partners</h1>
                    <button onClick={() => setModal(true)} className="text-black bg-amber-400 py-2 px-4 rounded-xl">
                        Add Partner
                    </button>
                </div>
                <div className="overflow-hidden rounded-xl mt-5">
                    <table className="min-w-full divide-y divide-zinc-800">
                        <thead className="bg-amber-400">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                                >
                                    Partner
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                                >
                                    Description
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                                >
                                    Link
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-black bg-opacity-10 divide-y divide-zinc-800">
                            {partners.map((partner, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-white">
                                            {partner.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-white">
                                            {partner.description.length > 50 ? (
                                                partner.description.slice(0, 47) + '...'
                                            ) : partner.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a href={partner.url} target="_blank" className="text-sky-400 italic underline text-sm">
                                            {partner.url}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => deletePartner(partner.id, partner.title)}>
                                            <i className={`transition-all duration-200 fal fa-${loading == partner.id ? "spinner-third fa-spin rounded-full" : "trash-alt rounded-xl"} text-rose-400 bg-rose-400/10 p-3`} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {partners.length < 1 && <h1 className="bg-black/10 rounded-b-xl text-white font-semibold text-center py-3">No partners!</h1>}
                </div>
            </div>}
        </>
    );
};;