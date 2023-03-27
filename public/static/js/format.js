
var MONTHS = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

function convertTime(value, format) {
    switch (format) {
        case "Jan-01-2018, 12:30:00":
            var date = new Date(value*1000);
            var year = 1900+date.getYear();
            var month = MONTHS[date.getMonth()];
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);
            return `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`
        case "01-Jan-2018, 12:30:00":
            var date = new Date(value*1000);
            var year = 1900+date.getYear();
            var month = MONTHS[date.getMonth()];
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);
            return `${day} ${month}, ${year} ${hours}:${minutes}:${seconds}`
        case "Jan-01, 12:30:00":
            var date = new Date(value*1000);
            var month = MONTHS[date.getMonth()];
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);
            return `${month} ${day}, ${hours}:${minutes}:${seconds}`
        case "01-Jan, 12:30:00":
            var date = new Date(value*1000);
            var month = MONTHS[date.getMonth()];
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);
            return `${day} ${month}, ${hours}:${minutes}:${seconds}`
        case "12:30:00":
            var date = new Date(value*1000);
            var hours = date.getHours();
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);
            return `${hours}:${minutes}:${seconds}`
        default:
            return value;
    }
}



function convertCountry(value, format) {
    if (value == "?") {
        return value;
    }
    switch (format) {
        case "name":
            var date = new Date(value*1000);
            var year = 1900+date.getYear();
            var month = MONTHS[date.getMonth()];
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = ("0" + date.getMinutes()).slice(-2);
            var seconds = ("0" + date.getSeconds()).slice(-2);
            return `${country_codes[value]}`;
        case "flag":
            const codePoints = value
                .toUpperCase()
                .split('')
                .map(char =>  127397 + char.charCodeAt());
            return `${String.fromCodePoint(...codePoints)}`;

        default:
            return value;
    }
}

function formatValue(value, type, format) {
    console.log(type);
    switch (type) {
        case "Time":
            return convertTime(value, format);
            break;
        case "Source_Country":
            return convertCountry(value, format);
            break;
        default:
            return value;
    }
}
