import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store/configureStore";
import App from "./App";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.scss";
import "../styles/fonts.scss";

config.autoAddCss = false;

const ClinIQ = ({ Component, pageProps, domainName }) => {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps?.session}>
        <App
          Component={Component}
          pageProps={pageProps}
          domainName={domainName}
        />
      </SessionProvider>
    </Provider>
  );
};

ClinIQ.getInitialProps = async (context) => {
  return {
    domainName: context.ctx.req?.headers.host ?? window.location.host,
  };
};

export default ClinIQ;