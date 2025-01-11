const getRandomId = (length = 5) => {
    const dateString = Date.now().toString(36);
    const randomness = crypto.randomUUID().replace(/-/g, "");

    // interleave date and randomness character by character
    let result = "";
    for (let i = 0; i < dateString.length; i++) {
        result += dateString[i];
        if (i < randomness.length) {
            result += randomness[i];
        }
    }

    while (result.length < length) {
        result += Math.random().toString(36).substring(2);
    }

    return result.substring(0, length);
};

export { getRandomId };
