import { Admin } from "../../domain/Admin";
import { Staff } from "../../domain/Staff";

const _serializeSingleLogin = (user: Admin | Staff) => {
    return {
        id: user.id,
        username: user.username,
        password: user.password
    }
}

export class LoginSerializer {
    serialize(data: any) {
        if (!data) {
            throw new Error('expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(_serializeSingleLogin);
        }
        return _serializeSingleLogin(data);
    }
}