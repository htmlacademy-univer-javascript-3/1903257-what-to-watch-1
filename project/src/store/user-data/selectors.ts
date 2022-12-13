import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/store';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAvatarUrl = (state: State): string | null => state[NameSpace.User].avatar;
