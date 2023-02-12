import { AdditionalUserInfo, OAuthCredential, User } from "firebase/auth";
import { createContext, useReducer } from "react";

export type AuthData = {
  user?: User | null;
  credential: OAuthCredential | null;
  idProviderData: AdditionalUserInfo | null;
  token: string | null;
};

type State = {
  user: User | null;
  authData: AuthData;
};

type Setters = {
  setAuthData: (authData: AuthData) => void;
};

type GlobalState = State & Setters;

const initialState: GlobalState = {
  user: null,
  authData: {
    credential: null,
    user: null,
    idProviderData: null,
    token: null,
  },

  setAuthData: () => {},
};

export const GlobalContext = createContext(initialState);

const reducers = (state: State, { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case "SET_AUTH_DATA":
      return {
        ...state,
        user: payload.user,
        authData: {
          credential: payload.credential,
          idProviderData: payload.idProviderData,
          token: payload.token,
        },
      };

    default:
      return { ...state };
  }
};

export const GlobalProvider = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  const setAuthData = (authData: AuthData) => {
    dispatch({
      type: "SET_AUTH_DATA",
      payload: authData,
    });
  };

  const setters: Setters = {
    setAuthData,
  };

  const globalState: GlobalState = {
    ...state,
    ...setters,
  };

  return <GlobalContext.Provider value={globalState}>{children}</GlobalContext.Provider>;
};
