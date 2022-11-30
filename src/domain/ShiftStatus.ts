export class ShiftStatus {
    private _id: number = 0;
    private _status: string;

    constructor(status: string = '') {
        this._status = status;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get status(): string {
        return this._status;
    }

    set status(status: string) {
        this._status = status;
    }
}