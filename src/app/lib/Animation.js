
"use client";

import AOS from 'aos';

export function Animation(){
    
    AOS.init({
        duration : 1000,
        delay : 500,
        once: true,
        mirror: false, 
        offset: 0,
        easing: 'ease-in-out',
        anchorPlacement: 'top-bottom'
    });
}