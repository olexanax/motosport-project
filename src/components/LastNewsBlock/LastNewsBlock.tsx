import styles from "./styles.module.scss"
//compoennts
import NewsCard from "./NewsCard/NewsCard"
import classNames from "classnames"
import { getNews } from "@/actions/get-news";


const NEWS = [
  {
    title: "The National Anthem of Ukraine was played for the first time at the GTC Championship!",
    id: 1,
    slug: "slug1"
  },
  {
    title: "The National Anthem of Ukraine was played for the first time at the GTC Championship!",
    id: 2,
    slug: "slug2"
  },
  {
    title: "The National Anthem of Ukraine was played for the first time at the GTC Championship!",
    id: 3,
    slug: "slug3"
  }
]

const LastNewsBlock = async () => {
  const news = await getNews();
  return (
    <>
      <div className={classNames(styles.container, styles.desctop)}>
        {
          news && news.map((news, i) => <NewsCard {...news} />)
        }
      </div>
      <div className={classNames(styles.container, styles.mobile)}>
        {
          news && news.slice(0, 2).map((news, i) => <NewsCard {...news} />)
        }
      </div>
    </>
  )
}

export default LastNewsBlock