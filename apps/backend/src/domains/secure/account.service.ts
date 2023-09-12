import { AccountEntity, AppDataSource } from '@sprindt/database';
import { Repository } from 'typeorm';

export class AccountService {
  private accountRepository: Repository<AccountEntity>;

  constructor() {
    this.accountRepository = AppDataSource.getRepository(AccountEntity);
  }

  async findById(id: string): Promise<AccountEntity | null> {
    const account = await this.accountRepository.findOneBy({
      uuid: id,
    });

    if (!account) return null;

    return account;
  }

  async save(account: AccountEntity): Promise<void> {
    const accountEntity = this.accountRepository.create({
      uuid: account.uuid,
      accountName: account.accountName,
      isActive: account.isActive,
    });

    await this.accountRepository.save(accountEntity);
  }

  async remove(account: AccountEntity): Promise<void> {
    await this.accountRepository.delete(account.uuid);
  }
}
