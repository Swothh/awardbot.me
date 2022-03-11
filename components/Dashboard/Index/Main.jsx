import Tippy from "@tippyjs/react";
import Link from "next/link";
import Avatar from "../..//Avatar";
import moment from "moment";
import "moment-timezone";
export default function Main({ $, logs, stats, guild }) {
  const logsArray = [
    {
      type: "unboost",
      message: $.dashboard.auditLog.unboost,
      styles: {
        bg: "bg-red-500",
        border: "border-red-500/50",
        text: "text-red-500",
      },
    },
    {
        type: "boost",
        message: $.dashboard.auditLog.boost,
        styles: {
          bg: "bg-green-500",
          border: "border-green-500/50",
          text: "text-green-500",
        },
      },
      
    {
      type: "giveaway_create",
      message: $.dashboard.auditLog.giveaway_create,
      styles: {
        bg: "bg-green-500",
        border: "border-green-500/50",
        text: "text-green-500",
      },
    },
    
    {
      type: "giveaway_join",
      message: $.dashboard.auditLog.giveaway_join,
      styles: {
        bg: "bg-green-500",
        border: "border-green-500/50",
        text: "text-green-500",
      },
    },
    {
      type: "giveaway_delete",
      message: $.dashboard.auditLog.giveaway_delete,
      styles: {
        bg: "bg-red-500",
        border: "border-red-500/50",
        text: "text-red-500",
      },
    },
    {
      type: "giveaway_finish",
      message: $.dashboard.auditLog.giveaway_finish,
      styles: {
        bg: "bg-sky-500",
        border: "border-sky-500/50",
        text: "text-sky-500",
      },
    },
    {
      type: "giveaway_reroll",
      message: $.dashboard.auditLog.giveaway_reroll,
      styles: {
        bg: "bg-sky-500",
        border: "border-sky-500/50",
        text: "text-sky-500",
      },
    },
  ];
  return (
    <>
      <div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="white-border animateHeader bg-black bg-opacity-10 rounded-xl p-5 flex items-center justify-between">
            <div>
              <h1 className="text-sky-400 font-medium">{$.dashboard.stats.total}</h1>
              <h3 className="text-3xl text-white font-semibold">
                {stats.total_giveaways.toLocaleString()}
              </h3>
            </div>
            <i className="far fa-gifts text-sky-400 text-6xl"></i>
          </div>
          <div className="white-border animateHeader bg-black bg-opacity-10 rounded-xl p-5 flex items-center justify-between">
            <div>
              <h1 className="text-teal-400 font-medium">{$.dashboard.stats.active}</h1>
              <div className="flex items-center space-x-4">
                <h3 className="text-3xl text-white font-semibold">
                  {stats.active_giveaways.toLocaleString()}
                  <span className="text-sm opacity-50">
                    /{stats.max_limit.toLocaleString()}
                  </span>
                </h3>
                <Link href={"/boosts/" + guild.id}>
                  <a className="text-emerald-400 bg-emerald-400/10 rounded-md">
                    <Tippy
                      placement="right"
                      content={$.dashboard.stats.activeTippy}
                    >
                      <i className="w-6 h-6 text-xs flex items-center justify-center far fa-level-up-alt" />
                    </Tippy>
                  </a>
                </Link>
              </div>
            </div>
            <i className="far fa-heart-rate text-teal-400 text-6xl"></i>
          </div>
          <div className="white-border animateHeader bg-black bg-opacity-10 rounded-xl p-5 flex items-center justify-between">
            <div>
              <h1 className="text-rose-400 font-medium">{$.dashboard.stats.ended}</h1>
              <h3 className="text-3xl text-white font-semibold">
                {stats.ended_giveaways.toLocaleString()}
              </h3>
            </div>
            <i className="far fa-heart-broken text-rose-400 text-6xl"></i>
          </div>
          <div className="white-border animateHeader bg-black bg-opacity-10 rounded-xl p-5 flex items-center justify-between">
            <div>
              <h1 className="text-violet-400 font-medium">
                {$.dashboard.stats.participants}
              </h1>
              <h3 className="text-3xl text-white font-semibold">
                {stats.total_joins.toLocaleString()}
              </h3>
            </div>
            <i className="far fa-users text-violet-400 text-6xl"></i>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-2 italic">
        <p className="text-xl font-medium text-white">{$.dashboard.auditLog.title}</p>
        <p className="text-white text-sm text-opacity-50">
        {$.dashboard.auditLog.description}
        </p>
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
                      {$.dashboard.auditLog.table.user}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      {$.dashboard.auditLog.table.date}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      {$.dashboard.auditLog.table.action}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-zinc-900 uppercase tracking-wider"
                    >
                      {$.dashboard.auditLog.table.message}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black bg-opacity-10 divide-y divide-zinc-800">
                  {logs.length > 0 && logs.sort((a,b) => b.date - a.date).map((log, logIndex) => (
                    <tr key={logIndex}>
                      {console.log(logs)}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white flex items-center">
                          <Avatar
                            src={`https://cdn.discordapp.com/avatars/${log.data.user.id}/${log.data.user.avatar}`}
                            width="32"
                            height="32"
                            className="rounded-full"
                          />
                          <p className="text-xl font-medium ml-2">
                            {log.data.user.username}
                            <span className="text-white text-opacity-20 text-base italic font-thin">
                              #{log.data.user.discriminator}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          <p className="text-normal">
                            {moment(Number(log.date)).format("dddd, MMM D, YYYY hh:mm A")}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white flex items-center">
                          <p
                            className={`${
                              logsArray.find(
                                (a) => a.type === log.type.toLowerCase()
                              )
                                ? logsArray.find(
                                    (a) => a.type === log.type.toLowerCase()
                                  ).styles.bg +
                                  " " +
                                  logsArray.find(
                                    (a) => a.type === log.type.toLowerCase()
                                  ).styles.border +
                                  " " +
                                  logsArray.find(
                                    (a) => a.type === log.type.toLowerCase()
                                  ).styles.text +
                                  " "
                                : ""
                            } text-normal border text-sm text-center bg-opacity-10 rounded-full px-3 py-2 text-white flex items-center`}
                          >
                            {log.type.toUpperCase().split('_').join(" ")}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          <p className="text-normal">
                            {logsArray.find(
                                (a) => a.type === log.type.toLowerCase()
                              ) ? logsArray.find(
                                (a) => a.type === log.type.toLowerCase()
                              ).message : "Message not found."}
                          </p>
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
}
