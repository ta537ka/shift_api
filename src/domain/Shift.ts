const dayjs = require('dayjs');

export class Shift {
    private _id: number = 0;
    private _staffId: number;
    private _statusId: number;
    private _day: Date;

    constructor(staff_id: number = 0, status_id: number = 0, day: Date = dayjs()) {
        this._staffId = staff_id;
        this._statusId = status_id;
        this._day = day;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get staff_id(): number {
        return this._staffId;
    }

    set staff_id(staff_id: number) {
        this._staffId = staff_id;
    }

    get status_id(): number {
        return this._statusId;
    }

    set status_id(status_id: number) {
        this._statusId = status_id;
    }

    get day(): Date {
        return this._day;
    }

    set day(day: Date) {
        this._day = day;
    }
}