export const isLeapYear = (year) => {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};

export const isValidMonth = (dateValueString, dayIndex, monthIndex) => {
    let day = dateValueString.substr(dayIndex, 2),
        month = dateValueString.substr(monthIndex, 2),
        isValid = true;

    switch (day) {
        case '30':
            isValid = (month != "02");
            break;
        case '31':
            isValid = ['01', '03', '05', '07', '08', '10', '12'].includes(month);
            break;
    }

    return isValid;
};

export const isValidDay = (dateValueString, dayIndex, monthIndex, yearIndex) => {
    let day = Number(dateValueString.substr(dayIndex, 2)),
        month = dateValueString.substr(monthIndex, 2),
        year = Number(dateValueString.substr(yearIndex, 4)),
        isValid = true;

    switch (month) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
            isValid = (day < 32);
            break;
        case '02':
            isValid = ((day < 30) && isLeapYear(year)) || (day < 29);
            break;
        default:
            isValid = (day < 31);
            break;
    }

    return isValid;
};

export const isValidYear = (dateValueString, dayIndex, monthIndex, yearIndex) => {
    let day = Number(dateValueString.substr(dayIndex, 2)),
        month = dateValueString.substr(monthIndex, 2),
        year = Number(dateValueString.substr(yearIndex, 4)),
        isValid = true;

    if (month === '02') {
        isValid = (isLeapYear(year)) ? (day < 29) : (day < 28);
    }

    return isValid;
};