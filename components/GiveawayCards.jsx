import Link from 'next/link';
import Countdown from './Countdown';
import Tippy from '@tippyjs/react';

const GiveawayCards = ({ $, loading, sort, search, amount, data, marginTop = 'mt-0', gap = 'gap-10' }) => {
    return (
      <>
      {loading ? (
          <div className="w-full flex flex-col items-center justify-center">
            <i className="fa fa-spinner-third fa-spin fa-2x text-center m-5" />
          </div>
      ) : (
      <>
        {data ? (
          <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full transition-all duration-200 ${marginTop} ${gap} text-white`}>
              {data
                .filter((a) => !a.private)
                .filter((a) =>
                  search ? a.title.toLowerCase().includes(search.toLowerCase()) || a.prize.toLowerCase().includes(search.toLowerCase())  || a.description.toLowerCase().includes(search.toLowerCase()) : a
                ).sort((a,b) => 
                sort === "az" ? a.prize.toLowerCase().localeCompare(b.prize.toLowerCase()) : 
                (sort === "za" ? b.prize.toLowerCase().localeCompare(a.prize.toLowerCase()) : 
                b[sort] - a[sort])
                )
                .slice(0,amount)
                .map((item, index) => (
                <Link key={index} href={`/g/${item.id}`}>
                  <div
                    key={index}
                    style={{ "--banner": `url(${item.banner})` }}
                    className="cursor-pointer giveaway-box relative h-56 p-5 rounded-xl text-white"
                  >
                    <p className="text-md font-bold">{item.title}</p>
                    <p className="text-base font-thin italic mt-2"><i className="fad fa-gift text-amber-400 mr-1" />{item.prize}</p>
                    <p className="italic text-sm text-white text-opacity-50 font-thin"><Countdown line={true} ms={(item.started_at + item.duration) - Date.now()} /></p>
                    
                    <div className="absolute bottom-5">
                      <p>{$.discover.reqs}:</p>
                      <div className="flex items-center gap-x-2 flex-wrap">
                        {item.requireds && item.requireds.length > 0 ? (
                          <>{item.requireds.map((req, _i) => (
                            <Tippy key={_i} content={`${req.provider} - ${req.displayType}`}>
                              <img src={req.img} width="20" height="20" />
                            </Tippy>
                          ))}</>
                        ) : (<p className="italic text-xs text-white text-opacity-50">{$.discover.noreq}</p> )}
                      </div>
                    </div>
  
                  </div>
                </Link>
                ))}
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <i className="fa fa-yin-yang fa-spin fa-2x text-center m-5" />
            <p className="italic"><strong>Tip: </strong>Yin-yang, argues that in every good there is an evil.</p>
          </div>
        )}
      </>
      )}
      </>
    );
  };

  export default GiveawayCards;