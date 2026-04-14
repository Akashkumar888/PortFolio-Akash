import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import { projectsData } from "../lib/utils";
import DSA from "../components/DSA";
import Contact from "../components/Contact";

const Home = () => (
  <>
    <Hero />
    <About />
    <Skills />
    <Projects projects={projectsData} />
    <DSA />
    <Contact />
  </>
);

export default Home;
