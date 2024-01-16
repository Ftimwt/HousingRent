interface AuthResponseI {
    detail: string;
    token: {
        access: string;
        refresh: string;
    }
}

interface CreateAccountI {
    username: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    national_code: string;
    address?: string;
    password: string;
}

interface LoginRequestI {
    username: string;
    password: string;
}
