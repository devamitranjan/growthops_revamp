import { FaAngleDown } from "react-icons/fa6";

export default function HeroBanner() {
  return (
    <div className="relative">
      <div className="h-screen w-full">
        <div className="absolute top-0 w-full h-full z-10 bg-gradient-to-t from-neutral-black-base to-transparent to-70%" />
        <video
          preload="auto"
          muted
          loop
          playsInline
          poster="/placeholder.svg"
          className="h-screen w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="generic-container w-full flex flex-col gap-4 md:items-center text-neutral-white-base z-20 absolute bottom-0 left-1/2 -translate-x-1/2 pb-12 md:pb-8 border-b border-neutral-white-base/20">
        <h1 className="heading-h1-extrabold text-left md:text-center">
          Grow Unforgettable with GO
        </h1>
        <div className="flex flex-col gap-20 items-center">
          <div className="text-neutral-white-base text-left md:text-center gap-1">
            <p className="body1-bold">
              Growing Brands, Businesses and Bottom Lines for over 15 years
            </p>
            <p className="body1-regular">
              GrowthOps Asia is a marketing transformation agency that has
              helped grow and sustain market leaders by fusing digital-first
              strategy, design and technology.
            </p>
          </div>
          <div className="flex items-center gap-5 max-md:hidden">
            <p className="body1-semibold text-neutral-white-base">Explore</p>
            <div className="relative h-10 w-10 flex justify-center items-center text-neutral-white-base">
              <div className="animate-spin-slow absolute top-0 left-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="40"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.8301 0.670391C19.8301 0.300144 20.1302 0 20.5005 0C23.1269 -1.06556e-07 25.7276 0.517315 28.1541 1.52241C30.5807 2.5275 32.7854 4.00069 34.6426 5.85787C36.4998 7.71504 37.973 9.91982 38.9781 12.3463C39.9832 14.7728 40.5005 17.3736 40.5005 20C40.5005 20.3703 40.2003 20.6704 39.8301 20.6704C39.4598 20.6704 39.1597 20.3703 39.1597 20C39.1597 17.5496 38.6771 15.1233 37.7393 12.8594C36.8016 10.5956 35.4272 8.53861 33.6945 6.80594C31.9619 5.07327 29.9049 3.69885 27.641 2.76113C25.3772 1.82342 22.9508 1.34078 20.5005 1.34078C20.1302 1.34078 19.8301 1.04064 19.8301 0.670391Z"
                    fill="#F5F5F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.802 1.8562C13.9422 2.19888 13.778 2.59032 13.4353 2.7305C12.2619 3.21051 11.1405 3.80884 10.0885 4.51624C9.78123 4.72283 9.36468 4.64124 9.15808 4.33399C8.95149 4.02674 9.03309 3.61019 9.34033 3.40359C10.468 2.64536 11.67 2.00403 12.9277 1.48954C13.2703 1.34936 13.6618 1.51351 13.802 1.8562Z"
                    fill="#F5F5F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.95485 8.49314C5.25989 8.70299 5.33706 9.12038 5.12721 9.42542C3.00785 12.5061 1.863 16.1525 1.8411 19.8918C1.81921 23.631 2.92129 27.2906 5.00442 30.3959C7.08756 33.5012 10.0556 35.909 13.5238 37.3071C16.9919 38.7051 20.8001 39.0289 24.4544 38.2364C24.8163 38.158 25.1732 38.3877 25.2517 38.7495C25.3302 39.1113 25.1004 39.4683 24.7386 39.5467C20.8216 40.3962 16.7398 40.0491 13.0225 38.5506C9.30515 37.0521 6.12379 34.4713 3.89097 31.1429C1.65815 27.8144 0.476876 23.8919 0.500343 19.8839C0.52381 15.876 1.75093 11.9676 4.02258 8.66549C4.23242 8.36046 4.64982 8.28329 4.95485 8.49314Z"
                    fill="#F5F5F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M37.0142 30.0715C37.3234 30.2751 37.4091 30.6909 37.2054 31.0001C35.7645 33.1883 33.9077 35.072 31.7405 36.5443C31.4343 36.7523 31.0173 36.6727 30.8093 36.3665C30.6012 36.0602 30.6808 35.6433 30.9871 35.4352C33.009 34.0616 34.7413 32.3042 36.0856 30.2627C36.2893 29.9535 36.705 29.8679 37.0142 30.0715Z"
                    fill="#F5F5F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M38.9815 25.7032C39.3313 25.8246 39.5164 26.2066 39.3951 26.5564C39.26 26.9455 39.113 27.3304 38.9542 27.7105C38.8114 28.0521 38.4188 28.2133 38.0771 28.0706C37.7355 27.9279 37.5743 27.5352 37.717 27.1936C37.8652 26.839 38.0024 26.4799 38.1284 26.1168C38.2497 25.767 38.6317 25.5819 38.9815 25.7032Z"
                    fill="#F5F5F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.6106 22.9789C39.9742 23.0485 40.2125 23.3998 40.1429 23.7634C40.0725 24.1309 39.9918 24.4962 39.9009 24.8591C39.811 25.2183 39.4469 25.4365 39.0878 25.3466C38.7286 25.2566 38.5104 24.8926 38.6003 24.5334C38.6851 24.1949 38.7604 23.854 38.826 23.5112C38.8957 23.1476 39.2469 22.9092 39.6106 22.9789Z"
                    fill="#F5F5F5"
                  />
                </svg>
              </div>
              <FaAngleDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
