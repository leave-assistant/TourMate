import { AppProps } from 'next/app';
import { UserProvider } from './UserContext';
import UserProfile from './UserContextTest';
import TripList from './TripList';
import TripAdd from './TripAdd';
import EditText from './EditUser';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<EditText></EditText>
			<UserProfile></UserProfile>
		</UserProvider>
	);
}

export default MyApp;

