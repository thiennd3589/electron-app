import { useEffect, useRef } from "react";
import "./styles.css";

function CountDown(props: { time: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    /*Declare time*/
    const countToDate = new Date().setSeconds(
      new Date().getSeconds() + props.time
    );

    /*Calculate time from current date compared to the Declared time*/
    const interval = setInterval(() => {
      const currentDate = new Date();
      //@ts-ignore
      const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
      if (timeBetweenDates < 0) {
        audioRef.current?.pause();
        timeoutRef.current?.play();
        clearInterval(interval);
        return;
      }
      flipAllcard(timeBetweenDates);
    }, 50);

    /*Populate the cards with the data coming from the Declared Time*/
    function flipAllcard(time: number) {
      const seconds = time % 60;
      const minutes = Math.floor(time / 60) % 60;
      const hours = Math.floor(time / 3600) % 24;
      // const days = Math.floor(time / 86400);

      // flip(document.querySelector("[data-days]")!, days, true);
      flip(document.querySelector("[data-hours]")!, hours);
      flip(document.querySelector("[data-minutes]")!, minutes);
      flip(document.querySelector("[data-seconds]")!, seconds);
    }

    /*Flip animation function for the cards*/
    function flip(flipcard: HTMLElement, newNumber: number, flag?: boolean) {
      const cardTop = flipcard.querySelector("[data-card-top]")!;
      const startNumber = cardTop ? parseInt(cardTop.textContent!, 10) : 0;

      const cardBot = flipcard.querySelector("[data-card-bot]")!,
        topFlip = flipcard.querySelector("[data-flip-top]")!,
        botFlip = flipcard.querySelector("[data-flip-bot]")!,
        topFlipNum = flipcard.querySelector("[data-flip-top-num]")!,
        botFlipNum = flipcard.querySelector("[data-flip-bot-num]")!;

      if (newNumber === startNumber) return;

      const displayStartNum = String(startNumber).padStart(2, "0");

      const displayNewNum = String(newNumber).padStart(2, "0");

      if (flag) console.log("displayStartNum", displayStartNum, displayNewNum);
      //@ts-ignore
      const anim = (el, event: EventListener, callback: () => void) => {
        const handler = () => {
          el.removeEventListener(event, handler);
          callback();
        };

        el.addEventListener(event, handler);
      };

      cardTop.textContent = displayStartNum;
      cardBot.textContent = displayStartNum;
      topFlipNum.textContent = displayStartNum;
      botFlipNum.textContent = displayNewNum;

      topFlip.classList.add("flip-card-top");
      botFlip.classList.add("flip-card-bottom");

      //@ts-ignore
      anim(topFlip, "animationstart", () => {
        cardTop.textContent = displayNewNum;
      });
      //@ts-ignore
      anim(topFlip, "animationend", () => {
        //@ts-ignore
        topFlipNum.innerText = displayNewNum;
        topFlip.classList.remove("flip-card-top");
      });
      //@ts-ignore
      anim(botFlip, "animationend", () => {
        cardBot.textContent = displayNewNum;
        botFlip.classList.remove("flip-card-bottom");
      });
    }
  }, []);

  return (
    <div
      className="relative w-full h-screen m-0 bg-gradient-to-b from-mostlyBlackBlue to-veryDarkBlue
    font-redHatText"
    >
      <audio autoPlay loop ref={audioRef}>
        <source src="/clock.wav" />
      </audio>
      <audio ref={timeoutRef}>
        <source src="/timeout.mp3" />
      </audio>

      <section className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-xl text-center tracking-[8px] md:text-4xl text-grayishBlue md:tracking-[14px] font-bold">
          ASHA ACADEMY
        </div>
        {/* <!--Time--> */}
        <div className="mt-[40px] flex justify-center items-center gap-[40px]">
          {/* <!--HOURS--> */}
          {/* <div className="flex flex-col-reverse justify-center items-center space-y-10">
            <h1 className="mt-[30px] text-2xl text-grayishBlue font-bold">
              DAYS
            </h1>
            <div className="flex justify-center items-center">
              <div
                className="flex flex-col text-softRed space-y-[1px] rounded-xl container-shadow"
                data-days
              >
                <span
                  className="relative w-[180px] h-[90px] bg-slightlyDarkerDesBlue overflow-hidden
                         rounded-tl-xl rounded-tr-xl flex justify-center items-end text-8xl"
                >
                  <div className="absolute w-full h-full flex justify-start items-end">
                    <div className="w-[10px] h-[8px] rounded-tr-full bg-veryDarkBlue"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-end">
                    <div className="w-[10px] h-[8px] rounded-tl-full bg-veryDarkBlue"></div>
                  </div>
                  <span className="translate-y-[46px]" data-card-top>
                    00
                  </span>
                  <span
                    className="absolute w-[180px] h-[90px] bg-slightlyDarkerDesBlue overflow-hidden
                             rounded-tl-xl rounded-tr-xl flex justify-center items-end text-8xl top-flip-shadow"
                    data-flip-top
                  >
                    <div className="absolute w-full h-full flex justify-start items-end">
                      <div className="w-[10px] h-[8px] rounded-tr-full bg-veryDarkBlue"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-end">
                      <div className="w-[10px] h-[8px] rounded-tl-full bg-veryDarkBlue"></div>
                    </div>
                    <span
                      className="translate-y-[46px]"
                      data-flip-top-num
                      data-card-top
                    >
                      00
                    </span>
                  </span>
                </span>
                <span
                  className="relative w-[180px] h-[90px] bg-darkDesaturatedBlue overflow-hidden 
                        rounded-bl-xl rounded-br-xl flex justify-center items-end text-8xl bottom-flip-shadow"
                >
                  <div className="absolute w-full h-full flex justify-start items-start">
                    <div className="w-[10px] h-[8px] rounded-br-full bg-veryDarkBlue"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-start">
                    <div className="w-[10px] h-[8px] rounded-bl-full bg-veryDarkBlue"></div>
                  </div>
                  <span className="-translate-y-[45px]" data-card-bot>
                    00
                  </span>
                  <span
                    className="absolute w-[180px] h-[90px] bg-darkDesaturatedBlue overflow-hidden 
                            rounded-bl-xl rounded-br-xl flex justify-center items-end text-8xl bottom-flip-shadow"
                    data-flip-bot
                  >
                    <div className="absolute w-full h-full flex justify-start items-start">
                      <div className="w-[10px] h-[8px] rounded-br-full bg-veryDarkBlue"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-start">
                      <div className="w-[10px] h-[8px] rounded-bl-full bg-veryDarkBlue"></div>
                    </div>
                    <span className="-translate-y-[45px]" data-flip-bot-num>
                      00
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div> */}
          {/* <!--HOURS--> */}
          <div className="flex flex-col-reverse justify-center items-center space-y-10">
            <h1 className="mt-[30px] text-2xl text-grayishBlue font-bold">
              GIỜ
            </h1>
            <div className="flex justify-center items-center">
              <div
                className="flex flex-col text-softRed space-y-[1px] rounded-xl container-shadow"
                data-hours
              >
                {/* <!--Top--> */}
                <span
                  className="relative w-[180px] h-[90px] bg-slightlyDarkerDesBlue overflow-hidden
                         rounded-tl-xl rounded-tr-xl flex justify-center items-end text-8xl"
                >
                  <div className="absolute w-full h-full flex justify-start items-end">
                    <div className="w-[10px] h-[8px] rounded-tr-full bg-veryDarkBlue"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-end">
                    <div className="w-[10px] h-[8px] rounded-tl-full bg-veryDarkBlue"></div>
                  </div>
                  <span className="translate-y-[46px]" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span
                    className="absolute w-[180px] h-[90px] bg-slightlyDarkerDesBlue overflow-hidden
                             rounded-tl-xl rounded-tr-xl flex justify-center items-end text-8xl top-flip-shadow"
                    data-flip-top
                  >
                    <div className="absolute w-full h-full flex justify-start items-end">
                      <div className="w-[10px] h-[8px] rounded-tr-full bg-veryDarkBlue"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-end">
                      <div className="w-[10px] h-[8px] rounded-tl-full bg-veryDarkBlue"></div>
                    </div>
                    <span
                      className="translate-y-[46px]"
                      data-flip-top-num
                      data-card-top
                    >
                      00
                    </span>
                  </span>
                </span>
                {/* <!--Bottom--> */}
                <span
                  className="relative w-[180px] h-[90px] bg-darkDesaturatedBlue overflow-hidden 
                        rounded-bl-xl rounded-br-xl flex justify-center items-end text-8xl bottom-flip-shadow"
                >
                  <div className="absolute w-full h-full flex justify-start items-start">
                    <div className="w-[10px] h-[8px] rounded-br-full bg-veryDarkBlue"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-start">
                    <div className="w-[10px] h-[8px] rounded-bl-full bg-veryDarkBlue"></div>
                  </div>
                  <span className="-translate-y-[45px]" data-card-bot>
                    00
                  </span>
                  {/* <!--FlipBottom--> */}
                  <span
                    className="absolute w-[180px] h-[90px] bg-darkDesaturatedBlue overflow-hidden 
                            rounded-bl-xl rounded-br-xl flex justify-center items-end text-8xl bottom-flip-shadow"
                    data-flip-bot
                  >
                    <div className="absolute w-full h-full flex justify-start items-start">
                      <div className="w-[10px] h-[8px] rounded-br-full bg-veryDarkBlue"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-start">
                      <div className="w-[10px] h-[8px] rounded-bl-full bg-veryDarkBlue"></div>
                    </div>
                    <span className="-translate-y-[45px]" data-flip-bot-num>
                      00
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* <!--MINUTES--> */}
          <div className="flex flex-col-reverse justify-center items-center space-y-10">
            <h1 className="mt-[30px] text-2xl text-grayishBlue font-bold">
              PHÚT
            </h1>
            <div className="flex justify-center items-center">
              <div
                className="flex flex-col text-softRed space-y-[1px] rounded-xl container-shadow"
                data-minutes
              >
                {/* <!--Top--> */}
                <span
                  className="relative w-[180px] h-[90px] bg-slightlyDarkerDesBlue overflow-hidden
                         rounded-tl-xl rounded-tr-xl flex justify-center items-end text-8xl"
                >
                  <div className="absolute w-full h-full flex justify-start items-end">
                    <div className="w-[10px] h-[8px] rounded-tr-full bg-veryDarkBlue"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-end">
                    <div className="w-[10px] h-[8px] rounded-tl-full bg-veryDarkBlue"></div>
                  </div>
                  <span className="translate-y-[46px]" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span
                    className="absolute w-[180px] h-[90px] bg-slightlyDarkerDesBlue overflow-hidden
                             rounded-tl-xl rounded-tr-xl flex justify-center items-end text-8xl top-flip-shadow"
                    data-flip-top
                  >
                    <div className="absolute w-full h-full flex justify-start items-end">
                      <div className="w-[10px] h-[8px] rounded-tr-full bg-veryDarkBlue"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-end">
                      <div className="w-[10px] h-[8px] rounded-tl-full bg-veryDarkBlue"></div>
                    </div>
                    <span
                      className="translate-y-[46px]"
                      data-flip-top-num
                      data-card-top
                    >
                      00
                    </span>
                  </span>
                </span>
                {/* <!--Bottom--> */}
                <span
                  className="relative w-[180px] h-[90px] bg-darkDesaturatedBlue overflow-hidden 
                        rounded-bl-xl rounded-br-xl flex justify-center items-end text-8xl bottom-flip-shadow"
                >
                  <div className="absolute w-full h-full flex justify-start items-start">
                    <div className="w-[10px] h-[8px] rounded-br-full bg-veryDarkBlue"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-start">
                    <div className="w-[10px] h-[8px] rounded-bl-full bg-veryDarkBlue"></div>
                  </div>
                  <span className="-translate-y-[45px]" data-card-bot>
                    00
                  </span>
                  {/* <!--FlipBottom--> */}
                  <span
                    className="absolute w-[180px] h-[90px] bg-darkDesaturatedBlue overflow-hidden 
                            rounded-bl-xl rounded-br-xl flex justify-center items-end text-8xl bottom-flip-shadow"
                    data-flip-bot
                  >
                    <div className="absolute w-full h-full flex justify-start items-start">
                      <div className="w-[10px] h-[8px] rounded-br-full bg-veryDarkBlue"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-start">
                      <div className="w-[10px] h-[8px] rounded-bl-full bg-veryDarkBlue"></div>
                    </div>
                    <span className="-translate-y-[45px]" data-flip-bot-num>
                      00
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* <!--Seconds--> */}
          <div className="flex flex-col-reverse justify-center items-center space-y-10">
            <h1 className="mt-[30px] text-2xl text-grayishBlue font-bold">
              GIÂY
            </h1>
            <div className="flex justify-center items-center">
              <div
                className="flex flex-col text-softRed space-y-[1px] rounded-xl container-shadow"
                data-seconds
              >
                {/* <!--Top--> */}
                <span
                  className="relative w-[180px] h-[90px] bg-slightlyDarkerDesBlue overflow-hidden
                         rounded-tl-xl rounded-tr-xl flex justify-center items-end text-8xl"
                >
                  <div className="absolute w-full h-full flex justify-start items-end">
                    <div className="w-[10px] h-[8px] rounded-tr-full bg-veryDarkBlue"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-end">
                    <div className="w-[10px] h-[8px] rounded-tl-full bg-veryDarkBlue"></div>
                  </div>
                  <span className="translate-y-[46px]" data-card-top>
                    00
                  </span>
                  {/* <!--FlipTop--> */}
                  <span
                    className="absolute w-[180px] h-[90px] bg-slightlyDarkerDesBlue overflow-hidden
                             rounded-tl-xl rounded-tr-xl flex justify-center items-end text-8xl top-flip-shadow"
                  >
                    <div
                      className="absolute w-full h-full flex justify-start items-end"
                      data-flip-top
                    >
                      <div className="w-[10px] h-[8px] rounded-tr-full bg-veryDarkBlue"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-end">
                      <div className="w-[10px] h-[8px] rounded-tl-full bg-veryDarkBlue"></div>
                    </div>
                    <span
                      className="translate-y-[46px]"
                      data-flip-top-num
                      data-card-top
                    >
                      00
                    </span>
                  </span>
                </span>
                {/* <!--Bottom--> */}
                <span
                  className="relative w-[180px] h-[90px] bg-darkDesaturatedBlue overflow-hidden 
                        rounded-bl-xl rounded-br-xl flex justify-center items-end text-8xl bottom-flip-shadow"
                >
                  <div className="absolute w-full h-full flex justify-start items-start">
                    <div className="w-[10px] h-[8px] rounded-br-full bg-veryDarkBlue"></div>
                  </div>
                  <div className="absolute w-full h-full flex justify-end items-start">
                    <div className="w-[10px] h-[8px] rounded-bl-full bg-veryDarkBlue"></div>
                  </div>
                  <span className="-translate-y-[45px]" data-card-bot>
                    00
                  </span>
                  {/* <!--FlipBottom--> */}
                  <span
                    className="absolute w-[180px] h-[90px] bg-darkDesaturatedBlue overflow-hidden 
                            rounded-bl-xl rounded-br-xl flex justify-center items-end text-8xl bottom-flip-shadow"
                    data-flip-bot
                  >
                    <div className="absolute w-full h-full flex justify-start items-start">
                      <div className="w-[10px] h-[8px] rounded-br-full bg-veryDarkBlue"></div>
                    </div>
                    <div className="absolute w-full h-full flex justify-end items-start">
                      <div className="w-[10px] h-[8px] rounded-bl-full bg-veryDarkBlue"></div>
                    </div>
                    <span className="-translate-y-[45px]" data-flip-bot-num>
                      00
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-[250px] flex justify-center items-center gap-[30px]">
          <div className="group">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                className="group-hover:fill-red-500 group-hover:cursor-pointer hover:fill-softRed"
                fill="#8385A9"
                d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"
              />
            </svg>
          </div>
          <div className="group">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                className="group-hover:fill-red-500 group-hover:cursor-pointer hover:fill-softRed"
                fill="#8385A9"
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
              />
            </svg>
          </div>
          <div className="group">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                className="group-hover:fill-red-500 group-hover:cursor-pointer"
                fill="#8385A9"
                d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
              />
            </svg>
          </div>
        </div> */}
      </section>
    </div>
  );
}

export default CountDown;
