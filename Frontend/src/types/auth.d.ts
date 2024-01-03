interface AuthResponseI {
    token: {
        access: string;
        refresh: string;
    }
}

interface AuthRequestI {
    username: string;
    password: string;
}
