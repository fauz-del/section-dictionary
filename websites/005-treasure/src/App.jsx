import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import Manifesto from "./components/sections/Manifesto";
import FeaturedProduct from "./components/sections/FeaturedProduct";
import Collection from "./components/sections/Collection";
import ScentNotes from "./components/sections/ScentNotes";
import Craftsmanship from "./components/sections/Craftsmanship";
import LifestyleGallery from "./components/sections/LifestyleGallery";
import Newsletter from "./components/sections/Newsletter";

function App() {
  return (
    <div className="font-body text-plum">
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <FeaturedProduct />
        <Collection />
        <ScentNotes />
        <Craftsmanship />
        <LifestyleGallery />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;