exports.fixedNumberOfDecimals = (reportObj, numberOfDecimals) => {
    let updatedReportObj = {};

    // iz nekog razloga potrebni keys se nalaze u _doc objektu
    for (const key in reportObj._doc) {
        const value = reportObj._doc[key];
        switch (key) {
            case "precnikZice":
            case "otpor":
            case "debPPS1":
            case "debIzolacije":
            case "debPPS2":
            case "debPlasta":
            case "spPrecnik":
                updatedReportObj[key] =
                    value !== "/"
                        ? new Intl.NumberFormat(undefined, {
                              type: "decimal",
                              minimumFractionDigits: numberOfDecimals,
                          }).format(value)
                        : "/";
                break;

            default:
                updatedReportObj[key] = value;
        }
    }

    return updatedReportObj;
};
