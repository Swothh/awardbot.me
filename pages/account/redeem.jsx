import swr from "../../lib/swr";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import CountdownPage from "../../components/Countdown";
import JSConfetti from "js-confetti";

export default function Redeem({ $ }) {
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function redeem() {
    if (loading) return;
    setLoading(true);
    axios
      .get(
        "https://api.awardbot.me/v1/code/use?c=" +
          code +
          "&_token=" +
          window?.localStorage?.getItem("$Award_token")
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success == true) {
          new JSConfetti().addConfetti();
          setSuccess(res.data.data.count);
          setError(null);
        } else {
          setError(res.data.message);
          setSuccess(false);
        }
      });
  }

  return (
    <div className="my-20 py-20 max-w-lg mx-auto">
      <p className="font-extrabold text-4xl text-center bg-clip-text bg-gradient-to-br from-sky-400 to-sky-700 text-transparent">
        {$.user.redeem.title}
      </p>
      <p className="text-center text-white text-opacity-50 mt-2">
      {$.user.redeem.description}
      </p>
      <div className="my-6"></div>
      <input
        placeholder={$.user.redeem.inputPlaceholder}
        onChange={(e) => setCode(e.target.value)}
        type="text"
        className={
          `${code && code.length > 0 ? "text-center tracking-[.5em] " : ""}` +
          " w-full mx-auto flex transition duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-400 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none py-4 px-6 " +
          `${error ? "border-red-600" : ""} ${
            success ? "border-green-600" : ""
          }`
        }
      />
      {error && <p className="text-red-600 mt-1">{error}</p>}
      {success && (
        <p className="text-green-600 mt-1">
          {$.user.redeem.success.replace('{COUNT}', success)}
        </p>
      )}
      <div className="my-6"></div>
      <div className="md:flex items-center justify-between">
        <button
          onClick={() => redeem()}
          className="w-44 flex shadow-lg justify-center shadow-sky-600/20 rounded-xl py-3 px-4 font-semibold text-zinc-900 bg-sky-400 hover:bg-opacity-50 items-center transition duration-100"
        >
          {loading ? <i className="py-1.5 fad fa-spinner-third fa-spin" /> : <>
            <i className="far mr-2 text-xl fa-gift"></i> {$.user.redeem.button}
          </>}
        </button>
        <a
          href="https://api.awardbot.me/v1/invite/discord"
          className="text-opacity-75 text-white hover:underline"
        >
          {$.user.redeem.didntWork}
        </a>
      </div>
    </div>
  );
}
