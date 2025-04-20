import { Calendar } from "@/components/home/calendar";
import { HomeHeader } from "@/components/home/homeHeader";
import { OpenModal } from "@/components/home/openModal";
import { useEffect, useState } from 'react';
import { auth, db } from '@/services/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

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
    const [username, setUsername] = useState('');
    const [tasks, setTasks] = useState<TasksType[]>([]);
    const user = auth.currentUser;

    useEffect(() => {
        async function fetchUsername() {
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.username);
            }
        }
        }

        fetchUsername();
    }, []);

    useEffect(() => {
        async function fetchTasks() {
          if (user) {
            const q = query(
              collection(db, 'tasks'),
              where('userId', '==', user.uid)
            );
      
            const querySnapshot = await getDocs(q);
            const taskList: any[] = [];
      
            querySnapshot.forEach((doc) => {
              taskList.push({ id: doc.id, ...doc.data() });
            });
      
            setTasks(taskList);
          }
        }
      
        fetchTasks();
      }, []);

    return (
        <>
            <HomeHeader username = {username} />
            <Calendar tasks = {tasks} />
            <OpenModal />
        </>
    )
}