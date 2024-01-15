export const IsResponseError = (response: any): response is ErrorFieldResponse => {
    const keys = Object.keys(response);
    for (const key of keys) {
        if (!Array.isArray(response[key])) {
            return false;
        }
    }
    return true;
}

export const IsResponse = (response: any): response is BaseResponse => {
    return !!response.detail;
}