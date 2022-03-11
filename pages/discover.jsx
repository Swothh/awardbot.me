import { useRef, useState, Fragment, useEffect } from "react";
import Snackbar from "@windui/snackbar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, Transition, Switch } from "@headlessui/react";
import swr from "../lib/swr";
import Tippy from "@tippyjs/react";
import Countdown from '../components/Countdown';
import GiveawayCards from '../components/GiveawayCards';

const Filters = ({
  amount,
  setAmount,
  amounts,
  changeAmount,
  sort,
  setSort,
  sorts,
  changeSort,
  $
}) => {
  return (
    <>
      <div>
        <p className="text-xl font-medium text-white">
          <i className="fal fa-cogs text-amber-400 mr-2" />
          {$.discover.settings.title}
        </p>
        <p className="text-white text-sm text-opacity-50 mb-5">
        {$.discover.settings.description}
        </p>
        <div>
          <p className="text-white text-lg">{$.discover.settings.amount.title}</p>
          <p className="text-white text-opacity-50 text-sm mb-4">
          {$.discover.settings.amount.description}
          </p>
          <Menu as="div" className="w-full relative inline-block text-left">
            <div>
              <Menu.Button className="left-0 transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-400 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none py-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-x-1 text-white text-opacity-60">
                  {amount ? (
                    <>
                      <i className="fa fa-hashtag text-white text-opacity-20" />
                      {amount}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <i className="fa fa-chevron-down text-white"></i>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-1 custom-scroll absolute left-0 w-full mt-2 origin-top-right bg-black overflow-auto max-h-60 border border-black border-opacity-20 bg-opacity-95 rounded-lg p-1">
                <div className="px-1 py-1 w-full">
                  {amounts ? (
                    <>
                      {amounts.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              onClick={() => changeAmount(item)}
                              className={`w-full rounded-lg hover:bg-zinc-900 p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                            >
                              <i className="fa fa-hashtag text-xl text-white text-opacity-20" />
                              <span>{item}</span>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`w-full rounded-lg p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                        >
                          <i className="fa fa-spinner-third fa-spin text-xl text-white text-opacity-20" />
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="mt-5">
          <p className="text-white text-lg">{$.discover.settings.sort.title} <span className="text-white text-opacity-20 text-xs">({$.discover.settings.sort.miniNote})</span></p>
          <p className="text-white text-opacity-50 text-sm mb-4">
          {$.discover.settings.amount.description}
          </p>
          <Menu as="div" className="w-full relative inline-block text-left">
            <div>
              <Menu.Button className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-400 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none py-4 px-6 flex justify-between items-center">
                <div className="flex items-center gap-x-1 text-white text-opacity-60">
                  {sort ? (
                    <>
                      <i className="fa fa-hashtag text-white text-opacity-20" />
                      {sorts.find((a) => a.value === sort).label}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <i className="fa fa-chevron-down text-white"></i>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-10 custom-scroll absolute left-0 w-full mt-2 origin-top-right bg-black overflow-auto max-h-80 border border-black border-opacity-20 bg-opacity-95 rounded-lg p-1">
                <div className="px-1 py-1 w-full">
                  {sorts ? (
                    <>
                      {sorts.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              onClick={() => changeSort(item.value)}
                              className={`w-full rounded-lg hover:bg-zinc-900 p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                            >
                              <i className="fa fa-hashtag text-xl text-white text-opacity-20" />
                              <span>{item.label}</span>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`w-full rounded-lg p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                        >
                          <i className="fa fa-spinner-third fa-spin text-xl text-white text-opacity-20" />
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
};

const Browse = ({ $, searchQuery }) => {
  const [amount, setAmount] = useState(12);
  const [search, setSearch] = useState(searchQuery || false);
  const [searchText, setSearchText] = useState(searchQuery || "");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("az");
  const [data, setData] = useState(false);

  const amounts = Array.from({ length: 20 }).map((data, index) => 6 * (index + 1));
  const sorts = [
    { value: "az", label: $.discover.az },
    { value: "za", label: $.discover.za },
  ];
  useEffect(() => {
    setAmount(amount);
  }, [amount]);
  useEffect(() => {
    setSort(sort);
  }, [sort]);

  const Search = e => {
    if(e.target.value === " " || !e.target.value || e.target.value === "") {
      setSearchText(false);
    } else {
      setSearchText(e.target.value);
    };
  };

  useEffect(() => {
    setLoading(true);
    let _search = setTimeout(() => {
      setSearch(searchText);
      setLoading(false);
    }, 250);
    return () => {
      clearTimeout(_search);
    }
  }, [ searchText ]);

  const changeAmount = (amount) => {
    if (!amounts.find((a) => a === amount)) {
      return new Snackbar({
        options: {
          type: "error"
        },
        title: "Oops!",
        message:
          "You can't choose an amount other than the one offered to you.",
      }).show();
    }
    setAmount(amount);
  };
  const changeSort = (sort) => {
    if (!sorts.find((a) => a.value === sort)) {
      return new Snackbar({
        options: {
          type: "error"
        },
        title: "Oops!",
        message: "You can't choose an sort other than the one offered to you.",
      }).show();
    }
    setSort(sorts.find((a) => a.value === sort).value);
  };

  const { data: _giveaways } = swr("https://api.awardbot.me/v1/giveaway/search");
  const giveaways = _giveaways ? _giveaways.data : null;

  useEffect(() => {
    setData(giveaways);
  }, [_giveaways]);
  return (
    <>
      <div className="my-20 flex flex-col items-center w-full justify-center">
        <span className="text-transparent text-3xl font-extrabold pr-1 bg-clip-text bg-gradient-to-br from-amber-400 to-amber-700">
          {$.discover.title}
        </span>
        <p className="text-white text-center text-opacity-50 text-sm">
        {$.discover.description}
        </p>
      </div>
      <div className="mb-20 w-full h-auto grid grid-cols-1 lg:grid-cols-12 lg:gap-x-4">
        <div className="h-full w-full text-white lg:col-span-3 mb-5 lg:mb-0">
          <div className="h-auto top-20 transition-all duration-200 w-full bg-black bg-opacity-10 rounded-lg p-4 lg:sticky">
            <Filters
              amount={amount}
              setAmount={setAmount}
              amounts={amounts}
              changeAmount={changeAmount}
              sort={sort}
              setSort={setSort}
              $={$}
              sorts={sorts}
              changeSort={changeSort}
            />
          </div>
        </div>
        <div className="h-full w-full col-span-9">
          <div className="w-full text-white rounded-lg">
            <input
              type="text"
              onChange={Search}
              value={!searchText ? "" : searchText}
              placeholder={$.discover.searchInput}
              className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-400 rounded-xl border border-white/10 focus:border-amber-400 focus:outline-none py-4 px-6"
            />
            <div className="mt-5">
              <GiveawayCards $={$} loading={loading} sort={sort} amount={amount} search={search} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Browse.getInitialProps = async (ctx) => {
  return {
    searchQuery: ctx.query ? ctx.query.q : null
  };
};

export default Browse;