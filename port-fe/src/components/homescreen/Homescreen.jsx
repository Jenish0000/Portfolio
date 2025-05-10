import React from 'react'
import { useState, useRef } from 'react';
import '../quotebox/Quotebox'
import './homescreen.css'
import { Linkedin } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { Mail } from 'lucide-react';
import XIcon from '@mui/icons-material/X';
import { Copy } from 'lucide-react';
import { Send } from 'lucide-react';
import { Instagram } from 'lucide-react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import { useEffect } from "react";
import { Moon } from 'lucide-react';
import { Sun } from 'lucide-react';
import { Dribbble } from 'lucide-react';
import { MoveUpRight } from 'lucide-react';
import { BookOpenText } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { CircleArrowOutUpRight } from 'lucide-react';
import { X } from 'lucide-react';
import Quotebox from '../quotebox/Quotebox';
const services = [
  "Full-Stack Web Development (MERN)",
  "Landing Page & Portfolio Design",
  "Responsive Web App Development ",
  "API Integration & Backend Services",
  "Website Optimization (Speed & SEO)"
];

const slides = [
  {
    title: "MERN DEVELOPMENT",
    desc: "Developing fully fledged web application with the best tech stack that's out there.",
  },
  {
    title: "Responsive Layout",
    desc: "Responsive layouts that feel smooth, always improves user experience.",
  },
  {
    title: "Database Integration",
    desc: "MERN stack allows me to integrate server's and database in the projects with ease and high security.",
  },
  {
    title: "API's Integration",
    desc: "API plays a pivotal role in a web application. Quest for you: There is an API integrated in this project find one and mail me💀",
  },
];  

const slideImages = [
  '/assets/images/coding.jpg',
  '/assets/images/horse.jpeg',
  '/assets/images/fishing.jpg',
];

const Homescreen = () => {


  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      let validQuote = null;

      // Keep fetching until a quote with <= 10 words is found
      while (!validQuote) {
        const res = await fetch('/quote');
        if (!res.ok) throw new Error("Network response was not ok");

        const text = await res.text();
        const data = JSON.parse(text);

        if (data.content.split(' ').length <= 10) {
          validQuote = data;
        }
      }

      setQuote(validQuote.content);
      setAuthor(validQuote.author);
    } catch (error) {
      console.error("Fetch error:", error);
      setQuote("Failed to fetch quote.");
      setAuthor("");
    }
  };












  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [key, setKey] = useState(0); // used to force animation restart

const [isOpen, setIsOpen] = useState(false);
const [shake, setShake] = useState(false);
const [email, setEmail] = useState("");
const [openProject, setOpenProject] = useState(null); 

const setDarkModeWholePage = () => {
  document.querySelector("body").setAttribute('dark-themes', 'darkPage');
  document.querySelector("body").removeAttribute('light-themes', 'lightPage');
};


useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
    setKey((prevKey) => prevKey + 1); // change key to reset animation
  }, 3000);

  return () => clearInterval(interval);
}, []);


const setLightModeWholePage = () => {
  document.querySelector("body").removeAttribute('dark-themes', 'darkPage');
  document.querySelector("body").setAttribute('light-themes', 'lightPage');
};

const toggleThemeWholePage = (e) => {
  if (e.target.checked) setDarkModeWholePage();
  else setLightModeWholePage();
};


const handleSlide = (newIndex, dir) => {
  if (isSliding) return; // prevent spamming
  setIsSliding(true);
  setDirection(dir);
  setTimeout(() => {
    setCurrentIndex(newIndex);
    setIsSliding(false);
  }, 300); // match CSS duration
};

const nextImage = () => {
  const next = (currentIndex + 1) % slideImages.length;
  handleSlide(next, 'right');
};

const prevImage = () => {
  const prev = (currentIndex - 1 + slideImages.length) % slideImages.length;
  handleSlide(prev, 'left');
};




useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'; 
  } else {
    document.body.style.overflow = ''; 
  }
  return () => {
    document.body.style.overflow = '';
  };
}, [isOpen]);




const [state, handleSubmit] = useForm("xgvkavrd");

