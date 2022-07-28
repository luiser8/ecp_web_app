export const useIntl = (lan, style, currency, value) => {
    return new Intl.NumberFormat(lan,
        { style: style, currency: currency })
        .format(value);
}