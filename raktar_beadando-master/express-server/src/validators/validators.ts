export function validDate(date: string) {
    const regex = /^([1-2][0-9]{3}[-]((0[1-9])|([1][0-2]))[-]((0[1-9])|([1-2][0-9])|([3][0-1])))$/;

    if(date.match(regex))
        return true;
    return false;
}

export function validEmail(email: string) {
    const regex = /^([a-zA-Z\d._\-áÁéÉíÍóÓüÜöÖűŰúÚőŐ]{4,})@([a-zA-Z._\-]{3,}).([a-zA-Z]{2,4})$/;

    if(email.match(regex))
        return true;
    return false;
}

export function validPhoneNumber(number: string) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if(number.match(regex))
        return true;
    return false;
}

export const config = {
    secret: "VeRyHarDsEcRat123987",
    expiration: "5 minutes"
};