const customSubmit = (e) => {
  e.preventDefault();
  if (!email) {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    return;
  }
  handleSubmit(e);
};

if (state.succeeded) {
  return (
    <div
      className="box subscribeContainer"
      style={{ gridColumn: "1 / span 3", gridRow: "3" }}
    >
      <div className="headConnect">
        <h1 className="boxEightHead"> You're subscribed! 🎉</h1>
      </div>
    </div>
  );
}


const handleCloseModal = () => {
  setShake(true);
  setTimeout(() => {
    setShake(false);
    setIsOpen(false);
  }, 600);
};

const [actIndex, setActIndex] = useState(0);
const startX = useRef(null);
const isSwiping = useRef(false);

const handleTouchStart = (e) => {
  startX.current = e.touches[0].clientX;
  isSwiping.current = true;
};

const handleTouchEnd = (e) => {
  if (!isSwiping.current) return;
  const endX = e.changedTouches[0].clientX;
  const diffX = startX.current - endX;

  if (diffX > 50 && actIndex < slides.length - 1) {
    setActIndex((prev) => prev + 1);
  } else if (diffX < -50 && actIndex > 0) {
    setActIndex((prev) => prev - 1);
  }

  isSwiping.current = false;
};   


  return (
    <div className={`parent ${shake ? 'shakeWhole' : ''}`}>
<div
  className="grid-container"
  style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}
>
<div className="box firstBox" style={{ gridColumn: "1 / span 2", gridRow: "1 / span 1" }}>

<h1 className='introductionText'>Hi, I'm Jenish -</h1>
<p className='roleText'>
    MERN stack developer and
    <span className='underline'>actively</span> working as a Freelancer</p>
