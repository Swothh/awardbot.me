import axios from 'axios';

export default async function Callback(req, res) {
    const __url = req.query["url"];
    const __code = req.query["_code"];
    if (!__code) return res.redirect("/api/auth/login");
    const profile = await axios.get("https://awardbot-demo.herokuapp.com/v1/auth/me?_token=" + __code);
    if (!profile || !profile.data || !profile.data.success) return res.redirect("/api/auth/login");
    res.redirect("/?_code=" + __code + "&_url=" + (__url || "/"));
};