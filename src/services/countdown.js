import humanizeDuration from "humanize-duration";

const countdown = (ms) => {
    return humanizeDuration(ms, { language: "pt" });
};

export default countdown;