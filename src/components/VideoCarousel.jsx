// import React from 'react'
import { useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import { useEffect } from "react"
import gsap from "gsap"
import { pauseImg, playImg, replayImg } from "../utils"
import { useGSAP } from "@gsap/react"

import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {
  const videoRef = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef = useRef([])

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  })

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video

  useGSAP(() => {
    // animation for slider element
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    })

    // animation for video
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },

      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }))
      },
    })
  }, [isEnd, videoId])

  const [loadedData, setLoadedData] = useState([])

  const handleLoadedMetaData = (i, e) =>
    setLoadedData((prev) => ({ ...prev, e }))

  // useEffect(() => {
  //   let currentProgressBar = 0
  //   let span = videoSpanRef.current
  //   if (span[videoId]) {
  //     //   animate the progress bar of the video
  //     let anime = gsap.to(span[videoId], {
  //       onUpdate: () => {
  //         const progressBar = Math.ceil(anime.progress() * 100)

  //         if (progressBar != currentProgressBar) {
  //           currentProgressBar = progressBar
  //         }

  //         gsap.to(videoDivRef.current[videoId], {
  //           width:
  //             window.innerWidth < 760
  //               ? "10vw"
  //               : window.innerWidth < 1200
  //               ? "10vw"
  //               : "4vw",
  //         })

  //         gsap.to(span[videoId], {
  //           width: `${currentProgressBar}%`,
  //           backgroundColor: "white",
  //           duration: 0.5,
  //         })
  //       },
  //       onComplete: () => {
  //         if (isPlaying) {
  //           gsap.to(videoDivRef.current[videoId], {
  //             width: "12px",
  //           })
  //           gsap.to(span[videoId], { backgroundColor: "#afafaf" })
  //         }
  //       },
  //     })

  //     if (videoId == 0) {
  //       anime.restart()
  //     }

  //     // update the progress bar
  //     const animUpdate = () => {
  //       anime.progress(
  //         videoRef.current[videoId].currentTime /
  //           hightlightsSlides[videoId].videoDuration
  //       )
  //     }

  //     if (isPlaying) {
  //       // ticker to update the progress bar
  //       gsap.ticker.add(animUpdate)
  //     } else {
  //       // remove the ticker when the video is paused (progress bar is stopped)
  //       gsap.ticker.remove(animUpdate)
  //     }
  //   }
  // }, [videoId, startPlay, isPlaying])
  useEffect(() => {
    let currentProgressBar = 0
    let span = videoSpanRef.current

    if (span[videoId] && videoRef.current[videoId]) {
      //   animate the progress bar of the video
      let anime = gsap.to(span[videoId], {
        onUpdate: () => {
          const progressBar = Math.ceil(anime.progress() * 100)

          if (progressBar !== currentProgressBar) {
            currentProgressBar = progressBar
          }

          const currentVideo = videoRef.current[videoId]
          if (currentVideo) {
            const videoDuration = hightlightsSlides[videoId].videoDuration
            const currentTime = currentVideo.currentTime
            const progress = currentTime / videoDuration

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            })

            gsap.to(span[videoId], {
              width: `${currentProgressBar}%`,
              backgroundColor: "white",
              duration: 0.5,
            })
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            })
            gsap.to(span[videoId], { backgroundColor: "#afafaf" })
          }
        },
      })

      if (videoId === 0) {
        anime.restart()
      }

      // update the progress bar
      const animUpdate = () => {
        const currentVideo = videoRef.current[videoId]
        if (currentVideo) {
          anime.progress(
            currentVideo.currentTime / hightlightsSlides[videoId].videoDuration
          )
        }
      }

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate)
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate)
      }
    } else {
      console.log("Video element or span element is not available:", videoId)
    }
  }, [videoId, startPlay, isPlaying])


  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause()
      } else {
        startPlay && videoRef.current[videoId].play()
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData])

  const handleVideoProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: i + 1 }))
        break

      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }))
        break

      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }))
        break

      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
        break

      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }))
        break

      default:
        return video
    }
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((video, index) => {
          return (
            <div key={index} className="pr-10 sm:pr-20" id="slider">
              <div className="video-carousel_container">
                <div className="flex-center size-full overflow-hidden rounded-3xl bg-black">
                  <video
                    id="video"
                    playsInline={true}
                    preload="auto"
                    muted
                    autoPlay
                    ref={(e) => (videoRef.current[index] = e)}
                    onEnded={() =>
                      index != 3
                        ? handleVideoProcess("video-end", index)
                        : handleVideoProcess("video-last")
                    }
                    onPlay={() =>
                      setVideo((prevVideo) => ({
                        ...prevVideo,
                        isPlaying: true,
                      }))
                    }
                    onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                  >
                    <source src={video.video} type="video/mp4" />
                  </video>
                </div>
                <div className=" absolute top-10 px-8 text-lg font-medium md:text-xl">
                  {video.textLists.map((text) => {
                    return <p key={text}>{text}</p>
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex-center mt-10 ">
        <div className="flex-center rounded-full bg-gray-300 px-5 py-7 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="relative mx-2 h-4 w-3 cursor-pointer rounded-full bg-gray-200 "
            >
              <span
                className="absolute size-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn ">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleVideoProcess("video-reset")
                : !isPlaying
                ? () => handleVideoProcess("play")
                : () => handleVideoProcess("pause")
            }
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
