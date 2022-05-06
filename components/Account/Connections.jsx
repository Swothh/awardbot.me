export default function Main({ $, user }) {
  const connections = [
    {
      id: "youtube",
      border: "border-red-600/20",
      bg: "bg-red-500/20",
      provider: "YouTube",
      icon: <i className="fab fa-youtube text-white fa-2x mr-2" />,
      userCheck: user.connections["youtube"]
        ? user.connections["youtube"]
        : null,
      connectUrl: "https://awardbot-demo.herokuapp.com/v1/connections/youtube/login",
      logoutUrl: "https://awardbot-demo.herokuapp.com/v1/connections/youtube/logout",
    },
    {
      id: "github",
      border: "border-black/20",
      bg: "bg-black/20",
      provider: "Github",
      icon: <i className="fab fa-github text-white fa-2x mr-2" />,
      userCheck: user.connections["github"] ? user.connections["github"] : null,
      connectUrl: "https://awardbot-demo.herokuapp.com/v1/connections/github/login",
      logoutUrl: "https://awardbot-demo.herokuapp.com/v1/connections/github/logout",
    },
    {
      id: "twitch",
      border: "border-violet-600/20",
      bg: "bg-violet-500/20",
      provider: "Twitch",
      icon: <i className="fab fa-twitch text-white fa-2x mr-2" />,
      userCheck: user.connections["twitch"] ? user.connections["twitch"] : null,
      connectUrl: "https://awardbot-demo.herokuapp.com/v1/connections/twitch/login",
      logoutUrl: "https://awardbot-demo.herokuapp.com/v1/connections/twitch/logout",
    },
    {
      id: "twitter",
      border: "border-sky-600/20",
      bg: "bg-sky-500/20",
      provider: "Twitter",
      icon: <i className="fab fa-twitter text-white fa-2x mr-2" />,
      userCheck: user.connections["twitter"]
        ? user.connections["twitter"]
        : null,
      connectUrl: "https://awardbot-demo.herokuapp.com/v1/connections/twitter/login",
      logoutUrl: "https://awardbot-demo.herokuapp.com/v1/connections/twitter/logout",
    }
  ];
  return (
    <div>
      <div className="my-10 flex flex-col items-center w-full justify-center">
        <span className="text-transparent text-3xl font-extrabold pr-1 bg-clip-text bg-gradient-to-br from-violet-400 to-violet-700">
          {$.user.connections.title}
        </span>
        <p className="text-white text-center text-opacity-50 text-sm">
        {$.user.connections.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-2 lg:gap-x-2 lg:gap-y-4">
        {connections.map((item, index) => (
          <button
            onClick={() =>
              item.userCheck
                ? global.openTabInWindow(
                    item.logoutUrl +
                      "?__beta=" + (process.env.NODE_ENV === 'production' ? 'false' : 'true') + "&url=/account/connections/" +
                      item.id
                  )
                : global.openTabInWindow(
                    item.connectUrl +
                      "?__beta=" + (process.env.NODE_ENV === 'production' ? 'false' : 'true') + "&url=/account/connections/" +
                      item.id
                  )
            }
            key={index}
            className={`w-full px-4 py-2 ${item.border} ${item.bg} border-2 rounded-lg text-white`}
          >
            <div className="flex items-center justify-between">
              {item.icon}
              <div className="text-center">
                <p dangerouslySetInnerHTML={{ __html: item.userCheck
                    ? $.user.connections.button.logged.replace('{ACCOUNT}', item.userCheck) : $.user.connections.button.connect.replace('{PROVIDER}', item.provider) }}>
                </p>
                <p className="text-xs text-white text-opacity-50">
                  {item.userCheck ? $.user.connections.button.logout : $.user.connections.button.connectMini}
                </p>
              </div>
              <div />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
