"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main>
      {/* Top section */}
      <header className="flex flex-col md:flex-row justify-between gap-x-4 gap-y-16 px-12 lg:px-[8%] xl:px-[14%] py-20">
        <section className="flex flex-col justify-between gap-y-6">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-3 lg:text-5xl text-4xl font-bold text-primary-light-pink">
              <h1>Music resonates,</h1>
              <h1><span className="text-primary-pink hover:text-primary-dark-pink">Echo</span> remembers.</h1>
            </div>
            <div className="flex flex-col gap-y-4 text-xl font-bold">
              <p className="text-primary-light-gray">Track your top <span className="text-primary-dark-pink">artists</span></p>
              <p className="text-primary-light-gray">Track your top <span className="text-primary-dark-pink">tracks</span></p>
              <p className="text-primary-light-gray">Track your top <span className="text-primary-dark-pink">genres</span></p>
              <p className="text-primary-dark-pink">Discover new music</p>
            </div>
          </div>
          <button 
            className="flex w-fit px-8 py-3 text-xl font-bold rounded-full text-primary-light-pink bg-primary-pink hover:bg-primary-dark-pink"
            onClick={() => signIn('spotify', { callbackUrl: '/dashboard' } )}>
              Sign up today!
          </button>
        </section>
        <section className="flex w-full md:w-1/2 h-auto rounded-3xl bg-opacity-45 bg-primary-pink">
          {/* TODO: !!! Replace image !!! */}
          <img src="/mock-display.svg" alt="mockup display" /> 
        </section>
      </header>

      {/* Bottom section */}
      <section className="px-8 lg:px-[8%] xl:px-[14%] py-20 bg-primary-dark-gray">
        <div className="flex flex-col gap-y-8 w-full h-auto p-16 rounded-3xl text-lg font-medium text-primary-light-pink bg-opacity-45 bg-primary-pink">
          <p>Connect your Spotify account and gain access to your top artists, tracks, and genres. Plus, you have the flexibility to sort them based on your listening history from the last month, six months, or even all time. It's a simple and engaging way to rediscover your favorite music.</p>
          <p>And with our track recommendations feature, you'll always have something new to listen to, curated just for you.</p>
        </div>
      </section>
    </main>
  )
}
