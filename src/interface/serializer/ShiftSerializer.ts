import { Shift } from "../../domain/Shift";

const _serializeSingleShift = (shift: Shift) => {
    return {
        id: shift.id,
        staff_id: shift.staff_id,
        status_id: shift.status_id,
        day: shift.day
    }
}

export class ShiftSerializer {
    serialize(data: any) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleShift);
        }
        return _serializeSingleShift(data);
    }
}