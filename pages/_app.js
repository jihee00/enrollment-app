import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProfileProvider } from '@/lib/profileContext';
import { AuthProvider } from '@/lib/authContext';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <ProfileProvider>
                <Layout>
                    <Head>
                        <title>Enrollment System Project</title>
                    </Head>
                    <Component {...pageProps} />
                </Layout>
            </ProfileProvider>
        </AuthProvider>
    );
}
