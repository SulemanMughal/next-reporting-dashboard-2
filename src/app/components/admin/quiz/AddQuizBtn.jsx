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
            <div className="relative inline-block text-left">
                <button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 items-center"  onClick={() => setShowModal(true)} >
                    <BiAddToQueue  size={23} />   Add New Quiz
                </button>
            </div>
        </>
    )
}