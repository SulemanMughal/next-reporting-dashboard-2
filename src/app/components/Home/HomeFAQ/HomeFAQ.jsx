import classes from "./homeFAQ.module.css"

export default function HomeFAQ(){
    return (
        <>
            <section id="why-us" className="why-us section-bg py-5">
    <div className="container mx-auto sm:px-4 py-5"  id="section_faq" data-aos="fade-up" data-aos-duration="1000">

      <div className="flex flex-wrap ">

        <div className="lg:w-3/5 pr-4 pl-4 flex flex-col justify-center items-stretch  order-2 lg:order-1">

          <div className="content mb-4">
            <h3>General FAQ</h3>
          </div>

          <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
            <div className="flex-auto p-6">
              

              
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      How do I play Hacking Battlegrounds?
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse hidden" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <ul>
                        <li>
                          {`Start searching for a match (either solo or with your party) by pressing the "Play Battlegrounds" button. `}
                        </li>
                        <li>
                          {`After system matches you with other players, press "Accept" on the "Match Found" modal that will pop-up. (Make sure to increase the "All Sounds & Notifications" volume in order not to miss it) `}
                        </li>
                        <li>
                          Download your VPN Key while waiting for the match to start on the loading page. (You can connect to it after the loading phase) 
                        </li>
                        <li>
                          Work with your team to come up with a strategy for defending and attacking. 
                        </li>
                        <li>
                          See the progress of the match whilst in the battle page. 
                        </li>
                        <li>
                         {` Own the opponent's machines and protect yours to become the ultimate "Cyber Warrior". `}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    {`  I don't have a party. Can I still play?`}
                    </button>
                  </h2>
                  <div id="flush-collapseTwo" className="accordion-collapse hidden" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">{`Yes, you can! Click on "Play Battlegrounds" button and the system will match you with other players.`} </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                      Can I invite anyone to join my party?
                    </button>
                  </h2>
                  <div id="flush-collapseThree" className="accordion-collapse hidden" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">{`You can invite other Cyber Range Members via the global chat by clicking their name. You can also invite users via the "Battlegrounds Party" menu at the bottom if you follow each other. You can follow other users via their profile or via the global chat.`} </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className={"lg:w-2/5 pr-4 pl-4 items-stretch order-1 lg:order-2 img " + classes.faq-home-img-bg}  data-aos="zoom-in" data-aos-delay="150" data-aos-duration="1000" >&nbsp;</div>
      </div>

    </div>
  </section>
        </>
    )
}