import "../public/css/global.css";
import "../public/css/tippy.css";
import "../public/css/customColors.css";
import "tailwindcss/tailwind.css";
import NProgress from "nprogress";
import Award from "../Award.config";
import Router, { useRouter } from "next/router";
import Head from "next/head";

import Header from "../components/Static/Header.jsx";
import Footer from "../components/Static/Footer.jsx";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();
import { ThemeProvider } from 'next-themes'

export default function AwardApp({ Component, pageProps }) {
  const router = useRouter();
  const locale = require("../lang/" + (router.locale || "en"));

  if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") {
    const $function = (event) => {
      let eventName = "";
      if (event.ctrlKey == true) eventName += "ctrl+";
      if (event.altKey == true) eventName += "alt+";
      if (event.shiftKey == true) eventName += "shift+";

      if (!["Shift", "Control", "Alt"].includes(event.key)) {
        eventName += event.key.toLowerCase();
      } else {
        eventName = eventName.slice(0, eventName.length - 1);
      }

      const emitEvent = new CustomEvent("Award", {
        detail: { key: eventName, target: event.target },
      });
      window.dispatchEvent(emitEvent);
    };

    if (!window.$Award_event_added) {
      window.addEventListener("keydown", $function);
      window.$Award_event_added = true;
    }
  }
  global.openTabInWindow = (url) => {
    const w = 500;
    const h = 700;
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    let $w = window.open(
      url,
      "_blank",
      `
          toolbar=no,scrollbars=yes,resizable=no,
          width=${w / systemZoom}, 
          height=${h / systemZoom}, 
          top=${top}, 
          left=${left}
          `
    );
  };
  const NavItems = [
    {
      link: true,
      name: locale.navbar.home,
      icon: "fal fa-home",
      activeIcon: "fa fa-home",
      href: "/",
    },
    {
      link: true,
      name: locale.navbar.dashboard,
      icon: "fal fa-server",
      activeIcon: "fa fa-server",
      href: "/dashboard",
    },
    {
      link: true,
      name: locale.navbar.discover,
      icon: "fab fa-safari",
      activeIcon: "fab fa-safari",
      href: "/discover",
    },
    {
      link: false,
      name: locale.navbar.support,
      icon: "fab fa-discord",
      activeIcon: "fab fa-discord",
      href: "https://api.awardbot.me/v1/invite/discord",
    },
    {
      link: false,
      name: locale.navbar.invite,
      icon: "fal fa-robot",
      activeIcon: "fab fa-robot",
      href: "https://api.awardbot.me/v1/invite/bot",
    },
    {
      link: true,
      name: locale.navbar.partners,
      icon: "fal fa-handshake",
      activeIcon: "fa fa-handshake",
      href: "/partners",
    },
    {
      link: true,
      name: locale.navbar.team,
      icon: "fal fa-users",
      activeIcon: "fa fa-users",
      href: "/team",
    },
  ];
  return (
    <ThemeProvider defaultTheme='rose'>
    <div className="h-screen relative border-t-4 border-amber-600">
      <div
        className="bg-gradient-to-b z-10 opacity-[25%] absolute top-0 w-full from-amber-600 to-transparent"
        style={{ height: "500px" }}
      />
      <Head>
        <title>
          {router.pathname && Award.titles[router.pathname]
            ? Award.titles[router.pathname] + Award.titleSuffix
            : "Loading..." + Award.titleSuffix}
        </title>
      </Head>
      <main className="transition-all duration-200 z-10 absolute inset-0 px-5 h-screen max-w-7xl w-full mx-auto">
        <Header $={locale} NavItems={NavItems} />
        <div className="block px-5 md:px-0">
          <Component $={locale} {...pageProps} />
        </div>
        <Footer $={locale} />
      </main>
      <div>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" />
        <script src="/js/main.js?i=2" />
      </div>
    </div>
    </ThemeProvider>
  );
}
