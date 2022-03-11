import Snackbar from "@windui/snackbar";
import Tippy from "@tippyjs/react";
import { useRef, useState, Fragment, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Key from "../../Key";
import { useRouter } from "next/router";
import { Menu, Transition, Switch } from "@headlessui/react";
import JSConfetti from "js-confetti";
import Window from "@windui/window";
import moment from "moment";
import "moment-timezone";
import axios from "axios";

export default function Main({
  $,
  guildID,
  user,
  _channels,
  channels,
  _roles,
  roles,
  stats,
  RequirementsList,
}) {
  const router = useRouter();
  let Requirements = [];
  RequirementsList.forEach((host) => {
    host.types.forEach((req) => {
      Requirements.push({
        id: host.name + "_" + req.name.split(" ").join("_"),
        host:
          host.name.charAt(0).toUpperCase() +
          host.name.slice(1, host.name.length),
        name: req.name
          .split(" ")
          .map(
            (elem) => elem.charAt(0).toUpperCase() + elem.slice(1, elem.length)
          )
          .join(" "),
        img: host.img,
        type: req.name,
        provider: host.name,
        input: req.requiredInput,
      });
    });
  });

  const submitButton = useRef(null);
  const [loading, setLoading] = useState(false);
  const [preSelect, setPreSelect] = useState(false);
  const [PrivateCheck, setPrivate] = useState(false);
  const [pinSwitch, setPinSwitch] = useState(false);
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [prize, setPrize] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [winnersCount, setWinnersCount] = useState(false);
  const [channel, setChannel] = useState(false);
  const [selectedRequirements, setRequirements] = useState([]);
  const [autoRewards, setAutoRewards] = useState([]);
  const [role, setRole] = useState(false);
  const [inviteLimit, setInviteLimit] = useState();
  const [pin, setPin] = useState(false);
  const [rewardsReaded, setRewardsReaded] = useState(true);
  const [pinReaded, setPinReaded] = useState(true);

  useEffect(() => {
    if (typeof localStorage == "undefined") return;
    if (!localStorage.getItem("$Award_readed_adr")) setRewardsReaded(false);
    if (!localStorage.getItem("$Award_readed_pin")) setPinReaded(false);
  }, []);

  const hide = id => {
      if (typeof localStorage == "undefined") return;
      switch(id) {
          case 0:
              localStorage.setItem("$Award_readed_adr", 1);
              setRewardsReaded(true);
              break;
          case 1:
              localStorage.setItem("$Award_readed_pin", 1);
              setPinReaded(true);
              break;
      };
  };
    
  const updateInput = (input) => {
    if (input.target.id === "title") return setTitle(input.target.value);
    if (input.target.id === "description") return setDescription(input.target.value);
    if (input.target.id === "prize") return setPrize(input.target.value);
    if (input.target.id === "endDate") return setEndDate(input.target.value);
    if (input.target.id === "winnersCount") return setWinnersCount(input.target.value);
    if (input.target.id === "digitCode") return setPin(pinSwitch ? input.target.value : false);
    if (input.target.id === "invite") return setInviteLimit(input.target.value);
  };
  useEffect(() => { setInviteLimit(inviteLimit) }, [inviteLimit])
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  useEffect(() => {
    setPreSelect(preSelect);
  }, [preSelect]);
  useEffect(() => {
    setChannel(channel);
  }, [channel]);

  if (typeof window !== "undefined") {
    window.addEventListener("Award", (event) => {
      if (event.detail.key == "ctrl+enter") {
        if (submitButton.current) {
          submitButton.current.click();
          event.preventDefault();
        }
      }
    });
  }

  const showSnackbar = ({ title, message, type }) => {
    return new Snackbar({
      options: {
        type: type,
      },
      title: title,
      message: message,
    }).show();
  };
  const submitForm = async () => {
    if (loading) return;
    setLoading(true);
    const _create = await axios.post(
        "https://api.awardbot.me/v1/giveaway/create?_token=" +
        (typeof window !== "undefined"
          ? window.localStorage.getItem("$Award_token")
          : ""),
        {
            guild: guildID,
            channel: channel ? channel.id : "",
            private: PrivateCheck,
            title,
            description,
            prize,
            auto_rewards: autoRewards,
            winners_count: winnersCount,
            roleId: role.id,
            invite_limit: inviteLimit,
            duration: new Date(endDate).getTime() - Date.now(),
            pin: pin,
            pinActive: pinSwitch,
            requireds: selectedRequirements.map(($r) => ({
              provider: $r.provider,
              type: $r.type.split(" ").join("_"),
            }))
        }
    );

    setLoading(false);
    if (_create.data.success == true) {
      new JSConfetti().addConfetti();
      showSnackbar({
        title: "Yaay!",
        message: `Giveaway successfully created.`,
        type: "success",
      });
      window.location.href = "/dashboard/" + guildID + "/giveaways/active";
    } else {
      showSnackbar({
        title: "Ooops!",
        message: _create.data.message,
        type: "error",
      });
    }
  };

  const addRequirement = (selected) => {
    if (selectedRequirements.find((a) => a.id === selected.id)) {
      return showSnackbar({
        title: "Ooops!",
        message: `${selected.host + " " + selected.name} already selected.`,
        type: "error",
      });
    } else {
      setRequirements([...selectedRequirements, selected]);
      return showSnackbar({
        title: "Yaaay!",
        message: `${
          selected.host + " " + selected.name
        } successfully added the requirements.`,
        type: "success",
      });
    }
    return showSnackbar({
      title: "Ooops!",
      message: `Something went wrong...`,
      type: "error",
    });
  };
  const removeRequirement = (item) => {
    if (!selectedRequirements.find((a) => a.id === item.id)) {
      return showSnackbar({
        title: "Ooops!",
        message: `${item.host + " " + item.name} already not selected.`,
        type: "error",
      });
    } else {
      setRequirements(selectedRequirements.filter((a) => a.id !== item.id));
      return showSnackbar({
        title: "Yaaay!",
        message: `${
          item.host + " " + item.name
        } successfully removed the requirements.`,
        type: "success",
      });
    }
    return showSnackbar({
      title: "Ooops!",
      message: `Something went wrong...`,
      type: "error",
    });
  };
  function darkMiBu(hexcolor) {
    var r = parseInt(hexcolor.substr(1, 2), 16);
    var g = parseInt(hexcolor.substr(3, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var ocBilal = (r * 299 + g * 587 + b * 114) / 1000;

    return ocBilal < 40 ? "#FFFFFF" : hexcolor;
  }
  const localeCreate = $.create;

  const handleWindow = async () => {
    if (typeof document == "undefined") return;
    if (document.querySelector(".windui-window")) return;

    const rewards = await new Window({
      title: "Add or Edit Rewards",
      options: {
        iconColor: "#18181b",
        headerBg: "var(--500)",
        headerColor: "#18181b",
        bodyBg: "#151515",
      },
      body: `
                <textarea placeholder="Jump to the new line to add more rewards." name="rewards" style="margin-top: .5rem; min-height: 5rem; width: 25rem;" class="transition duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-2 px-3">${autoRewards.join(
                  "\n"
                )}</textarea>
                <br>
                <button class="my-1 py-2 px-4 rounded-xl bg-gradient-to-bl from-amber-700 to-amber-600 text-zinc-900" _w="submit">
                    Save
                </button>
            `,
    }).open();

    if (rewards.success != true) return;
    rewards.$.close();
    const _rewards = rewards.inputs[0].value
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r != "");
    setAutoRewards(_rewards);

    showSnackbar({
      title: "Yeey!",
      message: `Added ${_rewards.length} rewards!`,
      type: "success",
    });
  };

  return (
    <div>
      <div>
        <p className="text-xl font-medium text-white">{localeCreate.title}</p>
        <p className="text-white text-sm text-opacity-50">
          {localeCreate.description}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4 lg:w-full mt-10">
          <div className="order-last lg:order-first col-span-2 space-y-10">
            <div>
              <p className="text-white text-lg">
                {localeCreate.inputs.title.title}
              </p>
              <p className="text-white text-opacity-50 text-sm mb-4">
                {localeCreate.inputs.title.description}
              </p>
              <input
                onChange={updateInput}
                id="title"
                type="text"
                className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6"
              />
            </div>
            <div>
              <p className="text-white text-lg">
                {localeCreate.inputs.description.title}
              </p>
              <p className="text-white text-opacity-50 text-sm mb-4">
                {localeCreate.inputs.description.description}
              </p>
              <input
                onChange={updateInput}
                id="description"
                type="text"
                className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6"
              />
            </div>
            <div>
              <p className="text-white text-lg">
                {localeCreate.inputs.prize.title}
              </p>
              <p className="text-white text-opacity-50 text-sm mb-4">
                {localeCreate.inputs.prize.description}
              </p>
              <input
                onChange={updateInput}
                id="prize"
                type="text"
                className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6"
              />
            </div>
            <div>
              <p className="text-white text-lg">
                {localeCreate.inputs.enddate.title}
              </p>
              <p className="text-white text-opacity-50 text-sm mb-4">
                {localeCreate.inputs.enddate.description}
              </p>
              <input
                onChange={updateInput}
                id="endDate"
                type="datetime-local"
                className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6"
              />
            </div>
            <div>
              <p className="text-white text-lg">
                {localeCreate.inputs.winners.title}
              </p>
              <p className="text-white text-opacity-50 text-sm mb-4">
                {localeCreate.inputs.winners.description}
              </p>
              <input
                onChange={updateInput}
                id="winnersCount"
                type="number"
                className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6"
              />
            </div>
            <div>
              <p className="text-white text-lg">
                {localeCreate.inputs.channel.title}
              </p>
              <p className="text-white text-opacity-50 text-sm mb-4">
                {localeCreate.inputs.channel.description}
              </p>
              <div>
                <Menu
                  as="div"
                  className="w-full relative inline-block text-left"
                >
                  <div>
                    <Menu.Button className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6 flex justify-between items-center">
                      <div className="flex items-center gap-x-1 text-white text-opacity-60">
                        {channel ? (
                          <>
                            <i className="fa fa-hashtag text-white text-opacity-20" />
                            {channel.name}
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
                    <Menu.Items className="z-1 absolute left-0 w-full mt-2 origin-top-right bg-black overflow-auto max-h-80 border border-black border-opacity-20 bg-opacity-95 rounded-lg p-1">
                      <div className="px-1 py-1 w-full">
                        {_channels ? (
                          <>
                            {channels.map((item, index) => (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <button
                                    onClick={() => setChannel(item)}
                                    className={`w-full rounded-lg hover:bg-zinc-900 p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                                  >
                                    <i className="fa fa-hashtag text-xl text-white text-opacity-20" />
                                    <span>{item.name}</span>
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
            <div>
              <p className="text-white text-lg">
                {localeCreate.inputs.requirements.title}
              </p>
              <p className="text-white text-opacity-50 text-sm mb-4">
                {localeCreate.inputs.requirements.description}
              </p>

              <div className="flex items-center space-x-3">
                <Menu
                  as="div"
                  className="w-full relative inline-block text-left"
                >
                  <div>
                    <Menu.Button className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6 flex justify-between items-center">
                      <div className="flex items-center gap-x-1 text-white text-opacity-60">
                        {preSelect ? (
                          <>
                            <img
                              src={preSelect.img}
                              className="mr-2"
                              width="20"
                              height="20"
                            />
                            {preSelect.name}
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
                    <Menu.Items style={{ zIndex: 15 }} className="absolute left-0 w-full mt-2 origin-top-right bg-black overflow-auto max-h-80 border border-black border-opacity-20 bg-opacity-95 rounded-lg p-1">
                      <div className="px-1 py-1 w-full">
                        {Requirements.map((item, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <button
                                onClick={() => setPreSelect(item)}
                                className={`w-full rounded-lg hover:bg-zinc-900 p-2 cursor-pointer text-white flex items-center space-x-3 transition-all duration-200`}
                              >
                                <img
                                  src={item.img}
                                  className="mr-2"
                                  width="22"
                                  height="22"
                                />
                                <span>
                                  {item.host} {item.name}
                                </span>
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                router.push("/account/connections")
                              }
                              className={`w-full rounded-lg p-2 cursor-pointer text-white flex items-center space-x-3 text-xs text-opacity-50 transition-all duration-200`}
                            >
                              <span>
                                {localeCreate.requirementsDropdownText}
                              </span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  onClick={() => addRequirement(preSelect)}
                  className={`${
                    preSelect ? "cursor-pointer" : "hidden"
                  } bg-amber-600 rounded-xl p-4 text-zinc-900 hover:bg-opacity-75 transition duration-100`}
                >
                  <i className="fa fa-plus mx-1 text-xl"></i>
                </button>
              </div>
              {selectedRequirements.find(
                (a) => a.id === "discord_check_role"
              ) && (
                <div className="mt-5">
                  <p className="text-white text-lg">
                    {localeCreate.inputs.role.title}
                  </p>
                  <p className="text-white text-opacity-50 text-sm mb-4">
                    {localeCreate.inputs.role.description}
                  </p>
                  <Menu
                    as="div"
                    className="w-full relative inline-block text-left"
                  >
                    <div>
                      <Menu.Button className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6 flex justify-between items-center">
                        <div className="flex items-center gap-x-1 text-white text-opacity-60">
                          {role ? (
                            <>
                              <i className="fa fa-at" />
                              {role.name.startsWith("@")
                                ? role.name.slice(1, role.name.length)
                                : role.name}
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
                      <Menu.Items className="z-1 absolute left-0 w-full mt-2 origin-top-right bg-black overflow-auto max-h-80 border border-black border-opacity-20 bg-opacity-95 rounded-lg p-1">
                        <div className="px-1 py-1 w-full">
                          {_roles ? (
                            roles &&
                            roles.map((item, index) => (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <button
                                    onClick={() => setRole(item)}
                                    style={{ color: `${darkMiBu(item.color)}` }}
                                    className={`w-full rounded-lg hover:bg-zinc-900 p-2 cursor-pointer flex items-center space-x-3 transition-all duration-200`}
                                  >
                                    <i className="fa fa-at mr-1" />
                                    <span>
                                      {item.name.startsWith("@")
                                        ? item.name.slice(1, item.name.length)
                                        : item.name}
                                    </span>
                                  </button>
                                )}
                              </Menu.Item>
                            ))
                          ) : (
                            <i className="fal fa-spinner-third fa-spin my-2 text-center w-full" />
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            {selectedRequirements.find(a => a.id === "discord_invite_checker") && (
                <div className="mt-5">
                    <p className="text-white text-lg">{localeCreate.inputs.invite.title}</p>
                    <p className="text-white text-opacity-50 text-sm mb-4">
                    {localeCreate.inputs.invite.description}
                    </p>

                    <input
                id="invite"
                type="text"
                maxLength={4}
                onChange={updateInput}
                minLength={4}
                className="transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6"
              />
                </div>
            )}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <p className="text-white text-lg">Auto-Delivery Rewards</p>
                {!rewardsReaded && <Tippy content="New Feature">
                  <a onClick={() => hide(0)} className="cursor-pointer w-4 h-4 relative">
                    <i className="absolute z-10 fas fa-circle text-amber-600" />
                    <i className="absolute animate-ping fas fa-circle text-amber-600" />
                    <p className="-top-[1.3rem] flex items-center text-sm handwriting text-zinc-300 left-full w-32 absolute">
                        <i className="translate-y-[60%] text-xs -rotate-[30deg] fal fa-long-arrow-alt-left mr-1"></i> Click to hide.
                    </p>
                  </a>
                </Tippy>}
              </div>
              <p className="text-white text-opacity-50 text-sm mb-4">
                Automatically send promo codes or links to the winners!{" "}
                <u>Jump to a new line</u> to add a new link or promo code.
              </p>
              <button
                onClick={handleWindow}
                className="text-white font-medium bg-gradient-to-bl from-amber-500 to-amber-700 py-3 px-6 rounded-xl shadow-xl shadow-amber-700/20 focus:outline-none"
              >
                Add or Edit Rewards ({autoRewards.length})
              </button>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <p className="text-white text-lg">
                  Pin{" "}
                  <span className="text-zinc-500 italic text-sm">optional</span>
                </p>
                {!pinReaded && <Tippy content="New Feature">
                  <a onClick={() => hide(1)} className="cursor-pointer w-4 h-4 relative">
                    <i className="absolute z-10 fas fa-circle text-amber-600" />
                    <i className="absolute animate-ping fas fa-circle text-amber-600" />
                    <p className="-top-[1.3rem] flex items-center text-sm handwriting text-zinc-300 left-full w-32 absolute">
                        <i className="translate-y-[60%] text-xs -rotate-[30deg] fal fa-long-arrow-alt-left mr-1"></i> Click to hide.
                    </p>
                  </a>
                </Tippy>}
              </div>
              <p className="text-white text-opacity-50 text-sm mb-4">
                Secure and encrypt with 6-digit codes specific to your giveaway.
              </p>
              <div className="flex gap-x-3 text-white items-center">
                <p>Active: </p>
                <Switch
                  checked={pinSwitch}
                  onChange={setPinSwitch}
                  className={`${pinSwitch ? "bg-amber-600" : "bg-gray-500"}
            relative inline-flex flex-shrink-0 h-[28px] w-[48px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${pinSwitch ? "translate-x-5" : "translate-x-0"}
                pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                  />
                </Switch>
              </div>
              {pinSwitch && (
                <input
                  onChange={updateInput}
                  id="digitCode"
                  type="text"
                  maxLength={6}
                  minLength={6}
                  className="mt-3 transition w-full duration-200 hover:bg-opacity-50 bg-black bg-opacity-30 text-white focus:text-amber-600 rounded-xl border border-white/10 focus:border-amber-600 focus:outline-none py-4 px-6"
                />
              )}
            </div>
            <div>
              <p className="text-white text-lg">
                {localeCreate.inputs.presentation.title}{" "}
                <Tippy content="Important setting">
                  <i className="fad fa-exclamation-triangle text-amber-600" />
                </Tippy>
              </p>
              <p className="text-white text-opacity-50 text-sm mb-4">
                {localeCreate.inputs.presentation.description}
              </p>
              <div className="flex gap-x-3 text-white items-center">
                <p>{localeCreate.presentationPublic}</p>
                <Switch
                  checked={PrivateCheck}
                  onChange={setPrivate}
                  className={`${PrivateCheck ? "bg-amber-600" : "bg-gray-500"}
            relative inline-flex flex-shrink-0 h-[28px] w-[48px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      PrivateCheck ? "translate-x-5" : "translate-x-0"
                    }
                pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                  />
                </Switch>
                <p>{localeCreate.presentationPrivate}</p>
              </div>
            </div>
            {stats ? (
              <>
                <div className="flex items-center">
                  <button
                    onClick={submitForm}
                    ref={submitButton}
                    className="gap-x-2 flex items-center justify-center w-40 bg-gradient-to-bl from-amber-500 to-amber-700 rounded-l-xl h-12 font-medium text-white hover:bg-opacity-75 transition duration-100"
                  >
                    {loading ? (
                      <>
                        <i className="fad fa-spinner-third fa-spin" />
                      </>
                    ) : (
                      <>
                        {localeCreate.button} <Key value="ctrl+enter" />
                      </>
                    )}
                  </button>
                  {stats?.active_giveaways < stats?.max_limit ? (
                    <Tippy
                      placement="right"
                      content={$.create.unReachTippy.replace(
                        "{MORE}",
                        `${-(stats?.active_giveaways - stats?.max_limit)}`
                      )}
                    >
                      <div className="text-emerald-400 rounded-r-xl h-12 bg-black/30 w-20 gap-x-2 flex items-center justify-center">
                        <i className="far fa-unlock-alt" />
                        <h1 className="font-semibold">
                          {stats?.active_giveaways}
                          <span className="font-bold text-xs text-white text-opacity-50">
                            /{stats?.max_limit}
                          </span>
                        </h1>
                      </div>
                    </Tippy>
                  ) : (
                    <Tippy placement="right" content={$.create.reachTippy}>
                      <div className="text-rose-400 rounded-r-xl h-12 bg-black/30 w-20 gap-x-2 flex items-center justify-center">
                        <i className="far fa-lock-alt" />
                        <h1 className="font-semibold">
                          {stats?.active_giveaways}
                          <span className="font-bold text-xs text-rose-400 text-opacity-50">
                            /{stats?.max_limit}
                          </span>
                        </h1>
                      </div>
                    </Tippy>
                  )}
                </div>
                {stats?.active_giveaways >= stats?.max_limit && (
                  <>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: $.create.reachedText,
                      }}
                      className="text-white/50 rounded-xl text-center"
                    ></p>
                  </>
                )}
              </>
            ) : (
              <div className="text-amber-600 rounded-r-xl h-12 bg-black/30 w-20 gap-x-2 flex items-center justify-center">
                <i className="fad fa-spinner-third fa-spin" />
              </div>
            )}
          </div>

          <div className="col-span-3 mb-10 lg:mb-0">
            <div className="lg:ml-5 sticky top-20">
              {channel && (
                <div
                  class="bg-amber-500 bg-opacity-5 border-l-4 rounded-lg border-amber-600 border-opacity-70 text-amber-200 px-4 py-3 mb-6"
                  role="alert"
                >
                  <p>
                    If you start a this giveaway, the bot will message the{" "}
                    <span className="mention">#{channel?.name}</span> channel.
                  </p>
                </div>
              )}
              <div className="bg-black bg-opacity-10 rounded-xl p-5">
                <div className="flex text-white">
                  <div className="flex-shrink-0">
                    <Image
                      src="/img/logo.png"
                      className="flex-shrink-0 rounded-full"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div id="messageContent" className="pl-[12px]">
                    <span className="flex items-center">
                      <a className="hover:underline cursor-pointer">Award</a>
                      <span className="discord-bot">bot</span>
                      <span className="timestamp">
                        <time
                          aria-label={`Today at ${new Date().getHours()}:{new Date().getMinutes()}`}
                          dateTime={Date.now()}
                        >
                          <i className="separator" aria-hidden="true">
                            {" "}
                            —{" "}
                          </i>
                          Today at {addZero(new Date().getHours())}:
                          {addZero(new Date().getMinutes())}
                        </time>
                      </span>
                    </span>

                    <div className="embed flex-shrink-0">
                      <div className="embed-grid flex-shrink-0">
                        <div className="embed-title">{title || "—"}</div>
                        <div className="embed-fields">
                          <div className="embed-field13">
                            <div className="embed-bold">
                              <u>Overview</u>
                            </div>
                            <div className="embed-text">
                              Ends at:{" "}
                              <Tippy
                                content={moment(endDate).format(
                                  "dddd, MMMM D, YYYY hh:mm A"
                                )}
                              >
                                <span className="embed-timestamp">
                                  {moment(endDate).format(
                                    "MMMM D, YYYY hh:mm A"
                                  )}
                                </span>
                              </Tippy>
                              <br />
                              Prize:{" "}
                              <code className="embed-code embed-inline">
                                {prize || "—"}
                              </code>
                              <br />
                              Hosted by:{" "}
                              <span className="mention" role="button">
                                @{user.username}
                              </span>
                              <br />
                              Winners:{" "}
                              <code className="embed-code embed-inline">
                                {winnersCount || "—"}
                              </code>
                            </div>
                          </div>
                          <div className="embed-field13">
                            <div className="embed-bold">
                              <u>Requirements</u>
                            </div>
                            <div className="embed-text">
                              {selectedRequirements.length < 1 && (
                                <>No requirements.</>
                              )}
                              {selectedRequirements.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center gap-x-2"
                                  >
                                    <img
                                      src={item.img}
                                      width="16"
                                      height="16"
                                    />
                                    <h6>
                                      {item.provider == "discord" ? (
                                        item.type === "check role" ? (
                                          <span
                                            className="mention"
                                            role="button"
                                          >
                                            @
                                            {role
                                              ? role.name.startsWith("@")
                                                ? role.name.slice(
                                                    1,
                                                    role.name.length
                                                  )
                                                : role.name
                                              : "role"}
                                          </span>
                                        ) : (
                                          "Discord"
                                        )
                                      ) : (
                                        user.connections[item.provider]
                                      )}{" "}
                                      <code className="text-xs embed-code embed-inline">
                                        ({item.name})
                                      </code>
                                    </h6>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <button className="embed-button">
                        <div className="embed-buttonContent">
                          <div
                            className="embed-buttonItems"
                            aria-hidden="false"
                          >
                            <img
                              src="/img/globe.svg"
                              alt="🌐"
                              draggable="false"
                              className="embed-buttonEmoji"
                            />
                            <div className="embed-buttonLabel">
                              Join on Website
                            </div>
                            <svg
                              className="embed-launchIcon"
                              aria-hidden="false"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"
                              ></path>
                              <path
                                fill="currentColor"
                                d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </button>
                      <button className="embed-button">
                        <div className="embed-buttonContent">
                          <div
                            className="embed-buttonItems"
                            aria-hidden="false"
                          >
                            <img
                              src="/img/tada.svg"
                              alt="🎉"
                              draggable="false"
                              className="embed-buttonEmoji"
                            />
                            <div className="embed-buttonLabel">
                              Join on Discord
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black bg-opacity-10 p-4 mt-2 rounded-lg">
                {selectedRequirements.length >= 1 && (
                  <p className="pt-2 pb-1 text-white text-xl">Requirements</p>
                )}
                <div className="grid grid-cols-1 gap-y-1">
                  {selectedRequirements.map((item, index) => (
                    <div
                      key={index}
                      className="w-full bg-black text-white bg-opacity-20 p-2 rounded-lg"
                    >
                      <div className="flex justify-between gap-x-2 items-center">
                        <img src={item.img} width="24" height="24" />
                        <span>{item.name}</span>
                        <button
                          onClick={() => removeRequirement(item)}
                          className="shadow-lg px-3 py-1 rounded-lg shadow-red-600/20 bg-red-500 hover:opacity-75"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  

