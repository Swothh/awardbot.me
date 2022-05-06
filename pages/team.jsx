import swr from "../lib/swr";

export default function Team({ $ }) {
    const { data: _team } = swr("https://awardbot-demo.herokuapp.com/v1/others/team");
    const team = _team ? _team.data : null;

    return (
        <div>
            <div className="pt-10 mx-auto flex flex-col items-center justify-center">
                <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_bpqri9y8.json"  background="transparent"  speed="1"  style={{ width: "300px", height: "200px" }}  loop  autoplay />
                <p className="animateHeader text-4xl font-extrabold text-white">
                    {$.team.title}
                </p>
                <p dangerouslySetInnerHTML={{ __html: $.team.description }} className="animateHeader text-white text-opacity-50 text-center mt-5">
                    
                </p>
            </div>
            <div className="lg:max-w-screen-lg mt-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {!team ? <div className="col-span-1 md:col-span-2 flex items-center justify-center">
                    <i className="fad fa-spinner-third fa-spin text-white text-2xl" />
                </div> : (team.map((member, index) => (
                    <div key={index} className="flex flex-col justify-center text-white rounded">
                        <div className="flex-1 gap-x-4 flex items-center bg-gradient-to-b from-neutral-900/80 to-neutral-900/20 p-3 rounded-full">
                            <img className="rounded-full h-32 w-32" alt={member.user.username} src={!member.user.avatar ? member.user.defaultAvatarURL : `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}`} />
                            <div>
                                <h1 className="leading-none text-3xl font-bold text-white">
                                    {member.user.username}<span className="text-xl opacity-50">#{member.user.discriminator || '0000'}</span>
                                    <h3 className={"leading-none font-bold text-xl text-transparent bg-clip-text bg-gradient-to-br " + (
                                        member.role == "Founder" ? "from-rose-400 to-red-700" :
                                        member.role == "Co-Founder" ? "from-violet-400 to-indigo-700" :
                                        member.role == "Community Manager" ? "from-teal-400 to-sky-700" :
                                        member.role == "Developer" ? "from-green-400 to-emerald-700" :
                                        member.role == "Designer" ? "from-pink-400 to-fuchsia-700" :
                                        "from-yellow-700 to-yellow-700"
                                    )}>
                                        {$.team.roles[member.role.split(' ').join('-')]}
                                    </h3>
                               </h1>
                                <div className="flex items-center mt-1">
                                    <i className="fab fa-spotify mr-2 text-2xl text-green-500" />
                                    <p className="font-normal font-sm">
                                        {member.spotify ? 
                                        <>
                                            <span className="text-zinc-500">
                                                {member.spotify.artist}
                                            </span> - {member.spotify.track}
                                        </> : 
                                        <span className="text-zinc-500">
                                            {$?.spotify?.not}
                                        </span>}
                                    </p>
                                </div>
                                 
                            </div>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );
};