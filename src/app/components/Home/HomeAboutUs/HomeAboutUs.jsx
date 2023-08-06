

export default function HomeAboutUs(){
    return (
        <>
                <section id="about" className="about py-10">
    <div className="container mx-auto sm:px-4" id="section_about" data-aos="fade-up" data-aos-duration="1000" >

      <div className="section-title">
        <h2 className="text-3xl text-blue-800">About Us</h2>
      </div>
      <div className="flex flex-wrap  content justify-center mb-5 ">
        <div className="w-full md:w-2/3 pr-4 pl-4 lg:w-3/5 pr-4 pl-4">
          <p className="text-center  fw-bolder">
            Our mission is to create a safer cyber world by making cybersecurity training fun and accessible to everyone. No boundaries, no limitations. Everyone can join and start learning and practicing cybersecurity, from theory to action.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap my-5">
        <div className="xl:w-1/3 pr-4 pl-4 md:w-1/3 pr-4 pl-4 flex items-stretch"  >
          <div className="icon-box">
            
            <h3 className="text-center text-blue-800 text-2xl mb-4 font-bold" >Community</h3>
            <p className="text-center">{`Make Cyber Range the world's largest, most empowering, and inclusive hacking community.`}</p>
          </div>
        </div>

        <div className="xl:w-1/3 pr-4 pl-4 md:w-1/3 pr-4 pl-4 flex items-stretch mt-4 md:mt-0"  >
          <div className="icon-box">
            
            <h4 className="text-center text-blue-800 text-2xl mb-4 font-bold" >Gamification</h4>
            <p className="text-center">Make hacking the new gaming. Gamification and meaningful engagement at their best.</p>
          </div>
        </div>

        <div className="xl:w-1/3 pr-4 pl-4 md:w-1/3 pr-4 pl-4 flex items-stretch mt-4 xl:mt-0"  >
          <div className="icon-box">
            
            <h4 className="text-center text-blue-800 text-2xl mb-4 font-bold" >Content</h4>
            <p className="text-center">Provide the most cutting-edge, curated, and sophisticated hacking content out there.</p>
          </div>
        </div>


      </div>


    </div>
  </section>
        </>
    )
}