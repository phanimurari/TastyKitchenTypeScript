import { getAccessToken } from "../StorageUtilis";

export const isLoggedIn = () => {

  if (getAccessToken() !== undefined) {
    return true;
  } else {
    return false;
  }
};
