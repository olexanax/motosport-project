//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//libs
import { FC } from "react"
import Link from "next/link"
import classNames from "classnames"
//types
import { News } from "@/actions/get-news"


interface NewsCardProps extends News {

}
const NewsCard: FC<NewsCardProps> = ({ title, slug, short_description }) => {
  return (
    <div className={styles.container}>
      <h5 className={classNames(global.smallTitle, styles.title)}>
        {short_description}
      </h5>
      <Link className={styles.link} href={`/news/${slug}`}>
        Learn More
      </Link>
    </div>
  )
}

export default NewsCard