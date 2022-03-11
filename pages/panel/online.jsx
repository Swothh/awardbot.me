import swr from "../../lib/swr";
import Nav from "../../components/Panel/Nav";
import { useState, useEffect } from "react";
import Snackbar from "@windui/snackbar";
import axios from "axios";
import Create from "../../components/Panel/Create";

export default function Panel() {
    const { data: _user } = swr("https://api.awardbot.me/v1/auth/me");
	const user = _user ? _user.data : null;

    const { data: _online, mutate } = swr("https://api.awardbot.me/__/clients");
    const online = _online ? _online.data : null;

    useEffect(() => {
        mutate();
        setInterval(mutate, 3000);
    }, []);

    return (
        <>
            {(!_user || !user || !_online || !online) && <div className="sm:my-10 p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
                <div className="flex col-span-5 items-center justify-center">
                    <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
                </div>
            </div>}
            {(user && online && !user.permissions.some(_p => _p == "*" || _p == "VIEW_CLIENTS")) && <div className="sm:my-10 p-5 lg:p-10 w-full lg:grid lg:grid-cols-5 gap-4">
                <div className="flex col-span-5 items-center justify-center">
                    <i className="fa fa-times text-rose-400 text-2xl" />
                    <h6 className="text-rose-400 ml-2">You are not authorized to view this page!</h6>
                </div>
            </div>}
            {(user && online && user.permissions.some(_p => _p == "*" || _p == "VIEW_CLIENTS")) && <div className="w-full mt-10">
                <Nav />
                <div className="mt-5">
                    <h1 className="text-3xl text-white font-bold">Online Users</h1>
                </div>
                <div className="overflow-hidden rounded-xl mt-5">
                    <table className="min-w-full divide-y divide-zinc-800">
                        <thead className="bg-amber-400">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                                >
                                    User
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                                >
                                    Connection Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                                >
                                    Socket ID
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-black bg-opacity-10 divide-y divide-zinc-800">
                            {online.map((_, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                                        <img className="w-12 h-12 rounded-full" src={`https://cdn.discordapp.com/avatars/${_.user.id + '/' + _.user.avatar}`} />
                                        <div className="text-sm text-white">
                                            {_.user.username + "#" + _.user.discriminator}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-white">
                                            {_._connected}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-white">
                                            {_._id}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {online.length < 1 && <h1 className="bg-black/10 rounded-b-xl text-white font-semibold text-center py-3">No onlines!</h1>}
                </div>
            </div>}
        </>
    );
};