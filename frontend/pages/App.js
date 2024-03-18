import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../common/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/UserActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps, domainName }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [token, setToken] = useState(null);
  const authPages = ["/login", "/register", "/forgot-password", "/"];
  const isAuthPage = authPages.includes(router.pathname);

  const user = useSelector(({ UserData }) => UserData?.data);
  const isLoadingUser = !user?._id;

  useEffect(
    () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        dispatch(getUser(storedToken));
      } else if (!isLoadingUser && !isAuthPage) {
        router.push("/login");
      }
    },
    [
      // dispatch, isLoadingUser, isAuthPage, token, user?._id
    ]
  );

  useEffect(
    () => {
      if (!isLoadingUser && !token && !isAuthPage) {
        router.push("/login");
      } else if (!isLoadingUser && !isAuthPage && !user?._id) {
        router.push("/login");
      }
    },
    [
      // isLoadingUser, token, isAuthPage, user?._id
    ]
  );

  return (
    <div className="page">
      <AnimatePresence mode="wait">
        {!isAuthPage && <Navbar />}
        <motion.div
          initial={{ y: 400 }}
          exit={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ bounce: 0, type: "spring", duration: 0.8 }}
          className="pageContent"
          style={{ top: isAuthPage && "0" }}
        >
          <Component
            key={"pageContent"}
            {...pageProps}
            domainName={domainName}
          />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MyApp;
