const team = [
  {
    name: "Arshad Ahamed",
    title: "Regional Director of Media and Brand Strategy",
    from: "#5c2430",
    to: "#260f16",
  },
  {
    name: "Edith Chin",
    title: "Head of Finance",
    from: "#4a3220",
    to: "#1c130a",
  },
  {
    name: "Arshpreet Kaur",
    title: "Group General Counsel",
    from: "#1f3d38",
    to: "#0a1815",
  },
];

export default function TeamSection() {
  return (
    <section className="reveal mt-20 max-md:mt-[100px]">
      <div className="mx-auto w-full max-w-[1280px] px-5 max-md:px-10">
        <h2 className="mb-8 text-4xl font-extrabold text-white max-md:mb-12 max-md:text-5xl">
          Meet Our GOGetters
        </h2>

        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-4 max-md:gap-6">
          {team.map((member) => (
            <div key={member.name} className="rounded-2xl bg-white p-2">
              <div
                className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl p-4"
                style={{
                  background: `linear-gradient(160deg, ${member.from}, ${member.to})`,
                }}
              >
                <svg
                  className="pointer-events-none absolute left-1/2 top-[38%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 text-white/10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12Zm0 2.5c-3.5 0-10.5 1.8-10.5 5.4V22h21v-2.1c0-3.6-7-5.4-10.5-5.4Z" />
                </svg>
                <p className="relative text-base font-bold leading-tight text-white max-md:text-lg">
                  {member.name}
                </p>
                <p className="relative text-sm leading-snug text-white/80">
                  {member.title}
                </p>
              </div>
            </div>
          ))}

          <div className="relative flex aspect-[3/4] flex-col justify-center gap-6 overflow-hidden rounded-2xl rounded-br-[56px] bg-gradient-to-br from-[#1a2a5c] to-[#0c1330] p-6">
            <div>
              <p className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent max-md:text-6xl">
                +250
              </p>
              <p className="mt-3 text-base font-semibold text-blue-200 max-md:text-lg">
                team members embracing our #GrowTogether culture
              </p>
            </div>
            <a
              href="https://www.growthops.asia/culture"
              target="_self"
              className="w-fit rounded-full border border-white px-6 py-2 text-sm font-bold text-white transition duration-300 ease-out hover:bg-white hover:text-pink-600"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
