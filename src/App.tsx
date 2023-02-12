import { useContext } from "react";
import { GlobalContext } from "@/context";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { signInWithGithub } from "@/firebase";

const App = () => {
  const { user, authData, setAuthData } = useContext(GlobalContext);

  const login = async () => {
    const userAuthData = await signInWithGithub();
    if (!userAuthData) return;
    setAuthData(userAuthData);
  };

  return (
    <div className="h-screen w-screen">
      <div className="h-full flex">
        <div className="m-auto">
          <button className="flex rounded-full border-2 px-4 py-2 m-auto" onClick={login}>
            <ArrowRightOnRectangleIcon className="w-6 h-6 mr-2 m-auto" />
            <span className="m-auto">Login</span>
          </button>
          <code>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <pre>{JSON.stringify(authData, null, 2)}</pre>
          </code>
        </div>
      </div>
    </div>
  );
};

export default App;
