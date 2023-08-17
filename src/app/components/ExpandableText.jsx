"use client"

import { useState } from "react";





const ExpandableText = ({ initialText, maxLength }) => {
    const [expanded, setExpanded] = useState(false);
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
  
    const textToDisplay = expanded ? initialText : initialText.slice(0, maxLength);
  
    return (
      <div>
        <p className='text-gray-400'>{textToDisplay}</p>
        {initialText.length > maxLength && (
          <button onClick={toggleExpand} className="text-blue-400 my-1">
            {expanded ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    );
};


export default ExpandableText