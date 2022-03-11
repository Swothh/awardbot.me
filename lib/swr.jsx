import axios from 'axios';
import useSWR from 'swr';

export default function swr(url, method = "get", interval = 1000) {
    return useSWR(url, href => axios[method](href + (
        (href.includes("?") ? "&" : "?") +
        "_token=" + (typeof window !== "undefined" ? window.localStorage.getItem("$Award_token") : "")
    )).then(res => res.data), { refreshInterval: interval });
};;