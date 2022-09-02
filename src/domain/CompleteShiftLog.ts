const dayjs = require('dayjs')

export class CompleteShiftLog {
    private _id: number = 0;
    private _info: string;
    private _updatedAt: Date;

    constructor(info: string = '', updated_at: Date = dayjs()) {
        this._info = info;
        this._updatedAt = updated_at;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get info(): string {
        return this._info;
    }

    set info(info: string) {
        this._info = info;
    }

    get update_at(): Date {
        return this._updatedAt;
    }

    set update_at(update_at: Date) {
        this._updatedAt = update_at;
    }
}