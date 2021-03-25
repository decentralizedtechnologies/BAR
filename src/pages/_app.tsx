import { setConfiguration } from "react-grid-system";
import "../theme/globals.scss";

setConfiguration({ containerWidths: [540, 740, 960, 1400, 1540] });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
