
let avatarAsText = (text = "") => {
    let name = text.split(" ")
    let firstLetter = name[0][0].toUpperCase();
    let secondLetter = name.length > 1 ? name[name.length - 1][0].toUpperCase() : "";

    if (!firstLetter) return "?";

    return firstLetter + secondLetter;
};

export default avatarAsText;