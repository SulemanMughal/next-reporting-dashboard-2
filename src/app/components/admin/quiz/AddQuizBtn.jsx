"use client"

import { useState } from "react"
import { BiAddToQueue } from "react-icons/bi"


import CreateQuizModal from "./CreateQuizModal"

import CustomToaster from "@/app/components/CustomToaster"


import { MdQuiz } from "react-icons/md"

export default function AddQuizBtn(){

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <CustomToaster />
            {showModal && <CreateQuizModal  setShowModal={setShowModal} /> }
            <button className="bg-deep-blue-violet text-white py-2  pr-4  pl-4 mt-2 h-full border border-1 border-deep-blue-violet rounded-md mb-0 ml-0 flex justify-start items-center"  onClick={() => setShowModal(true)} >
                <MdQuiz  size={23} className="mr-2" />   Add New Quiz
            </button>
        </>
    )
}