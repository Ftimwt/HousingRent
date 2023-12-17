import {Send} from "./requests.ts";

export const Whoami = () => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "csrftoken=l3OaOeUZ6vU6tcdSKfRIlG9hwjhQiuUu; sessionid=08ck5i6z4cnfsni4krizp12xjeofk5f8");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:8000/api/auth/whoami/", requestOptions as any)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export const Login = async (req: LoginRequest): Promise<boolean> => {
    const res = await Send<BaseResponse>({body: req, url: 'auth/login'});
    return res.success;
}

export const Logout = async (): Promise<boolean> => {
    const res = await Send<BaseResponse>({url: 'auth/logout/', method: 'POST'});
    return res.success;
}
