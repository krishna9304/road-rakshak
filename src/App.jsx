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
import { notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  let [authDone, setAuthDone] = useState(false);
  let dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  let authUser = () => {
    if (document.cookie !== null && document.cookie !== "") {
      let token = extractCookies(document.cookie).jwt;
      if (token !== undefined || token !== null || token !== "") {
        console.log(token);
        axios
          .post(`${BACKEND_URL}api/v1/userAuth/verifyToken`, {
            token: token,
          })
          .then((res) => {
            try {
              if (res.data.res) {
                dispatch(setAuth(true));
                dispatch(setUser(res.data.userData));
                const socket = io(`${BACKEND_URL}`, {
                  transports: ["websocket"],
                });
                dispatch(setSocket(socket));
                socket.emit("USER_ID", res.data.userData._id);
                setAuthDone(true);
                notification.success({
                  message: "Success",
                  description: res.data.msg,
                });
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

  if (!authDone) {
    return (
      <div className="uppercase w-full h-screen flex justify-center items-center text-center text-3xl font-bold">
        loading...&nbsp; <LoadingOutlined />
      </div>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {globalState.auth ? <Map /> : <SignUp />}
          </Route>
          <Route path="/signup">
            {globalState.auth ? <MyAccount /> : <SignUp />}
          </Route>
          <Route path="/signin">
            {globalState.auth ? <MyAccount /> : <SignIn />}
          </Route>
          <Route path="/myaccount">
            {globalState.auth ? <MyAccount /> : <SignUp />}
          </Route>
          <Route path="/fileacomplaint">
            {globalState.auth ? <FileAComplaint /> : <SignUp />}
          </Route>
          <Route path="/travel">
            {globalState.auth ? <Travel /> : <SignUp />}
          </Route>
          <Route path="/news">{globalState.auth ? <News /> : <SignUp />}</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
