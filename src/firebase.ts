import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  OAuthCredential,
  getAdditionalUserInfo,
  UserCredential,
  AdditionalUserInfo,
  User,
} from "firebase/auth";
import { AuthData } from "@/context";

const firebaseConfig = {
  apiKey: "AIzaSyDNq8zK9AwYBk73AI1P3MhB7Iso6n05lHc",
  authDomain: "nodeploy-app.firebaseapp.com",
  projectId: "nodeploy-app",
  storageBucket: "nodeploy-app.appspot.com",
  messagingSenderId: "360245081023",
  appId: "1:360245081023:web:88cb4d4fd738ea0318e70a",
};

const app = initializeApp(firebaseConfig);
const provider = new GithubAuthProvider();
provider.addScope("repo");
provider.addScope("read:user");

const auth = getAuth();

export const signInWithGithub = async (): Promise<AuthData | null> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    const credential: OAuthCredential | null = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || null;
    const user: User = result.user;
    const idProviderData: AdditionalUserInfo | null = getAdditionalUserInfo(result);

    console.log({ credential, user, idProviderData, token });
    return { credential, user, idProviderData, token };
  } catch (error) {
    console.error(error);
    return null;
    // return { credential: null, user: null, idProviderData: null, token: null };
  }
};
