const temperatureConverter = (to: 'c' | 'f', temperature: number): number => {
    if (to === 'c') {
        return parseFloat(((temperature - 32) * (5 / 9)).toFixed(1))
    }
    return parseFloat(((temperature * (9 / 5)) + 32).toFixed(1))
}

export default temperatureConverter