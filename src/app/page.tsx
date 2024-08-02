// import styles from "./page.module.css";className={styles.main}

import RenderScene from "@/components/three/RenderScene/RenderScene";

export default function Home() {
  return (
    <>
      <main>
        <section className="grid" style={{}}>
          <RenderScene />
          {/* <h1>Vincent Wirwicki</h1>
          <h2>Front-end & creative developer</h2>
          <h3>Avalaible for work</h3> */}
          {/* <h4> React | Typescript | Webgl</h4> */}
          {/* <h4> let&aposs talk : </h4> */}
          {/* about ----------------------------------------- */}
          <span className="about-title">About </span>
          <p className="about-text">
            Hello, I am Vincent Wirwicki a front end and creative developer from
            Paris.
          </p>
          {/* about ----------------------------------------- */}
          {/* stack ----------------------------------------- */}
          <span className="stacks-title">Stacks </span>
          <p className="stacks-text">React - Typescript - Webgl - Html - Css</p>
          {/* stack ----------------------------------------- */}
          <span className="works-title">Works </span>
          <div className=" works-text">
            <a
              href="https://raymarching-r3f.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              3d with no model
            </a>
            <a
              href="https://creative-react-components.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sweet React Animation
            </a>
            <a
              href="https://particles-fbo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              On the nature of particles
            </a>
            <a
              href="https://particles-fbo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The rules of attraction
            </a>
          </div>
          <span className="contact-title">Contact </span>
          <div className=" contact-text">
            <a
              href="https://raymarching-r3f.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
            <a
              href="https://creative-react-components.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              myEmail@gmail.com
            </a>
          </div>
          {/* <h3> react / typescript / webgl</h3>  */}
        </section>
      </main>
    </>
  );
}
