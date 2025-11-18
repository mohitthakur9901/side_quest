"use client"
import Footer from '@/components/blocks/footer'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  const toggleNavbar = () => {
    setOpenNavbar(openNavbar => !openNavbar)
  }
  return (
    <header className="absolute left-0 top-0 w-full flex items-center h-24 z-40">
      <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
        <div className="flex items-center min-w-max">
          <Link href="#" className="font-semibold flex items-center gap-x-2">
            <div className="flex items-center -space-x-3">
              <span className="h-6 aspect-square bg-purple-600 dark:bg-purple-500 rounded-full flex" />
              <span className="h-6 aspect-square bg-violet-600 dark:bg-violet-400 blur rounded-full flex" />
            </div>
            <span className="text-lg text-gray-700 dark:text-gray-300">HandyMan</span>
          </Link>
        </div>
        <div className={`
                absolute top-full  left-0 bg-white dark:bg-gray-950 lg:!bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none lg:w-max lg:space-x-16 lg:top-0 lg:relative  lg:flex duration-300 lg:transition-none ease-linear
                ${openNavbar ? "translate-y-0 opacity-0 visible" : "translate-y-10 opacity-0 invisible lg:visible  lg:translate-y-0 lg:opacity-100"}
            `}>
          {/* <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 dark:text-gray-300 lg:w-full lg:justify-center">
            <li>
              <Link href="#" className="px-2 transition-colors  py-2.5 hover:text-purple-600 ">Company</Link>
            </li>
            <li>
              <Link href="#" className="px-2 transition-colors  py-2.5 hover:text-purple-600 ">App</Link>
            </li>
           
          </ul> */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4  lg:min-w-max mt-10 lg:mt-0">
            <Link href="#" className="flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full bg-gray-100 dark:bg-gray-900 text-purple-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
              Download App
            </Link>
          </div>
        </div>
        <div className="flex items-center lg:hidden">
          <button onClick={() => { toggleNavbar() }} aria-label="Toggle navbar" className="outline-none border-l border-l-gray-100 dark:border-l-gray-800 pl-3 relative py-3 children:flex">
            <span aria-hidden="true" className={`
                                    h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
                                    ${openNavbar ? "rotate-45 translate-y-[0.33rem]" : ""}
                                `} />
            <span aria-hidden="true" className={`
                                    mt-2 h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
                                    ${openNavbar ? "-rotate-45 -translate-y-[0.33rem]" : ""}
                                `} />
          </button>
        </div>
      </nav>
    </header>

  )
}

