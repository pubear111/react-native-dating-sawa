export function showCurrentOld(birth) {
    let birthDate = birth.getFullYear()
    let year = new Date().getFullYear()
    return (year - birthDate)
}

export function showDate(birthday) {
    let date = birthday.getDate()
    let month = birthday.getMonth() + 1
    let year = birthday.getFullYear()
    return (date + '/' + month + '/' + year)
}


export function findById(array, id) {
    return array.find(item => item.id === id)
}