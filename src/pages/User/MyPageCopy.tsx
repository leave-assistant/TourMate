import { AppProps } from 'next/app';
import { UserProvider } from './UserContext';
import { TripPlanProvider } from './TripContext';
import ConnectPeople from "./MatchingList";
import AllUserTripPlans from "./TripList";
import TripAdd from "./TripAdd";
import UserProfile from './UserProfile';
import { RoomProvider } from './ChattingRoomContext';


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
		<TripPlanProvider>
		<RoomProvider>
					<TripAdd></TripAdd>
                    투어메이트<hr/>
					<UserProfile></UserProfile>
		</RoomProvider>
		</TripPlanProvider>
		</UserProvider>
	);
}

export default MyApp;

