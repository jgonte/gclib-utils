export interface FormatDateOptions {

}

export default function formatDate(
    date: Date | string, 
    format?: string, 
    options: FormatDateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric'
    }) {

    if (typeof date === 'string') {

        date = new Date(date);
    }

    switch(format) {
        default: return date.toLocaleDateString(undefined, options);
    }
}