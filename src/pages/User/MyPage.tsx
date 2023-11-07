import { AppProps } from 'next/app';
import { UserProvider } from './UserContext';
import UserProfile from './UserContextTest';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<UserProfile></UserProfile>
		</UserProvider>
	);
}

export default MyApp;
