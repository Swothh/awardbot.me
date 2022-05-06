import Link from "next/link";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import swr from '../../../lib/swr';
import Snackbar from '@windui/snackbar';
import axios from "axios";

const Giveaways = ({ $, title, description, giveaways, id, type }) => {
  const router = useRouter();
  const reroll = async id => {
    const _reroll = await axios.get('https://awardbot-demo.herokuapp.com/v1/giveaway/'+id+'/reroll?_token='+window?.localStorage?.getItem("$Award_token")).then(res => res.data);
    if(_reroll) {
      if(_reroll.success) {
        return new Snackbar({ options: { type: 'success' }, title: 'Yaay!', message: _reroll.message }).show();
      } else {
        return new Snackbar({ options: { type: 'error' }, title: 'Oops!', message: _reroll.message }).show();
      }
    } else {
      return new Snackbar({ options: { type: 'error' }, title: 'Oops!', message: 'Something went wrong...' }).show();
    }
  }
  const deletegiveaway = async id => {
    const _delete = await axios.get('https://awardbot-demo.herokuapp.com/v1/giveaway/'+id+'/cancel?_token='+window?.localStorage?.getItem("$Award_token")).then(res => res.data);
    if(_delete) {
      if(_delete.success) {
        return new Snackbar({ options: { type: 'success' }, title: 'Yaay!', message: _delete.message }).show();
      } else {
        return new Snackbar({ options: { type: 'error' }, title: 'Oops!', message: _delete.message }).show();
      }
    } else {
      return new Snackbar({ options: { type: 'error' }, title: 'Oops!', message: 'Something went wrong...' }).show();
    }
  }
  return (
    <>
      <div className="pt-5 md:pt-0 md:flex md:items-center md:justify-between mb-10">
        <div>
          <p className="text-xl font-medium text-white">
            {title} (
            {
              giveaways.filter((a) =>
                type.toLowerCase() !== "all"
                  ? (type === "ENDED"
                    ? a.status === "FINISHED" ||
                      a.status === "CANCELLED" ||
                      a.status === "ENDED"
                    : a.status === type)
                  : a
              ).length
            }
            )
          </p>
          <p className="text-white text-sm text-opacity-50">{description}</p>
        </div>
        <div>
          <Link href={`/dashboard/${id}/giveaways/create`}>
            <a className="mt-5 md:mt-0 flex md:block text-center py-3 font-medium px-8 text-zinc-900 bg-amber-400 transition duration-100 hover:bg-amber-500 rounded-xl">
              Create
            </a>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-800 sm:rounded-lg">
              <table className="min-w-full divide-y divide-zinc-800">
                <thead className="bg-amber-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      Prize
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      Total Winners
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      Total Participants
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      Pin
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
                  {giveaways
                    .filter((a) =>
                      type.toLowerCase() !== "all"
                        ? (type === "ENDED"
                          ? a.status === "FINISHED" ||
                            a.status === "CANCELLED" ||
                            a.status === "CONTINUES" ||
                            a.status === "ENDED"
                          : a.status === type.toUpperCase())
                        : a
                    )
                    .sort(
                      (a, b) =>
                        b.status.localeCompare("CONTINUES") -
                        a.status.localeCompare("CONTINUES")
                    )
                    .map((giveaway, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {giveaway.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {giveaway.prize}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {giveaway.winners_count}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`${
                              giveaway.status == "FINISHED"
                                ? "bg-sky-500 text-sky-500"
                                : giveaway.status == "CONTINUES"
                                ? "bg-emerald-500 text-emerald-500"
                                : "bg-rose-500 text-rose-500"
                            } text-center bg-opacity-10 rounded-full px-3 py-2 text-xs`}
                          >
                            {giveaway.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {giveaway.participants.length}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {giveaway.pin || "N/A"}
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                          <Tippy content="Go to the giveaway overview page">
                            <div
                              onClick={() => router.push(`/g/${giveaway.id}`)}
                              className="flex items-center bg-blue-500 hover:opacity-75 px-3 py-2 cursor-pointer rounded-md transition-all duration-200 text-white"
                            >
                              <i className="fa fa-link" />
                            </div>
                          </Tippy>
                            {giveaway.status === "CONTINUES" ? (
                              <Tippy content="Delete the giveaway">
                              <div
                                onClick={() => deletegiveaway(giveaway.id)}
                                className="flex items-center bg-red-500 hover:opacity-75 px-3 py-2 cursor-pointer rounded-md transition-all duration-200 text-white"
                              >
                                <i className="fa fa-trash" />
                              </div>
                              </Tippy>
                            ) : (
                              <Tippy content="Reroll the giveaway">
                                <div
                                  onClick={() => reroll(giveaway.id)}
                                  className="flex items-center bg-amber-500 hover:opacity-75 px-3 py-2 cursor-pointer rounded-md transition-all duration-200 text-white"
                                >
                                  <i className="fa fa-sync-alt" />
                                </div>
                              </Tippy>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Giveaways;
