"use client"
import { FC } from 'react'
import { MyStory } from '@/actions/get-my-story'
//libs
import { motion } from 'framer-motion';
//components
import MyStoryCard from '../MyStoryCard/MyStoryCard';

const MyStoryList: FC<{ cards: MyStory[] }> = ({ cards }) => {
  const variants1 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      }
    },
  };
  return (
    <>
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial="hidden"
          whileInView="visible"
          variants={variants1}
          viewport={{ once: true, amount: 0.8 }}
        >
          <MyStoryCard key={card.id} {...card} />
        </motion.div>
      ))}
    </>
  )
}

export default MyStoryList