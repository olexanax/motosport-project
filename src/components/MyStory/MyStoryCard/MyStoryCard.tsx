import { FC } from 'react'
import { StaticImageData } from 'next/image'
//styles
import styles from './styles.module.scss'
import global from '@/styles/global.module.scss'
//components
import Image from 'next/image'
import classNames from 'classnames'

interface Props {
  image: string | StaticImageData,
  period: string,
  text: string

}

const MyStoryCard: FC<Props> = ({ image, text, period }) => {
  return (
    <div className={styles.card}>
      <div className={styles.textBlock}>
        <h6 className={classNames(styles.title, global.text1)}>
          {period}
        </h6>
        <p className={classNames(styles.text, global.text2)}>
          {text}
        </p>
      </div>
      <Image width={412} height={333} src={image} alt="image" className={styles.image} />
    </div>
  )
}

export default MyStoryCard