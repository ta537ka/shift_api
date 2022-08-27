"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteShift = void 0;
const dayjs = require('dayjs');
class CompleteShift {
    constructor(shift_id = 0, term_id = 0, day = dayjs()) {
        this._id = 0;
        this._shiftId = shift_id;
        this._termId = term_id;
        this._day = day;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get shift_id() {
        return this._shiftId;
    }
    set shift_id(shift_id) {
        this._shiftId = shift_id;
    }
    get term_id() {
        return this._termId;
    }
    set term_id(term_id) {
        this._termId = term_id;
    }
    get day() {
        return this._day;
    }
    set day(day) {
        this._day = day;
    }
}
exports.CompleteShift = CompleteShift;
