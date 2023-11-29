import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//components
import MyStoryCard from './MyStoryCard/MyStoryCard'
import VictoriesSlider from './ VictoriesSlider/ VictoriesSlider'
//images
import img1 from '../../../public/images/career/career1.png'
import img2 from '../../../public/images/career/career2.png'
import img3 from '../../../public/images/career/career3.png'
import img4 from '../../../public/images/career/career4.png'
import classNames from 'classnames'

const CARD = [
  {
    period: "2023",
    text: "GTC Race in Audi R8 GT4 LMS; TCR Europe; NLS 6H.",
    image: img1
  },
  {
    period: "2022",
    text: "FIA Motorsport Games with Team Ukraine in GT Cup.",
    image: img2
  },
  {
    period: "2022",
    text: "ADAC GT4 Germany; First time on the Nordschleife & First Endurance Race – 12H NLS.",
    image: img3
  },
  {
    period: "2021",
    text: "Italian GT Championship with Lamborghini Huracan GT3 Evo.",
    image: img4
  },
  {
    period: "2021",
    text: "First taste of GT racing series – International GT Open with Bentley Continental GT3.",
    image: img1
  },
  {
    period: "2020",
    text: " French F4 Championship; Test Programme F3 Regional.",
    image: img2
  },
  {
    period: "2008",
    text: "My first ever laps in go-karting followed by 2 years in rental karting.",
    image: img3
  },
  {
    period: "2008",
    text: "My first ever laps in go-karting followed by 2 years in rental karting.",
    image: img4
  },
]

const MyStory = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <h2 className={classNames(global.sectionTitle)}>
              My Story
            </h2>
            <h4 className={classNames(styles.blockTitle, global.subTitle)}>
              Career
            </h4>
          </div>
          <div className={styles.cardsBlock}>
            <div className={styles.leftCol}>
              {
                CARD.filter((card, i) => !(i % 2)).map((item, i) => (
                  <MyStoryCard key={i} {...item} />
                ))
              }
            </div>
            <div className={styles.rightCol}>
              {
                CARD.filter((card, i) => (i % 2)).map((item, i) => (
                  <MyStoryCard key={i} {...item} />
                ))
              }
            </div>
          </div>
          <h4 className={classNames(styles.blockTitle, global.subTitle)}>
            Victories
          </h4>
          <VictoriesSlider />
        </div>
      </div>
    </>
  )
}

export default MyStory