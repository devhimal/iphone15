import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { rightImg, watchImg } from "../utils"
import VideoCarousel from "./VideoCarousel"
import { animateWithGsap } from "../utils/gsapanimaiton"

const Highlights = () => {
  useGSAP(() => {
    animateWithGsap("#title", { opacity: 1, Y: 0, duration: 2 })
    animateWithGsap(".link", { opacity: 1, y: 0, duration: 2, stagger: 0.25 })
  }, [])

  return (
    <section
      id="highlights"
      className="common-padding  h-full w-screen overflow-hidden bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between  md:flex ">
          <h1 id="title" className="section-heading ">
            Get the highlights
          </h1>
          <div className="flex items-center justify-end gap-4 max-sm:flex-col max-sm:items-start ">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights
