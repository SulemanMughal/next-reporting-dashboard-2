"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';


export default function HomeCTA(){
    const options = {
        radar: {
          // shape: 'circle',
          indicator: [{
              name: 'Difficulty',
              max: 6
            },
            {
              name: 'RT',
              max: 6
            },
            {
              name: 'AD',
              max: 6
            },
            {
              name: 'SIZE',
              max: 6
            },
            {
              name: 'CVE',
              max: 6
            }
          ]
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: [3,2,4,4,3],
            
            }
          ]
        }]
      }
    return (
        <>
            <section id="cta" className="cta py-10" >
    <div className="container mx-auto sm:px-4" id="section_cta" data-aos="fade-up" data-aos-duration="1000">

      <div className="flex flex-wrap ">
        <div className="lg:w-2/3 pr-4 pl-4 text-start " data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
          <h3 className="mb-3   text-blue-800 text-2xl mb-4 font-bold">KEY LEARNING OUTCOMES</h3>
          <ul>
            
            <li className='text-2xl mb-3'>
              <p>
                <i className="ri-check-double-line  "></i> Active Directory enumeration and attacks
              </p>
            </li>
            <li className='text-2xl mb-3'>
              <p >
                <i className="ri-check-double-line"></i> Evading endpoint protections
              </p>
            </li>
            <li className='text-2xl mb-3'>
              <p>
                <i className="ri-check-double-line"></i> Exploit development
              </p>
            </li>
            <li className='text-2xl mb-3'>
              <p>
                <i className="ri-check-double-line"></i> Lateral movement
              </p>
            </li>
            <li className='text-2xl mb-3'>
              <p>
                <i className="ri-check-double-line"></i> Local privilege escalation
              </p>
            </li>
            <li className='text-2xl mb-3'>
              <p>
                <i className="ri-check-double-line"></i> Situational awareness
              </p>
            </li>
            <li className='text-2xl mb-3'>
              <p>
                <i className="ri-check-double-line"></i> Web application enumeration and attacks
              </p>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/3 pr-4 pl-4 cta-btn-container text-center" data-aos="fade-left" data-aos-delay="100" data-aos-duration="1000">
          <div className="flex-auto p-6 pb-0">

          <ReactECharts option={options} style={{
                  height: '400px',
                  width: '400px',
                }} />
            
            

          </div>
        </div>
      </div>

    </div>
  </section>
        </>
    )
}