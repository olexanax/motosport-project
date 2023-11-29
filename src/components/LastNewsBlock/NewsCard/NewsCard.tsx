//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//libs
import { FC } from "react"
import Link from "next/link"
import classNames from "classnames"

interface NewsCardProps {
  title: string
  slug: string
  id: number
}
const NewsCard: FC<NewsCardProps> = ({ title, slug }) => {
  return (
    <div className={styles.container}>
      <h5 className={classNames(global.smallTitle, styles.title)}>
        {title}
      </h5>
      <Link className={styles.link} href={`/news/${slug}`}>
        Learn More
      </Link>
    </div>
  )
}

export default NewsCard