import { useState } from "react";
import Countdown from "react-countdown";

const CountdownPage = ({ line = true, ms, isBoost = false }) => {
  const Completionist = () => <span>This {isBoost ? "boost" : "giveaway"} expired.</span>;
  const currentTime = Date.now();
  const EndAt = currentTime + ms;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed && days != Infinity) {
      return <Completionist />;
    } else {
      return (
        <>{days == Infinity ? <span>∞ Infinite</span> : (
          line ? (
            <span>
              {days !== 0 && <>{days} days </>}
              {hours !== 0 && <>{hours} hours <br /></>}
              {minutes !== 0 && <>{minutes} minutes </>}
              {seconds !== 0 && <>{seconds} seconds</>}
            </span>
          ) : (
            <span>
              {days !== 0 && <>{days} days </>}
              {hours !== 0 && <>{hours} hours </>}
              {minutes !== 0 && <>{minutes} minutes </>}
              {seconds !== 0 && <>{seconds} seconds</>}
            </span>
          )
        )}</>

      );
    }
  };

  return (
    <>
      <Countdown date={EndAt} renderer={renderer} />
    </>
  );
};

export default CountdownPage;
