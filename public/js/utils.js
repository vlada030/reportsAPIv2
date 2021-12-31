export const fixNumberOfDecPlaces = (value, numberOfPlaces=2) => {
    if (!value) return value

    return Number(value).toFixed(numberOfPlaces)
}
