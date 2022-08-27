import { Staff } from "../../domain/Staff";

const _serializeSingleStaff = (staff: Staff) => {
    return {
        id: staff.id,
        username: staff.username,
        password: staff.password
    }
}

export class StaffSerializer {
    serialize(data: any) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleStaff);
        }
        return _serializeSingleStaff(data);
    }
}