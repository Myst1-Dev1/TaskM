import { TasksType } from "@/@types/tasks";
import { auth, db } from "@/services/firebase";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from 'firebase/firestore';

export function useTasks() {
    const user = auth.currentUser;

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
    
    const { data: tasks, isFetching } = useQuery<TasksType[]>({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
        enabled: !!user,
    });

    return {
        tasks, isFetching
    }
}