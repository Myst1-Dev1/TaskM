import { auth , db} from "@/services/firebase";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from 'firebase/firestore';

export function useUser() {

    const user = auth.currentUser;

    async function fetchUsername() {
        if (!user) return null;

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
        const data = userDoc.data();
        return data.username;
        }

        return null;
    }

    const { data:username, isFetching } = useQuery({
        queryKey: ['user'],
        queryFn: async () => fetchUsername()
    });

    return {
        username, isFetching
    }
}