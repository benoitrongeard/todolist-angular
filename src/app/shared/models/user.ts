export class User {
    id: number;
    name: string;
    email: string;

    constructor(props: any) {
        Object.assign(this, props);
    }
}