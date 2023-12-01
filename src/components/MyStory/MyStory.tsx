import styles from "./styles.module.scss";
import global from "@/styles/global.module.scss";
//components
import MyStoryCard from "./MyStoryCard/MyStoryCard";
import VictoriesSlider from "./ VictoriesSlider/ VictoriesSlider";
import classNames from "classnames";
import { getMyStory } from "@/actions/get-my-story";
import { getVictories } from "@/actions/get-victories";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n";



const MyStory = async ({ lng }: I18ComponentProps) => {
  const stories = await getMyStory();
  const victories = await getVictories();
  const { t } = await useTranslation(lng, "translation");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <h2 className={classNames(global.sectionTitle)}>
              {t('heading_tags.h2__myStoryTitle')}
            </h2>
            <h4 className={classNames(styles.blockTitle, global.subTitle)}>
              {t('heading_tags.h4__myStorySubTitle1')}
            </h4>
          </div>
          {stories && !!stories.length && (
            <div className={styles.cardsBlock}>
              <div className={styles.leftCol}>
                {/* {stories
                  .filter((story) => !(story.order % 2))
                  .map((story) => (
                    <MyStoryCard key={story.id} {...story} />
                  ))} */}
                {stories
                  .filter((_, i) => !(i % 2))
                  .map((story) => (
                    <MyStoryCard key={story.id} {...story} />
                  ))}
              </div>
              <div className={styles.rightCol}>
                {stories
                  .filter((_, i) => i % 2)
                  .map((story) => (
                    <MyStoryCard key={story.id} {...story} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <VictoriesSlider {...{ lng }} victories={victories} />
    </>
  );
};

export default MyStory;
