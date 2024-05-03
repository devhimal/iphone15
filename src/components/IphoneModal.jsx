import { useState, useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { models, sizes } from "../constants/index"
import { yellowImg } from "../utils"
import IphoneModalView from "./IphoneModalView"
import {
  animateWithGsap,
  animateWithGsapTimeline,
} from "../utils/gsapanimaiton"

// camera angle
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"

const IphoneModal = () => {
  const [mobileSize, setMobileSize] = useState("small")

  const [iphoneModel, setIphoneModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  })

  // camera control for the model view
  const cameraControlSmall = useRef()
  const cameraControlLarge = useRef()

  // model
  const small = useRef(new THREE.Group())
  const large = useRef(new THREE.Group())

  // rotation
  const [smallRotation, setSmallRotation] = useState(0)
  const [largeRotation, setLargeRotation] = useState(0)

  const tl = gsap.timeline()

  useEffect(() => {
    if (mobileSize === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      })
    }

    if (mobileSize === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      })
    }
  }, [mobileSize])

  useGSAP(() => {
    animateWithGsap("#sectionheading", {
      opacity: 1,
      duration: 2,
      y: 0,
      ease: "power2.inOut",
    })

    animateWithGsap("#subheading", {
      opacity: 1,
      duration: 2,
      y: 0,
      ease: "power2.inOut",
    })
  })

  return (
    <div className="common-padding">
      <div className="screen-max-width">
        <div className="flex flex-col gap-4 ">
          <h1 id="sectionheading" className="section-heading">
            Take a closer look.
          </h1>
          <p className="translate-y-24 opacity-0 " id="subheading">
            This is the 3D model of the iphone 15, you can move mouse around to
            see the 3D effects.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center ">
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
            <IphoneModalView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={iphoneModel}
              size={mobileSize}
            />
            <IphoneModalView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={iphoneModel}
              size={mobileSize}
            />
            <Canvas
              className="size-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
        </div>
        {/* buttons */}

        <div className="mx-auto w-full py-4">
          <p className="mb-6 text-center">{iphoneModel.title}</p>

          <div className="flex-center ">
            <ul className="color-container">
              {models.map((item, i) => (
                <li
                  key={i}
                  className="mx-2 size-4 cursor-pointer rounded-full sm:size-6"
                  style={{ backgroundColor: item.color[0] }}
                  // onClick={() =>
                  //   setIphoneModel((pre) => ({
                  //     ...pre,
                  //     title: item.title,
                  //     color: item.title,
                  //     img: item.img,
                  //   }))
                  // }
                ></li>
              ))}
            </ul>
            <div className="size-btn-container ">
              {sizes.map((btn, i) => (
                <button
                  key={i}
                  className="size-btn"
                  style={{
                    backgroundColor:
                      mobileSize === btn.value ? "white" : "transparent",
                    color: mobileSize === btn.value ? "black" : "white",
                  }}
                  onClick={() => setMobileSize(btn.value)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IphoneModal
