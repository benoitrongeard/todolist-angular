export class Task {
    title: string;
    due_at: any;
    is_completed: boolean;
    id: number;
    dateFormated: string;

    constructor(props: any) {
        Object.assign(this, props);
    }

    setDate(date: any) {
        this.due_at = date;
    }

    setDateFormated(date: any) {
        this.dateFormated = date;
    }

    complete() {
        this.is_completed = !this.is_completed;
    }

    formatDateForApi() {
        if (!this.due_at) {
            return;
        }

        let date: any = new Date(this.due_at);     
        date = date.toLocaleDateString('fr-CA');
        this.due_at = date;
    }
}