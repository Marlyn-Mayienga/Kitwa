export const monthsList = ['Jav', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const getFormDate=(date, formate)=>{
    if(formate === "ACTIVITIES"){
        return getDateActivitiesForm(date)
    }

}

const getDateActivitiesForm=(date)=>{
    date  = new Date(date)
    let hour = date.getHours()
    let min = date.getMinutes()
    let day = date.getDate()
    let mon = monthsList[date.getMonth()]
    // console.log(`${hour}:${min}, on ${day}/${mon}`)
    return `${hour}:${min}, on ${day}/${mon}`
}


export   const getTheDates =(realDate)=>{
    let date = new Date(realDate)
    // console.log(date)
    return {date:date.getDate(), month:monthsList[date.getMonth()]}

}