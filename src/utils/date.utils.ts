import { DateTimeFormatter, LocalDate } from "@js-joda/core";

export function stringToLocalDate(iso8601Date: string): LocalDate {
    return LocalDate.parse(iso8601Date);
}

export function localDateToString(date: LocalDate): string {
    return date.format(DateTimeFormatter.ofPattern('yyyy-MM-dd')).toString();
}