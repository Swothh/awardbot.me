import swr from "../lib/swr";

export default function Partners() {
    const { data: _partners } = swr("https://api.awardbot.me/v1/others/partners");
    const partners = _partners ? _partners.data : null;

    return (
        <>
            <div className="w-full my-10">
                <p className="text-3xl font-bold text-center text-white">
                    <i className="fal fa-stars text-amber-400 mr-2" />
                    Partners
                </p>
                <p className="text-white text-center text-sm text-opacity-50 mb-5">
                    You can see our partners here!
                </p>
            </div>
            <div className="w-full md:w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                {!_partners && <div className="sm:col-span-2 md:col-span-3 flex justify-center">
                    <i className="fad fa-spinner-third fa-spin text-xl text-white" />
                </div>}
                {partners && partners.map((partner, index) => (
                    <div style={{ "--partner-banner": `url(${partner.banner})` }} key={index} className="partner-container bg-black/10 p-3 md:p-5 rounded-xl">
                        <span className="text-xs text-zinc-400/50 uppercase font-semibold italic">Partner #{index + 1}</span>
                        <h1 className="leading-none font-bold text-2xl text-white">{partner.title}</h1>
                        <p className="mt-5 h-32 drop-shadow-lg text-zinc-400 overflow-y-scroll">{partner.description}</p>
                        <a target="_blank" href={partner.url} className="mt-5 block sm:w-24 py-2 px-4 rounded-xl bg-amber-400 text-black font-semibold">
                            <i className="fas fa-external-link mr-1.5" /> Visit
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
};