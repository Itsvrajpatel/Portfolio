import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    //typescript,
    html,
    css,
    reactjs,
    //redux,
    tailwind,
    nodejs,
    mongodb,
    //git,
    figma,
    //docker,
    sam,
    aug,
    oas,
    GC,
    // joke,
    sambhu,
    Gamezy,
    threejs,
    
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
    
  ];

  export const navLink = [
    {
      ids: "resume",
      titles: "Resume",
    }
  ];
  
  const services = [
    {
      title: "Frontend Developer",
      icon: web,
    },
    {
      title: "React Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    /*{
      name: "TypeScript",
      icon: typescript,
    },*/
    {
      name: "React JS",
      icon: reactjs,
    },
    /*{
      name: "Redux Toolkit",
      icon: redux,
    },*/
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "figma",
      icon: figma,
    },
    /*{
      name: "git",
      icon: git,
    },
    {
      name: "docker",
      icon: docker,
    },*/
  ];
  
  const experiences = [
    {
      title: "Web Developer (Intern)",
      company_name: "Augmetic",
      icon: aug,
      iconBg: "#E6DEDD",
      date: "8 May, 2023 - 8 June, 2023",
      points: [
        "Designed and developed an engaging and interactive game as a part of a team project, using a combination of HTML, CSS, and JavaScript.",
        "Leveraged front-end technologies to create visually appealing and user-friendly game interfaces, ensuring an enjoyable gaming experience.",
        "Developed and fine-tuned the game's logic and mechanics, ensuring gameplay was engaging, challenging, and balanced.",
        "Collaborated effectively with team members, including designers and developers, to integrate game components seamlessly into the website.",
      ],
    },
    {
      title: "Web Developer (Intern)",
      company_name: "Shambhu pvt. Ltd",
      icon: sam,
      iconBg: "#383E56",
      date: "15 May, 2023 - 15 June, 2023",
      points: [
        "Created a professional, responsive landing page using HTML, CSS, Bootstrap, and SASS, ensuring compatibility across various devices and browsers.",
        "The landing page was optimized for user experience, utilizing UI/UX design best practices to boost engagement and conversion rates.",
        "Implemented a mobile-first approach to ensure the landing page looked and performed well on smartphones, tablets, and desktops, catering to the diverse preferences of users.",
        "Utilized Bootstrap framework components to streamline development, improve consistency, and save time while maintaining the flexibility to customize design elements.",
        "Successfully met project milestones and deadlines, demonstrating strong time management and organizational skills throughout the internship."
      ],
    },
    {
      title: "Web Developer (Intern)",
      company_name: "Oasis Infobyte",
      icon: oas,
      iconBg: "#E6DEDD",
      date: "8 May, 2024 - 8 June, 2024",
      points: [
        "Developed a responsive landing page, portfolio, and temperature converter using HTML, CSS, and JavaScript.",
        "Enhanced user engagement by 25% by implementing intuitive UI/UX designs and ensuring cross-browser compatibility.",
        "Collaborated with the design team to ensure consistent branding and user experience across all projects.",
      ],
    },
   
  ];
  
  // const testimonials = [
  //   {
  //     testimonial:
  //       "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
  //     name: "Sara Lee",
  //     designation: "CFO",
  //     company: "Acme Co",
  //     image: "https://randomuser.me/api/portraits/women/4.jpg",
  //   },
  //   {
  //     testimonial:
  //       "I've never met a web developer who truly cares about their clients' success like Rick does.",
  //     name: "Chris Brown",
  //     designation: "COO",
  //     company: "DEF Corp",
  //     image: "https://randomuser.me/api/portraits/men/5.jpg",
  //   },
  //   {
  //     testimonial:
  //       "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
  //     name: "Lisa Wang",
  //     designation: "CTO",
  //     company: "456 Enterprises",
  //     image: "https://randomuser.me/api/portraits/women/6.jpg",
  //   },
  // ];
  
  const projects = [
    {
      name: "GhostChat",
      description:
        "Introducing MERN Chat, a cutting-edge chat application built with the MERN (MongoDB, Express.js, React, Node.js) stack. This platform redefines communication with real-time messaging and a sleek, intuitive user interface.",
      tags: [
        {
          name: "MongoDB",
          color: "blue-text-gradient",
        },
        {
          name: "Express",
          color: "green-text-gradient",
        },
        {
          name: "React",
          color: "pink-text-gradient",
        },
        {
          name: "Nodejs",
          color: "red-text-gradient",
        },
      ],
      image: GC,
      source_code_link: "https://github.com/Itsvrajpatel/GhostChat",
    },
    {
      name: "Shambhu solutions",
      description:
        "Shambhu e-solutions is a visually appealing, user-friendly website using HTML, CSS, JavaScript, and Bootstraps, aiming to revolutionize online interactions and enhance user satisfaction.",
      tags: [
        {
          name: "HTML",
          color: "blue-text-gradient",
        },
        {
          name: "CSS",
          color: "green-text-gradient",
        },
        {
          name: "Javascript",
          color: "pink-text-gradient",
        },
       {
          name: "Bootstrap",
          color: "red-text-gradient",
        }
      ],
      image: sambhu,
      source_code_link: "https://github.com/Itsvrajpatel/e-solutions-website",
    },
    {
      name: "Gamezy",
      description:
        "Gamezy is a dynamic gaming website featuring five mini-games, offering enticing thumbnails, descriptions, shopping options, and gaming articles.",
      tags: [
        {
          name: "HTML",
          color: "blue-text-gradient",
        },
        {
          name: "CSS",
          color: "green-text-gradient",
        },
        {
          name: "JavaScript",
          color: "pink-text-gradient",
        },
      ],
      image: Gamezy,
      source_code_link: "https://github.com/Itsvrajpatel/Gamezy/",
    },
  ];
  
  export { services, technologies, experiences, projects };