import { ILoginRepository } from "../repository/ILoginRepository";

export class GetUserByAdmin {
    private loginRepository: ILoginRepository;

    constructor(loginRepsitory: ILoginRepository) {
        this.loginRepository = loginRepsitory;
    }

    async excute(username: string, password: string) {
        const adminUser = await this.loginRepository.findUserByAdmin(username, password);
        return adminUser;
    }
}