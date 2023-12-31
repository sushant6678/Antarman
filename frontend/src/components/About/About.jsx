import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between flex-col  lg:flex-row gap-[50px] lg:gap-[130px] xl:gap-0 ">
          {/* ========= about img ======== */}
          <div className="relative z-10 w-3/4 lg:w-1/2  xl:w-[770px] order-2 lg:order-1">
            <img src={aboutImg} alt="about_img" />
            <div className=" w-[200px] md:w-[300px] absolute bottom-4 right-[-30%]  md:right-[-7%]  lg:right-[22%] z-20">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          {/* =========== about content ============ */}
          <div className=" w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">About Us</h2>
            <p className="text__para">
            In a world where mental health is gaining recognition as a crucial aspect of overall well-being, 
online platforms like Antarman have emerged as beacons of support and guidance. Antarman is a dedicated
 website that fosters a safe and inclusive space for individuals to explore, understand, and prioritize their mental health.

            </p>
            <h1 className="heading"> Our Aim </h1>
            <p className="text__para mt-[30px]">
               At its core, Antarman aims to empower individuals by providing resources, information, and a sense of community. 
               The website encompasses a wide range of topics related to mental health, including anxiety, depression, stress management,
               self-care, mindfulness, and more. It serves as a comprehensive hub, offering valuable insights, tips, and strategies to 
                help individuals navigate the complexities of their emotional well-being.
               One of the standout features of Antarman is its emphasis on personal connection. The website 
               integrates various interactive elements to encourage individuals to engage with each other, fostering a sense of
               belonging and understanding. 
            </p>
            <Link to="/">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
