interface SendResponse<T extends any> {
    success: boolean;
    status: number;
    data?: T;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions<Body extends any = Record<string, any>> {
    url: string;
    method?: HttpMethod;
    body?: Body;
    params?: Record<string, any>;
}

export const Send = async <Response extends any = BaseResponse, Body extends any = {}>(options: RequestOptions<Body>): Promise<SendResponse<Response>> => {
    const method = options.method === undefined ? 'GET' : options.method;
    const queryParams = new URLSearchParams(options.params).toString();
    let url = "http://localhost:8000/api/" + options.url;
    const requestUrl = options.params ? `${url}?${queryParams}` : url;

    const requestOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Cookies': 'csrftoken=l3OaOeUZ6vU6tcdSKfRIlG9hwjhQiuUu; sessionid=08ck5i6z4cnfsni4krizp12xjeofk5f8'
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
    };

    try {
        const response = await fetch(requestUrl, requestOptions);
        if (!response.ok) throw new Error(`Request failed with status: ${response.status}`);
        const responseData: Response | undefined = await response.json();
        return {success: true, status: response.status, data: responseData};
    } catch (error) {
        return {success: false, status: 0}; // You might want to improve this value based on your error handling needs.
    }
};

