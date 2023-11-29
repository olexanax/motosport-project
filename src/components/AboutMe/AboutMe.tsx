import classNames from 'classnames'
//components
import AboutMeSlider from './AboutMeSlider/AboutMeSlider'
//styles
import global from '@/styles/global.module.scss'
import styles from './styles.module.scss'


const STAT_DATA = [
  {
    value: 42,
    title: 'Number of Wins ',
  },
  {
    value: 15,
    title: 'Years in Motorsport  ',
  },
  {
    value: 23,
    title: 'Raced on Circuits ',
  }
]

const AboutMe = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.divider}>
            <div className={styles.dividerFirstLine}></div>
            <div className={styles.dividerSecondLine}></div>
          </div>
          <div className={styles.infoBlock}>
            <h2 className={classNames(global.sectionTitle, styles.title)}>
              About Me
            </h2>
            <div className={styles.textBlock}>
              <div className={classNames(styles.leftCol, global.text2)}>
                <p>
                  My name is Ivan Peklin, I am a professional racing driver from Ukraine.
                  I have been involved in motorsports since 2008, and throughout my career, I’ve gained loads of experience in many different racing series, from go-karting to single-seaters and GT series.
                </p>
                <br />
                <div>
                  I’m the first Ukrainian ever who won:
                  <div className={styles.list}>
                    <p className={styles.listItem}>
                      An International GT3 Race.
                    </p>
                    <p className={styles.listItem}>
                      A race in a Formula Series.
                    </p>
                  </div>
                </div>
              </div>
              <ul className={classNames(styles.rightCol, global.text2)}>
                <li>
                  <span className={styles.boldtext}>
                    Date of Birth:
                  </span>
                  Date of Birth:
                </li>
                <li>
                  <span className={styles.boldtext}>
                    Place of Birth:
                  </span>
                  Kyiv, Ukraine
                </li>
                <li>
                  <span className={styles.boldtext}>
                    Currently living in:
                  </span>
                  Germany, Eifel
                </li>
                <li>
                  <span className={styles.boldtext}>
                    FIA Categorisation:
                  </span>
                  Silver Driver
                </li>
                <li>
                  <span className={styles.boldtext}>
                    Other:
                  </span>
                  Permit A Nordschleife
                </li>
                <li>
                  <span className={styles.boldtext}>
                    Height:
                  </span>
                  1.86m
                </li>
                <li>
                  <span className={styles.boldtext}>
                    Other interests:
                  </span>
                  Sim-racing, Cycling, Tennis.
                </li>
              </ul>
            </div>
            <p className={classNames(styles.text, global.text2)}>
              Explore my full racing career in the sections below.
            </p>
            <div className={styles.statBlock}>
              {
                STAT_DATA.map((item, i) => (
                  <div key={i} className={styles.statItem}>
                    <div className={styles.statValue}>
                      <span>
                        {item.value}
                      </span>
                    </div>
                    <div className={classNames(styles.statName, global.text2)}>
                      {item.title}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <AboutMeSlider />
    </>
  )
}

export default AboutMe