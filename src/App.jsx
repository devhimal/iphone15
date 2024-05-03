import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Highlights from "./components/Highlights"
import IphoneModal from "./components/IphoneModal"
import Features from "./components/Features"
import Works from "./components/Works"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
      <main className="">
        <Navbar />
        <Hero />
        <Highlights />
        <IphoneModal />
        <Features />
        <Works />
        <Footer />
      </main>
    </>
  )
}

export default App
