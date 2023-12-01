//styles
import styles from "./styles.module.scss"
import global from "@/styles/global.module.scss"
//libs
import { FC } from "react"
import Link from "next/link"
import classNames from "classnames"
//types
import { News } from "@/actions/get-news"
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"

interface NewsCardProps extends News {
  learnMoreText: string
  lng: I18ComponentProps['lng']
}
const NewsCard: FC<NewsCardProps> = ({ title, slug, short_description, learnMoreText, lng }) => {
  return (
    <div className={styles.container}>
      <h5 className={classNames(global.smallTitle, styles.title)}>
        {short_description}
      </h5>
      <Link className={styles.link} href={`/${lng}/news/${slug}`}>
        {learnMoreText}
      </Link>
    </div>
  )
}

export default NewsCard