import Main from "../../components/Account/Connections";
import Countdown from "../../components/Countdown";
import { useRouter } from "next/router";
import swr from "../../lib/swr";
import Tippy from "@tippyjs/react";
import Snackbar from "@windui/snackbar";
import axios from "axios";
import Avatar from "../../components/Avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthCode from 'react-auth-code-input';

const DefaultResponse = () => {
  return (
    <div className="p-5 lg:p-10 lg:py-20 w-full lg:grid lg:grid-cols-5 gap-4">
      <div className="flex flex-col col-span-5 items-center justify-center">
        <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
        <p className="italic text-white">
          <strong>Tip: </strong>Award reached 80 servers on December 26 2021.
        </p>
      </div>
    </div>
  );
};

export default function Overview({ $ }) {
  const { id } = useRouter().query;
  const { data: _user } = swr("https://api.awardbot.me/v1/auth/me");
  const user = _user ? _user.data : null;
  const [pin, setPin] = useState('');
  const [pinEntered, setPinEntered] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => { setPinEntered(pinEntered) }, [pinEntered])
  const copyToClipboard = (text) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    new Snackbar({
      options: { position: "top", type: "info" },
      title: "Yaay!",
      message: `
    <div class="text-left">
    The link has been copied to clipboard.<br />
    <p class="text-sm">${text}</p>
    </div>
    `,
    }).show();
  };

  const { data: _overview } = swr(
    "https://api.awardbot.me/v1/giveaway/" + id + "/overview"
  );
  const overview = _overview ? _overview.data : null;
  const handleOnChange = async (res) => {
    setError(false);
    setLoading(false);
    setPin(res)
  };
  useEffect(() => {
    if(pin.length > 5) {
      setLoading(true)
        setTimeout(async() => {
          try {
            const _request = await axios.post(
              "https://api.awardbot.me/v1/giveaway/" +
              overview.id +
              "/check/pin?q="+pin+"&_token=" +
              window?.localStorage?.getItem("$Award_token")
            );
            if (_request && _request.data) {
              if (_request.data.success) {
                setPinEntered(true)
                setLoading(false);
              } else {
                setLoading(false);
                return setError(_request.data.message);
              }
            } else {
              setLoading(false);
              return setError("Something went wrong...");
            }
          } catch {
            setLoading(false);
            return setError("Something went wrong...");
          }
        }, 500)
    }
  }, [pin])
  const JoinGiveaway = async (giveaway) => {
    if (_user && user) {
      if (giveaway.status !== "CONTINUES")
        return new Snackbar({
          options: { type: "error" },
          title: "Oops!",
          message: "This giveaway has been finished.",
        }).show();
      const _request = await axios.post(
        "https://api.awardbot.me/v1/giveaway/" +
        giveaway.id +
        "/join?pin="+pin+"&_token=" +
        window?.localStorage?.getItem("$Award_token")
      );
      if (_request && _request.data) {
        if (_request.data.success) {
          return new Snackbar({
            options: { type: "success" },
            title: "Yaay!",
            message: "You successfully joined the giveaway.",
          }).show();
        } else {
          return new Snackbar({
            options: { type: "error" },
            title: "Oops!",
            message: _request.data.message,
          }).show();
        }
      } else {
        return new Snackbar({
          options: { type: "error" },
          title: "Oops!",
          message: "Something went wrong...",
        }).show();
      }
    } else {
      return new Snackbar({
        options: { type: "error" },
        title: "Oops!",
        message: "You must login for join the giveaway.",
      }).show();
    }
  };
  const OverviewGiveaway = () => {
    return <>
      <div className="my-16 flex flex-col items-center w-full justify-center">
        <span className="text-transparent text-3xl font-extrabold pr-1 bg-clip-text bg-gradient-to-br from-amber-400 to-amber-700">
          {overview.title}
        </span>
        <p className="text-white text-center text-opacity-50 text-md">
          {overview.description}
        </p>
      </div>
      <div className="my-20">
        <p className="text-white text-opacity-75 text-center text-base pr-1">
          This giveaway will expire after time:
        </p>
        <p className="mb-3 text-center text-xl font-semibold uppercase pr-1 text-white">
          <Countdown
            line={false}
            ms={overview.started_at + overview.duration - Date.now()}
          />
        </p>
        <div className="mt-10"></div>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9558877247962310" crossorigin="anonymous"></script>
        <ins className="adsbygoogle"
          data-ad-client="ca-pub-9558877247962310"
          data-ad-slot="7666267298"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({ });
        </script>
      </div>
      <div className="mb-20 w-full h-auto grid grid-cols-1 lg:grid-cols-12 lg:gap-x-4">
        <div className="h-full w-full text-white lg:col-span-3 mb-5 lg:mb-0">
          <div className="h-auto top-20 transition-all duration-200 w-full bg-black bg-opacity-10 rounded-lg p-4">
            <div>
              <p className="text-xl font-medium text-white">
                <i className="fal fa-users text-amber-400 mr-2" />
                Total Participants
              </p>
              <p className="flex items-center text-white text-lg">
                <i className="fal fa-horizontal-rule mr-2" />
                {overview.participants.length}
              </p>
            </div>
            <div className="mt-7">
              <p className="text-xl font-medium text-white">
                <i className="fal fa-gift text-amber-400 mr-2" />
                Prize
              </p>
              <p className="flex items-center text-white text-lg">
                <i className="fal fa-horizontal-rule mr-2" />
                {overview.prize}
              </p>
            </div>
            <div className="mt-7">
              <p className="text-xl font-medium text-white">
                <i className="fal fa-crown text-amber-400 mr-2" />
                Winners Count
              </p>
              <p className="flex items-center text-white text-lg">
                <i className="fal fa-horizontal-rule mr-2" />
                {overview.winners_count}
              </p>
            </div>
            {overview.status !== "CONTINUES" && (
              <div className="mt-7">
                <p className="text-xl font-medium text-white">
                  <i className="fal fa-users-crown text-amber-400 mr-2" />
                  Winners List
                </p>
                <div className="flex items-center gap-2">
                  {overview.winners.map((winner) => (
                    <Link href={`/user/${winner.id}`} key={winner.id}>
                      <div key={winner.id}>
                        <Avatar
                          tippy={winner.username}
                          src={`https://cdn.discordapp.com/avatars/${winner.id}/${winner.avatar}`}
                          width="32"
                          height="32"
                          className="cursor-pointer rounded-full"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-full w-full text-white lg:col-span-6 mb-5 lg:mb-0">
          <div className="h-auto top-20 transition-all duration-200 w-full bg-black bg-opacity-10 rounded-lg p-4">
            <div>
              <p className="text-xl font-medium text-white">
                <i className="fal fa-map-marker-exclamation text-amber-400 mr-2" />
                Requirements
              </p>

              {overview.requireds && overview.requireds.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-5">
                  {overview.requireds.map((item, index) => (
                    <button
                      onClick={() => global.openTabInWindow(item.url)}
                      key={index}
                      className={`w-full px-4 py-2 ${item.border} ${item.bg} border-2 rounded-lg text-white`}
                    >
                      <div className="flex items-center justify-between">
                        <img src={item.img} width={32} height={32} />
                        <div className="text-center">
                          <p>{item.displayType}</p>
                          <p className="text-xs text-white text-opacity-50">
                            {item.type === "join_server" ? (
                              <>{item.url}</>
                            ) : (
                              (item.type === "check_role" ? (
                                <>{item.roleName}</>
                              ) : (
                                <>{item.username ? '@' + item.username : item.id}</>
                              ))
                            )}
                          </p>
                        </div>
                        <div />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="italic text-base text-white text-opacity-50">
                  No requirements.
                </p>
              )}
            </div>

            <div className="mt-16 flex items-center justify-center space-x-3">
              <button
                onClick={() => JoinGiveaway(overview)}
                className={`${overview.status !== "CONTINUES"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                  } w-full px-4 py-2 bg-green-500/20 border-green-600/20 border-2 rounded-lg text-white`}
              >
                <div className="flex items-center justify-between">
                  <img src="/img/tada.svg" width={32} height={32} />
                  <div className="text-center">
                    <p>Join the Giveaway</p>
                    <p className="text-xs text-white text-opacity-50"></p>
                  </div>
                  <div />
                </div>
              </button>
              {overview.status == "FINISHED" && (
                <button className="w-full px-4 py-2 bg-amber-500/20 border-amber-600/20 border-2 rounded-lg text-white">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-xs">
                        If you want to reroll, you can do it from the
                        dashboard!
                      </p>
                    </div>
                    <div />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="h-full w-full text-white lg:col-span-3 mb-5 lg:mb-0">
          <div className="h-auto top-20 transition-all duration-200 w-full bg-black bg-opacity-10 rounded-lg p-4">
            <div>
              <p className="text-xl font-medium text-white">
                <i className="fal fa-link text-amber-400 mr-2" />
                Share with your friends
              </p>
              <p className="text-xs text-white text-opacity-50">
                Share the giveaway with your friends and let them win
                prizes!
              </p>
              <p className="flex items-center text-white text-lg">
                <input
                  disabled
                  className="mt-2 text-xs py-2 px-4 w-full text-white bg-black bg-opacity-20 rounded-lg"
                  value={`https://awardbot.me/g/${id}?r=_share`}
                />
                <Tippy content="Copy to clipboard.">
                  <i
                    onClick={() =>
                      copyToClipboard(
                        `https://awardbot.me/g/${id}?r=_share`
                      )
                    }
                    className="fal fa-paste cursor-pointer text-white ml-2"
                  />
                </Tippy>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  }
  
  return (
    <div className="py-5 lg:py-10 w-full">
      {_overview ? (
        overview ? (
          !overview.pinActive ? (
            <OverviewGiveaway />
          ) : (
            pinEntered ? (
              <OverviewGiveaway />
            ) : (
              <>
                <div className="flex w-full justify-center">
                  <div className="w-full xl:w-[33%] bg-neutral-900/50 text-white text-center p-6 rounded-lg">
                    <div className="w-full flex flex-col justify-center items-center">
                      <div className="w-24 h-24 bg-amber-500/10 flex items-center justify-center text-center p-4 rounded-full">
                        <i className="fal fa-lock fa-3x text-amber-500" />
                      </div>

                      <p className="text-3xl font-semibold mt-5">Easy Peasy</p>
                      <p className="text-md font-normal mt-2 text-zinc-500">To participate in this giveaway, you must enter the giveaway password to continue.</p>
                      <AuthCode
                        characters={6}
                        onChange={handleOnChange}
                        containerClassName='grid grid-cols-3 md:grid-cols-6 mt-2 gap-y-2 md:gap-y-0 xl:w-full gap-x-2'
                        inputClassName={`${error ? 'border-red-500 text-red-500' : (loading ? 'border-blue-500 text-blue-500' : 'text-amber-500 border-amber-500')} w-12 text-4xl p-2 text-center font-light bg-transparent border-2 outline-none rounded-lg`}
                      />

                      <div className={`w-full ${error ? 'bg-red-500' : (loading ? 'bg-blue-500' : (pinEntered ? 'bg-green-700' : 'bg-zinc-500'))} mt-5 rounded-lg px-5 py-3 shadow-xl`}>
                        {Number(6 - pin.length) !== 0 ? (
                          <>{Number(6 - pin.length)} digits left</>
                        ) : (
                          loading ? (
                            <i className="fal fa-spinner-third fa-spin text-center w-full" />
                          ) : (
                            error ? (
                              <>{error}</>
                            ) : (
                              <>Lets go!</>
                            )
                          )
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </>
            )
          )
        ) : (
          <DefaultResponse />
        )
      ) : (
        <DefaultResponse />
      )}
    </div>
  );
}
