import { ILoginRepository } from "../repository/ILoginRepository";

export class GetUserByStaff {
    private loginRepository: ILoginRepository;

    constructor(loginRepsitory: ILoginRepository) {
        this.loginRepository = loginRepsitory;
    }

    async excute(username: string) {
        const staffUser = await this.loginRepository.findUserByStaff(username);
        return staffUser;
    }
}