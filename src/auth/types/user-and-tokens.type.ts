import { UserType } from '@app/user/types/user.type';
import { TokenPair } from './token-pair.interface';

export type UserAndTokens = UserType & TokenPair;