</div>  

   <div className="box imageBox" style={{ gridColumn: "3", gridRow: "1", overflow: "hidden", position: 'relative' }}>
          <div className="overlay">
            <button
              className="visitLink"
              onClick={() => window.open('https://bkvm.space', '_blank')}
            >
              Visit site
              <MoveUpRight size={18} style={{ marginLeft: '8px' }} />
            </button>

            <button
              className="readStory"
              onClick={() => setOpenProject('projectOne')}
            >
              Read the story
              <BookOpenText style={{ marginLeft: '8px' }} />
            </button>
          </div>
     
          <img
            src="/assets/images/projectOne.png"
            className="projectOne"
            alt="Project"
          />
        </div>

        {openProject === 'projectOne' && (
  <div className="overlayTwo" onClick={() => setOpenProject(null)}>
    <div className="modalContent" onClick={(e) => e.stopPropagation()}>



 <div className="spacerArea">

 <div className="topButton">
    <button onClick={() => setOpenProject(null)} className='closeOverlay'>
        <X className='closeIconForOverlay'/>
      </button>
</div>


    <div className="appInfoHeader">
     <h1 className='appinfoHead'>B. K. V. M.</h1>
      <h4  className='application'>MERN Application</h4>
    </div>
     <div className="dividerWrapper">
      <div className="leftContentOfProduct">
        <div className="a">
        <h3 className='leftContentTextHeader'>COMPANY</h3>
        <p className='leftContentTextDisc'>B.K.V.M</p>
        </div>
        <div className="b">
        <h3 className='leftContentTextHeader'>MY ROLE</h3>
        <p className='leftContentTextDisc'>MERN Stack Developer</p>
        </div>
        <div className="c">
        <h3 className='leftContentTextHeader'>TOOLS</h3>
        <p className='leftContentTextDisc'>Figma</p>
        <p className='leftContentTextDisc'>Vs Code</p>
        </div>
        <div className="d">
        <h3 className='leftContentTextHeader'>TECH STACK</h3>
        <p className='leftContentTextDisc'>Mongo DB</p>
        <p className='leftContentTextDisc'>Express Js</p>
        <p className='leftContentTextDisc'>React Js</p>
        <p className='leftContentTextDisc'>Node Js</p>
        </div>
        <div className="e">
          <div className="f">
            <h3 className='leftContentTextHeader'>TIMELINE</h3>
            <p className='leftContentTextDisc'>2024-2025</p>
          </div>
        </div>
      </div>
      <div className="rightContentOfProduct">
           <div className="rightContentHeader">
            <h3 className='rightContentHeaderHead'>Description</h3>
            <p className='rightContentDisc'>
            A creative web presence for Institution.
            </p>
           </div>
           <div className="rightContentContext">
           <h3 className='rightContentHeaderHead'>Context</h3>
          <p className="rightContentDisc">
          A web application designed to inhance the web presence of Bal Kalyan Vidya Mandir
          effectively. This web appication offers a range of features, 
           including online registration form, interactive user interface, 
           and lays out crucial information of the Institution. Build using faster and efficient 
           technologies which enable fast loading and rendering of components.
          </p>
           </div>
           <div className="rightContentBtnWrapper">
            <button className="checkOut"
            onClick={() => window.open('https://bkvm.space', '_blank')}
            >
              Check the app
              <ArrowOutwardIcon style={{
                fontSize:"22px"
              }}/>
            </button>
           </div>
      </div>
     </div>
     <div className="parentForimageWrapForRightContent">
     <div className="imageWrapForRightContent">
      <img   src="/assets/images/bigImage.png" className='projectOneContentImage'/>
     </div>
     </div> 
<div className="productDetailsContainer">
       <div className="processOfDevelopment">
      <div className="processOfDevelopmentHead">
        <h2 className='processOfDevelopmentHeader'>
          Process
        </h2>
      </div>
      <div className="processOfDevelopmentDisc">
      <div className="discCon">
      <p className='processOfDevelopmentDiscription'>
        We've adopted a user-centric approach, iterative design, and rigorous testing, 
        ensuring that the app met the target audience's needs and preferences effectively.
        </p>
      </div>
        <div className="listOfdisc">
<p className='listItem'>
1) We did through surveys and research on other institutions web presence, to make sure we build something creative.
</p>
<p className='listItem'>
2) The team created UI and Backend system based on the needs of the client, refining the designs with user feedback to improve the overall user experience.
</p>
<p className='listItem'>
3) Testing the app with users and used their feedback to improve usability and design.
</p>
         </div>
      </div>
     </div>
     <div className="processOfDevelopmentForSolution">
      <div className="processOfDevelopmentHead">
        <h2 className='processOfDevelopmentHeaderSolution'>
          Solution
        </h2>
      </div>
      <div className="processOfDevelopmentDiscSolution">
        <p className='solutionforProcessofDevelopment'>
       This application is solely deployed in a sense that it gives out 
       crucial information about the institution in a creative way and 
       iradicate the need to be present in real time to do the registration.
       User-Friendly user interface along with interactive design is what all visitors want in thier online presence and it's what we went for.
        </p>
      </div>
      </div>
      <div className="processOfDevelopmentForSolution">
      <div className="processOfDevelopmentHead">
        <h2 className='processOfDevelopmentHeaderSolution'>
          Key Insights
        </h2>
      </div>
      <div className="processOfDevelopmentDiscSolution">
        <p className='solutionforProcessofDevelopment'>
        The end product was really out of the box and was user-friendly.
        Developed in a sense that it will still stand out in 
        5-7 years after being developed and will always be a great face 
        for the institution.
        </p>
      </div>
      </div>
</div>
 </div>
    </div>
  </div>
)}





  <div className="box projectTwoBox" style={{ gridColumn: "4", gridRow: "1" }}>
  <div className="overlayforProjectTwo">
            <button
              className="visitLink"
              onClick={() => window.open('https://orion-space.vercel.app/', '_blank')}
            > 
              Visit site
              <MoveUpRight size={18} style={{ marginLeft: '8px' }} />
            </button>

            <button
              className="readStory"
              onClick={() => setOpenProject('projectTwo')}
            >
              Read the story
              <BookOpenText style={{ marginLeft: '8px' }} />
            </button>
   </div>
    
  <img src="/assets/images/projectTwo.png"
 className="projectTwo" />
  </div>
 