export default function HeroSection() {
  return (
    <>
      <Navbar />
      <section className="min-h-max bg-white dark:bg-gray-950">
        <div className="absolute top-0 inset-x-0 h-64 flex items-start">
          <div className="h-24 w-2/3 bg-gradient-to-br from-purple-500 opacity-20 blur-2xl dark:from-purple-700 dark:invisible dark:opacity-40">
          </div>
          <div className="h-20 w-3/5 bg-gradient-to-r from-blue-600 opacity-40 blur-2xl dark:from-purple-700 dark:opacity-40">
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-2/5 aspect-[2/0.5] bg-gradient-to-br from-purple-600 to-violet-400 rounded-full opacity-50 blur-2xl">
        </div>
        <div className="relative mx-auto pt-32 pb-24 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-10">
          <h1 className="text-gray-900 dark:text-white mx-auto max-w-5xl font-bold text-4xl/tight sm:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight">
            We create, we design, we develop Modern tools.
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mx-auto max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt saepe atque enim quasi a ipsum
            asperiores necessitatibus deleniti, sint quo vel corporis dignissimos
          </p>
          <div className="flex justify-center items-center flex-wrap mx-auto gap-4">
            <Link href="#" className="flex items-center h-12 px-6 rounded-full bg-purple-600 text-white border border-purple-600">
              Hire us Now
            </Link>
            <Link href="#" className="flex items-center h-12 px-6 rounded-full bg-gray-100 dark:bg-gray-900 text-purple-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
              Learn more
            </Link>
          </div>
          <div className="text-left grid lg:grid-cols-3 p-6 rounded-2xl bg-gradient-to-tr from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 border border-gray-100 dark:border-gray-800 max-w-2xl lg:max-w-5xl mx-auto lg:divide-x divide-y lg:divide-y-0 divide-gray-300 dark:divide-gray-800">
            <div className="flex items-start gap-6 lg:pr-6 pb-6 lg:pb-0">
              <div className="w-10">
                <span className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 flex w-max text-gray-800 dark:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                  </svg>
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-gray-900 dark:text-white font-semibold text-lg">
                  High Quality
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 lg:px-6 py-6 lg:py-0">
              <div className="w-10">
                <span className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 flex w-max text-gray-800 dark:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-gray-900 dark:text-white font-semibold text-lg">
                  High Quality
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 pt-6 lg:pt-0 lg:pl-6">
              <div className="w-10">
                <span className="p-3 rounded-xl bg-gray-200 dark:bg-gray-800 flex w-max text-gray-800 dark:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                  </svg>
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="text-gray-900 dark:text-white font-semibold text-lg">
                  High Quality
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-10 xl:gap-14">
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <h2 className="text-4xl lg:text-4xl font-bold text-gray-800 dark:text-white">
                  We are offering best delivery services in Lubumbashi
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing
                elit.</p>
            </div>
            <div className="space-y-3">
              <div
                className="p-3 rounded-md bg-white dark:bg-gray-950 shadow-lg dark:shadow-none hover:shadow-emerald-600/20 shadow-transparent transition-all ease-linear border border-gray-100 hover:border-gray-100 dark:border-gray-900 dark:hover:border-gray-600">
                <div className="flex gap-4">
                  <div className="min-w-max">
                    <span
                      className="flex text-emerald-600 dark:text-gray-100 aspect-square rounded bg-emerald-600/10 dark:bg-gray-900 p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="w-7 h-7">
                        <path
                          d="M12 9a1 1 0 01-1-1V3c0-.553.45-1.008.997-.93a7.004 7.004 0 015.933 5.933c.078.547-.378.997-.93.997h-5z" />
                        <path
                          d="M8.003 4.07C8.55 3.992 9 4.447 9 5v5a1 1 0 001 1h5c.552 0 1.008.45.93.997A7.001 7.001 0 012 11a7.002 7.002 0 016.003-6.93z" />
                      </svg>
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Feature
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est animi reiciendis
                      laboriosam aut
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="p-3 rounded-md bg-white dark:bg-gray-950 shadow-lg dark:shadow-none shadow-transparent transition-all ease-linear border border-gray-100 hover:border-gray-100 dark:border-gray-900 hover:shadow-emerald-600/20 dark:hover:border-gray-600">
                <div className="flex gap-4">
                  <div className="min-w-max">
                    <span
                      className="flex text-emerald-600 dark:text-gray-100 aspect-square rounded bg-emerald-600/10 dark:bg-gray-900 p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="w-7 h-7">
                        <path
                          d="M12 9a1 1 0 01-1-1V3c0-.553.45-1.008.997-.93a7.004 7.004 0 015.933 5.933c.078.547-.378.997-.93.997h-5z" />
                        <path
                          d="M8.003 4.07C8.55 3.992 9 4.447 9 5v5a1 1 0 001 1h5c.552 0 1.008.45.93.997A7.001 7.001 0 012 11a7.002 7.002 0 016.003-6.93z" />
                      </svg>
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Feature
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est animi reiciendis
                      laboriosam aut
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="p-3 rounded-md bg-white dark:bg-gray-950 shadow-lg dark:shadow-none shadow-transparent transition-all ease-linear border border-gray-100 hover:border-gray-100 dark:border-gray-900 hover:shadow-emerald-600/20 dark:hover:border-gray-600">
                <div className="flex gap-4">
                  <div className="min-w-max">
                    <span
                      className="flex text-emerald-600 dark:text-gray-100 aspect-square rounded bg-emerald-600/10 dark:bg-gray-900 p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        className="w-7 h-7">
                        <path
                          d="M12 9a1 1 0 01-1-1V3c0-.553.45-1.008.997-.93a7.004 7.004 0 015.933 5.933c.078.547-.378.997-.93.997h-5z" />
                        <path
                          d="M8.003 4.07C8.55 3.992 9 4.447 9 5v5a1 1 0 001 1h5c.552 0 1.008.45.93.997A7.001 7.001 0 012 11a7.002 7.002 0 016.003-6.93z" />
                      </svg>
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Feature
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est animi reiciendis
                      laboriosam aut
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full md:h-auto object-cover flex md:items-end justify-center md:w-1/2 xl:w-[45%] relative">
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-tr from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700 rounded-3xl"></div>
            <Image src="/images/woman-with-gro.webp" width="1001" height="1001" alt="woman with grocery" className="wfull h-auto lg:w-[86%] relative" />
          </div>
        </div>
      </section>


      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col md:flex-row gap-16">
          <div className="flex md:flex-1">
            <Image src="/images/working-on-housing-project.jpg" alt="working on housing" width={1300} height={900} className="w-full md:h-full object-cover rounded-lg" />
          </div>
          <div className="md:w-1/2 lg:w-[54%] space-y-12 text-gray-700 dark:text-gray-300">
            <h1 className="text-gray-900 dark:text-white font-semibold text-2xl sm:text-3xl md:text-4xl">
              We help drive your business forward faster
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, saepe aliquid autem alias vero distinctio dignissimos consequatur? Excepturi quibusdam, quam ipsum hic, laudantium ducimus suscipit, culpa facere consequuntur repellat delectus.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-6 p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900">
                <span className="rounded-full bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 w-max p-3 flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </span>
                <h2 className="font-semibold text-xl text-gray-900 dark:text-white">Our mission</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur
                </p>
              </div>
              <div className="space-y-6 p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900">
                <span className="rounded-full bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 w-max p-3 flex">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <h2 className="font-semibold text-xl text-gray-900 dark:text-white">Our vision</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 ">
          <div className="p-6 sm:p-10 md:p-14 lg:p-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex flex-col space-y-6 relative">
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-bl from-blue-600 to-violet-500 blur-2xl z-10 -top-7 -left-7 opacity-40">
            </div>
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-bl from-blue-600 to-violet-500 blur-2xl z-10 -bottom-7 -right-7 opacity-40">
            </div>
            <div className="lg:h-full flex flex-col items-center text-center justify-center space-y-8 mx-auto max-w-2xl">
              <h1 className="font-bold text-gray-900 dark:text-white text-4xl">
                Join other <span className="text-transparent bg-clip-text bg-gradient-to-bl from-blue-700 to-violet-400 dark:from-blue-300 dark:to-violet-400">600
                  Amazing</span> developers
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-center max-w-xl">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium eligendi, doloremque velit excepturi
              </p>
              <form  className="w-full flex flex-col sm:items-center sm:flex-row gap-y-3 gap-x-4 max-w-lg mx-auto">
                <input type="email" placeholder="johndoe@gmail.com" className="py-3 px-5 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 outline-none w-full placeholder:text-gray-600 dark:placeholder:text-gray-300" />
                <button className="py-3 rounded-lg px-6 bg-blue-600 dark:bg-blue-500 text-white font-medium text-base w-full sm:w-max flex justify-center">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}