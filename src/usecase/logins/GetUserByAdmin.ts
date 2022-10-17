import { ILoginRepository } from "../repository/ILoginRepository";

export class GetUserByAdmin {
    private loginRepository: ILoginRepository;

    constructor(loginRepsitory: ILoginRepository) {
        this.loginRepository = loginRepsitory;
    }

    async excute(username: string) {
        const adminUser = await this.loginRepository.findUserByAdmin(username);
        return adminUser;
    }
}