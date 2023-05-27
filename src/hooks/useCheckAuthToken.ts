import { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { decodeToken } from "../helpers/helpers";
import { logout } from "../features/auth/authSlice";

export const useCheckAuthToken = () => {
  const dispatch = useAppDispatch();

  const access_token = useAppSelector(
    (state: RootState) => state.auth.access_token
  );

  if (!access_token || access_token === undefined) {
    return false;
  } else {
    const decodedJwt = decodeToken(access_token);
    let currentDate = new Date();
    // if token expired
    if (decodedJwt.exp * 1000 <= currentDate.getTime()) {
      dispatch(logout());
      return false;
    }
    return true;
  }
};
