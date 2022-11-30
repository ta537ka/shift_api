import { Admin } from "../../domain/Admin";

const _serializeSingleAdmin = (admin: Admin) => {
    return {
        id: admin.id,
        username: admin.username,
        password: admin.password
    }
}

export class AdminSerializer {
    serialize(data: any) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleAdmin);
        }
        return _serializeSingleAdmin(data);
    }
}