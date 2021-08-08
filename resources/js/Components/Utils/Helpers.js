
export const capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatChartName = unformattedName => {
    let tempFormattedName = unformattedName.split("-");
    let formattedChartName = tempFormattedName.map(name =>
        capitalize(name)
    );
    return formattedChartName.join(" ");
}
