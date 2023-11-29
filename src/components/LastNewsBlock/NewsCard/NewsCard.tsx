import styles from "./styles.module.scss"
//libs
import { FC } from "react"
import Link from "next/link"

interface NewsCardProps {
  title: string
  slug: string
  id: number
}
const NewsCard: FC<NewsCardProps> = ({ title, slug }) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>
        {title}
      </h5>
      <Link className={styles.link} href={`/${slug}`}>
        Learn More
      </Link>
    </div>
  )
}

export default NewsCard