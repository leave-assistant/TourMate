import { AppProps } from 'next/app';
import { UserProvider } from './UserContext';
import { TripPlanProvider } from './TripContext';
import ConnectPeople from "./MatchingList";
import AllUserTripPlans from "./TripList";
import TripAdd from "./TripAdd";


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
		<TripPlanProvider>
					<TripAdd></TripAdd>
                    투어메이트<hr/>
					<ConnectPeople></ConnectPeople>
		</TripPlanProvider>
		</UserProvider>
	);
}

export default MyApp;

