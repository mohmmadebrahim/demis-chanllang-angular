export class ResponseModel<T> {
    status?: boolean | number | undefined;
    body?: T;
    message?: string;
}
