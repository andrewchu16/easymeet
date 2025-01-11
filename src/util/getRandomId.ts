const getRandomId = (length = 5) => {
    let result = (Math.random() + 1).toString(36).substring(7);

    while (result.length < length) {
        result += Math.random().toString(36).substring(2);
    }

    return result.substring(0, length);
};

export { getRandomId };
