
// convert to uppercase first letter of each word   
export function convertStringToTitleCase(string){
    if(string){
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    } else {
        return ""
    }
}



export function convertStringToArray(string){
    if(string){
        return string.split(",").map(item => item.trim())
    } else {
        return []
    }
}


export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export function reverseArray(array){
    let newArray = []
    array.map((item) => {
        newArray.unshift(item)
    })
    return newArray
}