{openProject === 'projectTwo' && (
    <div className="overlayTwo" onClick={() => setOpenProject(null)}>
    <div className="modalContent" onClick={(e) => e.stopPropagation()}>



 <div className="spacerArea">

 <div className="topButton">
    <button onClick={() => setOpenProject(null)} className='closeOverlay'>
        <X className='closeIconForOverlay'/>
      </button>
    </div>
    <div className="appInfoHeader">
     <h1 className='appinfoHead'>ORION SPACE</h1>
      <h4  className='application'>MERN Application</h4>
    </div>
     <div className="dividerWrapper">
      <div className="leftContentOfProduct">
        <div className="a">
        <h3 className='leftContentTextHeader'>COMPANY</h3>
        <p className='leftContentTextDisc'>ORION SPACE</p>
        </div>
        <div className="b">
        <h3 className='leftContentTextHeader'>MY ROLE</h3>
        <p className='leftContentTextDisc'>MERN Stack Developer</p>
        </div>
        <div className="c">
        <h3 className='leftContentTextHeader'>TOOLS</h3>
        <p className='leftContentTextDisc'>Figma</p>
        <p className='leftContentTextDisc'>Vs Code</p>
        </div>
        <div className="d">
        <h3 className='leftContentTextHeader'>TECH STACK</h3>
        <p className='leftContentTextDisc'>Mongo DB</p>
        <p className='leftContentTextDisc'>Express Js</p>
        <p className='leftContentTextDisc'>React Js</p>
        <p className='leftContentTextDisc'>Node Js</p>
        </div>
        <div className="e">
          <div className="f">
            <h3 className='leftContentTextHeader'>TIMELINE</h3>
            <p className='leftContentTextDisc'>2024-2025</p>
          </div>
        </div>
      </div>
      <div className="rightContentOfProduct">
           <div className="rightContentHeader">
            <h3 className='rightContentHeaderHead'>Description</h3>
            <p className='rightContentDisc'>
            A simple yet thoughtful web presence for a small startup based on Nepal.
            </p>
           </div>
           <div className="rightContentContext">
           <h3 className='rightContentHeaderHead'>Context</h3>
          <p className="rightContentDisc">
          ORION Space was established in 2017 with the aim of building hands-on practice 
          on space technology for young engineers and students in Nepal.
          This web application gives the visitors information about the company 
          along with the integrared 
          redirection to buy the product developed by this startup.
          </p>
           </div>
           <div className="rightContentBtnWrapper">
            <button className="checkOut"
            onClick={() => window.open('https://orion-space.vercel.app/', '_blank')}
            >
              Check the app
              <ArrowOutwardIcon style={{
                fontSize:"22px"
              }}/>
            </button>
           </div>
      </div>
     </div>
     <div className="parentForimageWrapForRightContent">
     <div className="imageWrapForRightContentProjectTwo">
      <img src="/assets/images/projectTwoInfoImage.png" className='projectOneContentImage'/>
      <img src="/assets/images/projectTwoInfoImageTwo.png" className='projectOneContentImage'/>
     </div>
     </div> 
     <div className="processOfDevelopment">
      <div className="processOfDevelopmentHead">
        <h2 className='processOfDevelopmentHeader'>
          Process
        </h2>
      </div>
      <div className="processOfDevelopmentDisc">
      <div className="discCon">
      <p className='processOfDevelopmentDiscription'>
      We firstly created the UI with a thought of making everything interactive and smooth,
      Integration of international payment system wasn't possible, because Nepal doesn't offer such payment menthod, thus we created a online shop and redirected users to buy the product from there.
        </p>
      </div>
        <div className="listOfdisc">
<p className='listItem'>
1) We developed UI so as to make the web presence of this startup feel like a competition.
</p>
<p className='listItem'>
2) We did extensive research on users needs and how they interact on web applications and we created animations and a feel through experience.
</p>
<p className='listItem'>
3) Testing the app with users and used their feedback to improve usability and design.
</p>
         </div>
      </div>
     </div>
     <div className="processOfDevelopmentForSolution">
      <div className="processOfDevelopmentHead">
        <h2 className='processOfDevelopmentHeaderSolution'>
          Solution
        </h2>
      </div>
      <div className="processOfDevelopmentDiscSolution">
        <p className='solutionforProcessofDevelopment'>
    We developed and deployed this and is still going on some major changes and functionality, we think this
    product stands out because it was developed with inspiration taken from the best sites that are out their as this startup future competetors.
        </p>
      </div>
      </div>
      <div className="processOfDevelopmentForSolution">
      <div className="processOfDevelopmentHead">
        <h2 className='processOfDevelopmentHeaderSolution'>
          Key Insights
        </h2>
      </div>
      <div className="processOfDevelopmentDiscSolution">
        <p className='solutionforProcessofDevelopment'>
    After months of coding and going through rigorous testing the end product met the clients needs and demands making us feel proud on ourselves. 
    We had already build the UI and while coding from scratch we were chasing a end product that turned out exactly like we as developers imagined.
        </p>
      </div>
      </div>
 </div>
    </div>
  </div>
)}
<div className="flexed">
  
