import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'

const ServiceCard = ({ index, title, icon}) => {
  return(
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div variants={fadeIn("right", "spring", 0.5 * index, 0.75)} className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
        <div options={{
          max: 45,
          scale: 1,
          speed: 450,
        }} className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} className='w-18 h-18 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>

    </Tilt>
  )
}
const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p variants={fadeIn("", "", 0.1, 1)} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
      As a web developer with strong editing skills, I
      have a unique combination of technical and creative
      abilities. I am specialize in designing and developing the
      user-facing components of websites, using HTML, CSS,
      and JavaScript as well as backend using technologies like MERN stck to create visually appealing and intuitive
      interfaces. Additionally, my editing skills allow me to
      craft compelling and engaging content that resonates
      with my audience. I understand the importance of user
      experience and use my skills to create websites that are
      not only visually stunning but also functional and easy to
      use. My proficiency in frontend development and editing
      make me a valuable asset to any team looking to create
      high-quality websites and content.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (<ServiceCard key={service.title} index={index} {...service}/>))}

      </div>
    </>
  )
}

export default SectionWrapper(About, "about")