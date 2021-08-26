import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./App.css";
import { BACKEND_URL } from "./constants";
import Map from "./pages";
import { extractCookies } from "./utilities/cookie";
import { setAuth, setSocket, setUser } from "./redux/actions/actions";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import MyAccount from "./pages/myaccount";
import FileAComplaint from "./pages/fileAComplaint";
import Travel from "./pages/travel";
import News from "./pages/news";

function App() {
  let [authDone, setAuthDone] = useState(false);
  let dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  let authUser = () => {
    if (document.cookie !== null && document.cookie !== "") {
      let token = extractCookies(document.cookie).jwt;

      if (token !== undefined || token !== null || token !== "") {
        axios
          .post(`${BACKEND_URL}/api/v1/auth/verifyToken`, {
            token: token,
          })
          .then((res) => {
            try {
              if (res.data.res) {
                dispatch(setAuth(true));
                dispatch(setUser(res.data.userData));
                let socket = io(`${BACKEND_URL}`, {
                  transports: ["websocket"],
                });
                dispatch(setSocket(socket));
                socket.emit("USER_ID", res.data.userData._id);
                setAuthDone(true);
                console.log(res.data.msg);
              } else {
                dispatch(setAuth(false));
                dispatch(setUser(null));
                setAuthDone(true);
              }
            } catch (err) {
              dispatch(setAuth(false));
              dispatch(setUser(null));
              setAuthDone(true);
              console.log(err);
            }
          })
          .catch((err) => console.log(err));
      } else {
        dispatch(setAuth(false));
        dispatch(setUser(null));
        setAuthDone(true);
      }
    } else {
      dispatch(setAuth(false));
      dispatch(setUser(null));
      setAuthDone(true);
    }
  };
  useEffect(() => {
    authUser();
    // eslint-disable-next-line
  }, []);

  if (authDone === false) {
    return <div>loading...</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path={"/"}
            exact
            render={() => {
              if (!globalState.auth) return <Map />;
            }}
          />
          <Route
            path={"/signup"}
            render={() => {
              return <SignUp />;
            }}
          />
          <Route
            path={"/signin"}
            render={() => {
              return <SignIn />;
            }}
          />
          <Route
            path={"/myaccount"}
            render={() => {
              return <MyAccount />;
            }}
          />
          <Route
            path={"/fileacomplaint"}
            render={() => {
              return <FileAComplaint />;
            }}
          />
          <Route
            path={"/travel"}
            render={() => {
              return <Travel />;
            }}
          />
          <Route
            path={"/news"}
            render={() => {
              return <News />;
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
