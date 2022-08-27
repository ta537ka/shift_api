const dayjs = require('dayjs');

export class CompleteShift {
    private _id: number = 0;
    private _shiftId: number;
    private _termId: number;
    private _day: Date;

    constructor(shift_id: number = 0, term_id: number = 0, day: Date = dayjs()) {
        this._shiftId = shift_id;
        this._termId = term_id;
        this._day = day;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get shift_id(): number {
        return this._shiftId;
    }

    set shift_id(shift_id: number) {
        this._shiftId = shift_id;
    }

    get term_id(): number {
        return this._termId;
    }

    set term_id(term_id: number) {
        this._termId = term_id;
    }

    get day(): Date {
        return this._day;
    }

    set day(day: Date) {
        this._day = day;
    }
}