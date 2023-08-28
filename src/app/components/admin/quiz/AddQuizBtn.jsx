"use client"

import { useState } from "react"
import { BiAddToQueue } from "react-icons/bi"


import CreateQuizModal from "./CreateQuizModal"

import CustomToaster from "@/app/components/CustomToaster"

export default function AddQuizBtn(){

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <CustomToaster />
            {showModal && <CreateQuizModal  setShowModal={setShowModal} /> }
            <div className="relative inline-block text-left border-none">
                <button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-deep-blue  px-3 py-2 text-lg border-none font-semibold text-white shadow-sm   items-center "  onClick={() => setShowModal(true)} >
                    <BiAddToQueue  size={23} />   Add New Quiz
                </button>
            </div>
        </>
    )
}