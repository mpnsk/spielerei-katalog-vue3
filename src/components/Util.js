function filterFirst(array, condition, limit) {
    const result = []
    for (const value of array) {
        if (condition(value)) {
            result.push(value)
            if (result.length === limit) break;
        }
    }
    return result
}

export {filterFirst}
