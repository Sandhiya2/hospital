import { home } from "../data/dummydata"
import Typewriter from "typewriter-effect"

export const Hero = () => {
  return (
    <>
      <section className='hero'>
        {home.map((val, i) => (
          <div className='heroContent'>
            <h3 className='fontSize' data-aos='fade-right'>
              {val.text}
            </h3>
            <h1>
              <Typewriter
                options={{
                  strings: [`${val.name}`],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
          </div>
        ))}
        
      </section>
    </>
  )
}
