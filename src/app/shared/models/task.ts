export class Task {
    title: string;
    due_at: any;
    is_completed: boolean;

    constructor(props: any) {
        Object.assign(this, props);
    }

    setDate(date: any) {
        this.due_at = date;
    }
}