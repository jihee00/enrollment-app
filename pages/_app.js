import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProfileProvider } from './profile/profileContext';
import { AuthProvider } from '@/lib/authContext';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <ProfileProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ProfileProvider>
        </AuthProvider>
    );
}
