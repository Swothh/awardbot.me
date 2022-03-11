import Link from "next/link";

export default function Added({ $ }) {
    return (
        <>
            <h1 className="text-center text-2xl text-white mt-20 font-bold">
                Thanks for adding our bot!
            </h1>
            <div className="mt-5 mb-20 flex items-center justify-center">
                <Link href={"/dashboard"}>
                    <a className="bg-amber-400 py-2 px-4 rounded-xl shadow-xl shadow-amber-600/10">
                        Dashboard
                    </a>
                </Link>
            </div>
        </>
    );
};