<div className="box-container">
    <div className="box twitterBox">
     <XIcon className='connectIcon' style={{fontSize:"25px"}}/>
    </div>
    <div className="box instaBox">
    <Instagram className='connectIcon' style={{fontSize:"30px"}}/>
    </div>
    <div className="box twitterBox">
    <Linkedin className='connectIcon' style={{fontSize:"30px"}}/>
    </div>
    <div className="box linkBox">
      <Mail className='connectIcon' style={{fontSize:"30px"}}/>
    </div>
    <div className="box instaBox">
<Dribbble className='connectIcon' style={{fontSize:"30px"}}/>
    </div>
    <div className="box sendBox">
    <Send className='connectIcon' style={{fontSize:"30px"}}/>
    </div>
    
  </div>
</div>

  <div className="box imageHolder" style={{ gridColumn: "1", gridRow: "2" }}>
  <img src="/assets/images/myImage.jpg"
 className="myImage" />
  </div>
  
  <div className="box aboutSection" style={{ gridColumn: "2 / span 2", gridRow: "2" }}>
  <div className="leftAbout">
    <h3 className='aboutHeading'>ABOUT</h3>
    <p className="aboutDesc">Stranger who is improving and adapting</p>

    <div className="wrapIcon"  
    onClick={() => setOpenProject('projectThree')}
    >
      <ArrowOutwardIcon 
        className='arrowIcon' 
        style={{
          fontSize: "25px",
          transition: "transform 0.3s ease",
          padding:"5px",
        }} 
      />
    </div>
  </div>
