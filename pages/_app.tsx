import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const AppComponent: any = Component;
  return <AppComponent {...pageProps} />;
}

export default MyApp;
