import Link from "next/link";
import { useRef, useState } from "react";
import Key from "../components/Key";
import swr from "../lib/swr";
import Image from "next/image";

export default function Index({ $token, $url, $ }) {
  const [enterLoading, setEnterLoading] = useState(false);
  const mainButton = useRef(null);

  if ($token) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("$Award_token", $token);
      window.location.href = $url || "/";
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("Award", (event) => {
      if (event.detail.key == "enter") {
        if (mainButton.current) {
          mainButton.current.click();
          event.preventDefault();
        }
      }
    });
  }
	const addBot = () => {
		let $w = window.open(
			"https://award-demo.clquu.repl.co/v1/invite/bot?__w=1&__beta=" + 
			(process.env.NODE_ENV === 'production' ? 'false' : 'true'),
			"_blank",
			"toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=400,height=1400"
		);

		let $i = setInterval(async () => {
			if (!$w.closed) return;
			const push = () => router.push("/dashboard/added");
			const check = await axios.get("https://award-demo.clquu.repl.co/v1/auth/me?_token=" + window?.localStorage?.getItem("$Award_token"));
			clearInterval($i);
		}, 1000);
	};
  const { data: _user } = swr("https://award-demo.clquu.repl.co/v1/auth/me");
  const user = _user ? _user.data : null;
  const { data: _stats } = swr("https://award-demo.clquu.repl.co/v1/others/stats");
  const stats = _stats ? _stats.data : null;
  const Loading = () => <i className="fa fa-spinner-third fa-spin text-white" />;
  const statsArray = [
    { label: $.index.statistics.labels.guilds, value: _stats ? (stats ? stats.guilds.toLocaleString() : 0) : 0},
    { label: $.index.statistics.labels.giveaways, value: _stats ? (stats ? stats.total_giveaways.toLocaleString() : 0) : <Loading />},
    { label: $.index.statistics.labels.joins, value: _stats ? (stats ? stats.total_joins.toLocaleString() : 0) : <Loading />},
    { label: $.index.statistics.labels.members, value: _stats ? (stats ? stats.users.toLocaleString() : 0) : <Loading />}
  ]
  return (
    <>
      <div className="py-20 mb-40 max-w-3xl mx-auto">
        <p className="animateHeader text-4xl font-extrabold text-center text-white">
          {$.index.title}
        </p>
        <p className="animateHeader text-white text-opacity-50 text-center mt-5">
          {$.index.description}
        </p>
        <div className="animateHeader mt-10 flex flex-wrap items-center justify-center gap-x-4">
          {!_user ? (
            <button className="shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium px-8 text-zinc-900 bg-amber-400 hover:bg-opacity-50 transition duration-200">
              <i className="fad fa-spinner-third fa-spin" />
            </button>
          ) : (
            <Link
              href={user ? "/dashboard" : "/api/auth/login"}
              locale={!user ? "en" : false}
            >
              <a
                onClick={() => setEnterLoading(true)}
                ref={mainButton}
                className={
                  "flex items-center px-6 justify-center gap-x-2 shadow-lg shadow-amber-600/20 rounded-xl py-4 font-medium bg-gradient-to-bl from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white " +
                  (user ? "w-auto" : "w-auto")
                }
              >
                {enterLoading ? (
                  <i className="fad fa-spinner-third fa-spin" />
                ) : (
                  <>
                    {user ? $.index.buttons.dashboard : $.index.buttons.with_discord}{" "}
                    <Key value="enter" />
                  </>
                )}
              </a>
            </Link>
          )}
          <div className="block md:hidden my-5"></div>
          <a

            className="font-medium md:ml-5 text-white hover:underline"
            href="https://award-demo.clquu.repl.co/v1/invite/discord"
            target="_blank"
          >
            {$.index.buttons.support}
          </a>
        </div>
        <div style={{ zIndex: '-1' }} className="hidden xl:block undrag pointer-events-none opacity-10 -left-[10vw] absolute top-[15vw] h-[30vw] flex-shrink-0 grayscale rotate-[30deg]">
        <Image width="512" height="512" src="/img/gift-left.png"  />
        </div>
        <div style={{ zIndex: '-1' }} className="hidden xl:block undrag opacity-10 pointer-events-none -right-[15vw] absolute top-[13vw] h-[35vw] grayscale -rotate-12">
        <Image width="512" height="512" src="/img/gift-right.png"  />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-y-0 lg:gap-x-12 py-24">
          <div className="col-span-4">
            <p className="text-white text-4xl font-bold" dangerouslySetInnerHTML={{ __html: $.index.features.title }} />
            <p className="text-white text-md font-medium text-gray-500/75" dangerouslySetInnerHTML={{ __html: $.index.features.description }}/>
            <a
                onClick={() => addBot()}
                className={
                  "mt-10 flex items-center px-4 justify-center gap-x-2 shadow-lg shadow-amber-600/20 cursor-pointer rounded-xl py-4 font-medium bg-gradient-to-r from-amber-700 to-amber-500 hover:opacity-80 transition duration-200 text-white"
                }
              >
              <i className="fab fa-discord mr-2" />{$.index.features.buttonText}
            </a>
          </div>

          <div className="col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {$.index.features.items.map((feature, featureIdx) => (
              <div key={featureIdx}>
                <i className={`${feature.icon} text-3xl text-amber-500`} />
                <div className="text-white">
                  <p className="text-xl font-semibold mt-5">{feature.title}</p>
                  <p className="text-gray-500 line-clamp-4">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

      </div>

      {$.index.advanced.map((item, itemIdx) => (
        <div key={itemIdx} className="flex flex-row w-full h-auto lg:h-56 my-14 lg:my-56 bg-gradient-to-br lg:px-16 from-neutral-900/90 flex items-center justify-start to-neutral-900/50 rounded-lg p-6 shadow-md">
            {item.placement === 'right' ? (
              <>
                <div className="lg:mx-4 lg:p-8 py-4 lg:py-16 flex items-center justify-center flex-col text-center w-full lg:w-auto lg:text-left lg:flex-none">
                  <img src={item.imageUrl}  width="256" className="lg:hidden rounded-xl mb-5 shadow-xl shadow-black" />
                  <p className="text-3xl text-white font-semibold">{item.title}</p>
                  <p className="text-md text-white font-medium text-gray-500 line-clamp-5">{item.description}</p>
                </div>
                <img src={item.imageUrl} className="hidden lg:block rounded-xl perspective-right shadow-xl shadow-black" />
              </>
            ) : (
              <>
                <img src={item.imageUrl}  className="hidden lg:block rounded-xl perspective-left shadow-xl shadow-black" />
                <div className="lg:mx-4 lg:p-8 py-4 lg:py-16 flex items-center justify-center flex-col text-center w-full lg:w-auto lg:text-left lg:flex-none">
                  <img src={item.imageUrl}  width="256" className="lg:hidden rounded-xl mb-5 shadow-xl shadow-black" />
                  <p className="text-3xl text-white font-semibold">{item.title}</p>
                  <p className="text-md text-white font-medium text-gray-500 line-clamp-5">{item.description}</p>
                </div>
              </>
            )}
        </div>
      ))}
      <div className="w-full text-center h-auto lg:h-56 my-14 lg:my-56 bg-gradient-to-br from-neutral-900/90 to-neutral-900/50 rounded-lg p-6 shadow-md">
      <p className="text-2xl p-6 text-white font-semibold" dangerouslySetInnerHTML={{ __html: $.index.statistics.chosen.replace('{server_count}', statsArray[0].value) }} />
             <div className="lg:px-32 flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full">
                {statsArray.map((stat, statIdx) => (
                    <div key={statIdx}>
                      <p className="text-3xl text-white font-semibold">{stat.value}</p>
                      <p className="text-md text-white font-medium text-gray-500 line-clamp-5">{stat.label}</p>
                    </div>
                ))}
             </div>
        </div>
        
      </>
  );
}

Index.getInitialProps = (ctx) => {
  return {
    $token: ctx.query._code,
    $url: ctx.query._url,
  };
};
