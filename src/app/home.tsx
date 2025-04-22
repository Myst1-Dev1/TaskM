import { Calendar } from "@/components/home/calendar";
import { HomeHeader } from "@/components/home/homeHeader";
import { OpenModal } from "@/components/home/openModal";
import { Loading } from "@/components/loading";
import { auth } from '@/services/firebase';
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/signIn");
      } else {
        setIsAuthChecked(true); // Usuário logado, podemos mostrar a home
      }
    });

    return unsubscribe;
  }, []);

  if (!isAuthChecked) {
    // Enquanto a autenticação está sendo verificada, mostra um loading
    return (
      <Loading />
    );
  }

  return (
    <>
      <HomeHeader />
      <Calendar />
      <OpenModal />
    </>
  );
}