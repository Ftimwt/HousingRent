interface AuthResponseI {
    detail: string;
    token: {
        access: string;
        refresh: string;
    }
}

interface LoginRequestI {
    username: string;
    password: string;
}