</div>
{openProject === 'projectThree' && (
  <div className="overlayTwoForProjectThree" onClick={() => setOpenProject(null)}>
    <div className="modalContentForProjectThree" onClick={(e) => e.stopPropagation()}>
    <div className="spacerAreaForProjectThree">


    <div className="topButton">
  <div className="tWrapper">
  <button onClick={() => setOpenProject(null)} className='closeOverlay'>
        <X className='closeIconForOverlay'/>
      </button>
  </div>
      <div className="starterAboutMe">
                <p className='factsAboutMe'>
                  An 18 year old who aspires to be a millionare before 24.
                  A hustler who has faced rejections for the better future.
                </p>
      </div> 
    </div>

<div className="contentOfAboutMe">
<div className="leftAboutMeWrapper">
   <div className="aboutMeContainer">
            <div className="aboutMeContent">
   
       <div className="leftABoutMe">
              <div className="leftABoutMeTop">

              <div className="aboutmeHead">
                <h1 className="aboutMeHeader">What I'm about?</h1>
              </div>
              <div className="aboutMesubHead">
                <p className='aboutMesubHeading'>
                  My story
                </p>
              </div>
              <div className="aboutMeInfo">
                <p className='aboutMeDisc'>
                  I was born and raised in Biratnagar, Nepal. 
                  Ever since I was a child, i have had passion for computers and it's systems, 
                  the always wanting to develop something and full of creativeness 
                  was always full in me,
                  that's why i picked a stack and chose to master it, 
                  I am really fond of MERN stack and developing 
                  new pprojects along with deploying them to make them stand out.
                </p>
              </div>
              <div className="currentTimeSubhead">
                <p className="subHeadCurrent">
                  What i do now
                </p>
              </div>
              <div className="currentTime">
                <p className="whatQuestion">
                  Today I'm a freelancer juggling through 2-3 projects in my hand, with a deadine between 2-4 months, never been this proud of myself.
                </p>
              </div>
              </div>
              <div className="leftAboutMeBottom">
                <div className="leftAboutMeBottomHead">
                  <p className='leftAboutMeHeader'>
                     EXPERIENCE
                  </p>
                </div>
                <div className="leftAboutMeTimelapse">
              <div className="leftABoutMePostFirst">
              <h2 className='postOfMe'>
                  Freelancer
                  </h2>
                  <p className="postOfMeSubHead">
                    Current
                  </p>
              </div>
              <div className="leftAboutMePostSecond">
              <h2 className='postOfMe'>
                  Developed <CircleArrowOutUpRight
                    onClick={() => window.open('https://orion-space.vercel.app/', '_blank')}
                  className='redirectBtn' size={20} style={{
                    cursor:"pointer"
                  }}/>
                  </h2>
                  <p className="postOfMeSubHead">
                   2024-2025
                  </p>
              </div>
              <div className="leftAboutMePostThird">
              <h2 className='postOfMe'>
                  Developed <CircleArrowOutUpRight
                    onClick={() => window.open('https://bkvm.space', '_blank')}
                  className='redirectBtn' size={20} style={{
                    cursor:"pointer"
                  }}/>
                  </h2>
                  <p className="postOfMeSubHead">
                   2023-2024
                  </p>
              </div>
        
                </div>
              </div>
       </div>
            </div>
    </div>
   </div>

  <div className="rightAboutmeWrapper">
  <div
      className="carouselContainer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="carouselInner"
        style={{ transform: `translateX(-${actIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carouselItem" key={index}>
            <h3 className='dataCarouselTitle'>{slide.title}</h3>
            <p className='dataCarouselParagraph'>{slide.desc}</p>
          </div>
        ))}
      </div>

      <div className="paginationDots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${actIndex === index ? 'active' : ''}`}
            onClick={() => setActIndex(index)}
          />
        ))}
      </div>
    </div>
  
     <div className="rightAboutMeStacks">
    <div className="box stacks" style={{ gridColumn: "4", gridRow: "3" }}>
  <div className="stacksheadWrapper">
    <h2 className="stackHeader">Stack I Use</h2>
  </div>
  <div className="carouselWrapper">
    <div className="carouselTrack">
  
      {[...Array(2)].map((_, i) => (
        <React.Fragment key={i}>
          <div className="wrap">
          <img src="/assets/images/stackOne.png" className="stackImage" />
          </div>
   <div className="wrap">
   <img src="/assets/images/stackTwo.png" className="stackImage" />
   </div>
       <div className="wrap">
       <img src="/assets/images/stackThree.png" className="stackImage" />
       </div>
         <div className="wrap">
         <img src="/assets/images/stackFour.png" className="stackImage" />
         </div>
          <div className="wrap">
          <img src="/assets/images/stackFive.png" className="stackImage" />
          </div>
          <div className="wrap">
          <img src="/assets/images/stackSix.png" className="stackImage" />
          </div>
          <div className="wrap">
          <img src="/assets/images/stackSeven.png" className="stackImage" />
          </div>
          <div className="wrap">
          <img src="/assets/images/stackEight.png" className="stackImage" />
          </div>
          <div className="wrap">
          <img src="/assets/images/stackNine.png" className="stackImage" />
          </div>
          <div className="wrap">

          <img src="/assets/images/stackTen.png" className="stackImage" />
          </div>
     
         
          
          

        </React.Fragment>
      ))}
    </div>
  </div>
</div>
    </div>
    <div className="slider-wrapper">
      <div className="slide-stage">
        <img
          key={currentIndex}
          src={slideImages[currentIndex]}
          alt="current"
          className={`slide-image ${isSliding ? `exit-${direction}` : ''}`}
        />
        {isSliding && (
          <img
            src={
              direction === 'right'
                ? slideImages[(currentIndex + 1) % slideImages.length]
                : slideImages[
                    (currentIndex - 1 + slideImages.length) % slideImages.length
                  ]
            }
            alt="next"
            className={`slide-image enter-${direction}`}
          />
        )}
      </div>

      <button className="nav-arrow left-arrow" onClick={prevImage}>
       <ChevronLeft/>
      </button>
      <button className="nav-arrow right-arrow" onClick={nextImage}>
      <ChevronRight/>
      </button>
    </div>
    

