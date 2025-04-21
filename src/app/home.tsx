import { Calendar } from "@/components/home/calendar";
import { HomeHeader } from "@/components/home/homeHeader";
import { OpenModal } from "@/components/home/openModal";
import { auth, db } from '@/services/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useQuery } from "@tanstack/react-query";

export type TasksType = {
    id:string
    title: string
    description:string
    type: string
    createdAt: string
    status: boolean
    done: boolean
    userId: string
}

export default function Home() {
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

    async function fetchTasks(): Promise<TasksType[]> {
      if (!user) return [];
    
      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', user.uid)
      );
    
      const querySnapshot = await getDocs(q);
      const taskList: TasksType[] = [];
    
      querySnapshot.forEach((doc) => {
        taskList.push({ id: doc.id, ...doc.data() } as TasksType);
      });
    
      return taskList;
    }    

    const { data:username, isFetching } = useQuery({
      queryKey: ['user'],
      queryFn: async () => fetchUsername()
    });

    const { data: tasks, isLoading } = useQuery<TasksType[]>({
      queryKey: ['tasks'],
      queryFn: fetchTasks,
      enabled: !!user,
    });

    return (
        <>
            <HomeHeader username = {username} isFetching = {isFetching} />
            <Calendar tasks = {tasks} isLoading = {isLoading} />
            <OpenModal />
        </>
    )
}