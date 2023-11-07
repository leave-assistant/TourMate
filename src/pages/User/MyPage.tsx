import { AppProps } from 'next/app';
import { UserProvider } from './UserContext';
import UserProfile from './UserContextTest';
import TripList from './TripList';
import TripAdd from './TripAdd';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<TripAdd></TripAdd>
			<TripList></TripList>
		</UserProvider>
	);
}

export default MyApp;
