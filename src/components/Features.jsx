import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import React, { useRef } from "react"
import { explore1Img, explore2Img, exploreVideo } from "../utils"
import { animateWithGsap } from "../utils/gsapanimaiton"

const Features = () => {
  const videoRef = useRef()

  useGSAP(() => {
    animateWithGsap("#featureheading", {
      opacity: 1,
      translateY: 0,
      duration: 2,
      ease: "power2.inOut",
    })
    animateWithGsap(".videotitle", {
      opacity: 1,
      duration: 2,
      ease: "power2.inOut",
    })
    animateWithGsap(".g_text", {
      opacity: 1,
      duration: 2,
      ease: "power2.inOut",
    })
  }, [])
  return (
    <section className="h-full common-padding relative bg-zinc overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full h-full">
          <h3 id="featureheading" className="section-heading">
            Explore the interesting story of apple phones.
          </h3>
          <div className="flex justify-between flex-col my-10">
            <div className="py-10 px-10">
              <h1 className=" videotitle md:text-5xl capitalize font-extrabold flex flex-col gap-2 sm:gap-4  translate-y-0 opacity-0">
                <span>Iphone 15.</span> <span> Forged in titanium</span>
              </h1>
            </div>
            <video
              muted
              playsInline
              id="exploreVideo"
              className="w-full h-full rounded-md"
              preload="none"
              autoPlay
              ref={videoRef}
            >
              <source src={exploreVideo} type="video/mp4" />
            </video>
          </div>
          {/* two video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img
              src={explore1Img}
              alt="explore image 1 "
              className="h-[400px] w-full rounded-md"
            />
            <img
              src={explore2Img}
              alt="explore image 1 "
              className="h-[400px] w-full rounded-md"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="feature-text g_text">
              iPhone 15 Pro is
              <span className="text-white">
                the first iPhone to feature an aerospace-grade titanium design
              </span>
              , using the same alloy that spacecrafts use for missions to Mars.
            </p>
            <p className="feature-text g_text">
              Titanium has one of the best strength-to-weight ratios of any
              metal, making these our
              <span className="text-white">lightest Pro models ever.</span>
              You'll notice the difference the moment you pick one up.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
