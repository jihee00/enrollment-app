import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProfileProvider } from './profile/profileContext';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <ProfileProvider>
        <Component {...pageProps} />
      </ProfileProvider>
    </Layout>
  );
}
