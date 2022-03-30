const fixNumberOfDecPlaces = (value, numberOfPlaces = 2) => {
    if (!value) return value;

    return Number(value).toFixed(numberOfPlaces);
};

const isNotNumericValue = value => {
    
    return isNaN(value) || value === ''
}

function splitArray(arr, limit) {
    let updatedArr = [];
    let noOfArrays = Math.ceil(arr.length / limit);

    for (let i = 0; i < noOfArrays; i++) {
        let start = i * limit;
        let end = i * limit + limit;
        updatedArr.push(arr.slice(start, end));
    }

    return updatedArr;
}

function debounce(callback, time) {
    let interval;
    return (...args) => {
        clearTimeout(interval);
        interval = setTimeout(() => {
            interval = null;
            callback(...args);
        }, time);
    };
}

// preračunaj veličinu fajla pošto je uvek u B
const displayFileSize = (number) => {
    if (number < 1024) {
        return number + "bytes";
    } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + "KB";
    } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + "MB";
    }
};

export { fixNumberOfDecPlaces, isNotNumericValue, splitArray, debounce, displayFileSize };
