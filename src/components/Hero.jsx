import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { heroVideo, smallHeroVideo } from "../utils"
import { useState, useEffect } from "react"

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 768 ? smallHeroVideo : heroVideo
  )
  const handleVideoSrc = () => {
    if (window.innerWidth < 768) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrc)

    return () => {
      window.addEventListener("resize", handleVideoSrc)
    }
  })

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 })

    gsap.to("#cta", {
      opacity: 1,
      delay: 2,
      translateY: -50,
    })
  }, [])

  return (
    <section className="nav-height relative">
      <div className="flex-center h-5/6 w-full flex-col">
        <p className="hero-title text-white" id="hero">
          IPhone 15 Pro
        </p>
        <div className="pointer-events-none w-9/12 md:w-10/12">
          <video autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex translate-y-20 flex-col items-center opacity-0"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="text-xl font-normal">$999</p>
      </div>
    </section>
  )
}

export default Hero
