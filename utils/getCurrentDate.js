exports.getCurrentDate = () => {
    const today = new Date();

    const day = checkNumber(today.getDate())
    const month = checkNumber(today.getMonth() + 1)
    
    const year = today.getFullYear()

    return `${day}.${month}.${year}.`;
}

const checkNumber = (num) => {
    if (num < 10) {
        return `0${num}`
    }

    return `${num}`
}