<div className="lastContentOfRight">
  <div className="lastContent">
    <h3 className='copyMailHead'>Have a project in mind?</h3>
    <div className="copyMailWrapper">
    <p className='copyEmail'>Copy email 
    <Copy /></p>
    </div>
  </div>
</div> 
    </div>
</div>
    </div>
   
    </div>
  </div>
)}








<div className="box contactBox" style={{ gridColumn: "4", gridRow: "2" }}>
      <div className="hobbyHeadWrap">
        <h4 className="contactHead">
          SERVICES <FormatItalicIcon /> OFFER
        </h4>
      </div>

      <div className="carouselBox">
        <p key={key} className="carouselText slideFromRight">
          <span className="numberWrap">{activeIndex + 1}</span> {services[activeIndex]}
        </p>
      </div>
    </div>



  <div className='dividedBox'
  style={{
    gridColumn: "5",
    gridRow: "2",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",

  }}
>
  <div className='box modesSwitch'>
  <div className="daynightModeContainer">
      
      <div className="modesButtonContainerContact">
             <input className='modeInputContact' type="checkbox" id='darkmode-toggleWholepage' 
              onChange={toggleThemeWholePage}/>
             <label className='labelContact' htmlFor="darkmode-toggleWholepage">
             <Moon size={32} />
             <Sun size={32} color='#000'/>
             </label>
          </div>
          
               </div>
  </div>
  <div className='box bottomPart'>
   <h4 className='bottompartHead'>Have a project in mind?</h4>
   <button className='letsconnectBtn'
    onClick={() => window.location.href = 'mailto:jenish.karki75@gmail.com'}
   >Let's get connected</button>
  </div>
</div>

  <div className="box subscribeContainer" style={{ gridColumn: "1 / span 3", gridRow: "3" }}>
  <div className="headConnect">
  <h1 className='boxEightHead'>Get design tips & guides straight to your inbox for free!</h1>
  </div>
  <div className="inputContainer">
  <form onSubmit={customSubmit} className="inputContent">
          <input
            id="email"
            name="email"
            type="email"
            className={`emailInput ${shake ? "shake" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <button className="sendBtn" type="submit" disabled={state.submitting}>
            Subscribe
          </button>
        </form>
  </div>
  </div>

  <div className="box stacks" style={{ gridColumn: "4", gridRow: "3" }}>
  <div className="stacksheadWrapper">
    <h2 className="stackHeader">Stack I Use</h2>
  </div>
  <div className="carouselWrapper">
    <div className="carouselTrack">
  
      {[...Array(2)].map((_, i) => (
        <React.Fragment key={i}>
          <div className="wrap">
          <img src="/assets/images/stackOne.png" className="stackImage" />
          </div>
   <div className="wrap">
   <img src="/assets/images/stackTwo.png" className="stackImage" />
   </div>
       <div className="wrap">
       <img src="/assets/images/stackThree.png" className="stackImage" />
       </div>
         <div className="wrap">
         <img src="/assets/images/stackFour.png" className="stackImage" />
         </div>
          <div className="wrap">
          <img src="/assets/images/stackFive.png" className="stackImage" />
          </div>
          <div className="wrap">
          <img src="/assets/images/stackSix.png" className="stackImage" />
          </div>
          <div className="wrap">
          <img src="/assets/images/stackSeven.png" className="stackImage" />
          </div>
          <div className="wrap">
          <img src="/assets/images/stackEight.png" className="stackImage" />
          </div>
          <div className="wrap">
          <img src="/assets/images/stackNine.png" className="stackImage" />
          </div>
          <div className="wrap">

          <img src="/assets/images/stackTen.png" className="stackImage" />
          </div>
     
         
          
          

        </React.Fragment>
      ))}
    </div>
  </div>
</div>

  <div className="box lastArt" style={{ gridColumn: "5", gridRow: "3" }}>
  <Quotebox/>
  </div>
</div>

</div>




  )
}

export default Homescreen

