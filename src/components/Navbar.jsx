import { appleImg, bagImg, searchImg } from "../utils/index"
import { navLists } from "../constants/index"

const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between  p-5 sm:px-10  ">
      <nav className="screen-max-width flex w-full items-center justify-between ">
        <img src={appleImg} alt="apple Logo" className="size-[30px]" />
        <section className="flex flex-1 items-center justify-center gap-8 max-sm:hidden">
          {navLists.map((link, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer text-lg text-[#78787c] transition-all delay-75 hover:text-white"
              >
                {link}
              </div>
            )
          })}
        </section>
        <section className="flex items-center justify-between gap-4 max-sm:gap-2">
          <img
            src={searchImg}
            alt="earchIcons"
            className="max-w:size-[16px] size-[20px] cursor-pointer"
          />
          <img
            src={bagImg}
            alt="bag"
            className="max-w:size-[16px] size-[20px] cursor-pointer"
          />
        </section>
      </nav>
    </header>
  )
}

export default Navbar
