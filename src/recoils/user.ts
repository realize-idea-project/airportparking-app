import { atom } from 'recoil';

enum RecoilUser {
  user = 'user',
  userQuery = 'userQuery',
}

export const userState = atom({
  key: RecoilUser.user,
  default: undefined,
});
