import { Calendar } from "@/components/home/calendar";
import { HomeHeader } from "@/components/home/homeHeader";
import { OpenModal } from "@/components/home/openModal";
import { Loading } from "@/components/loading";
import { NotificationModal } from "@/components/notificationModal";

export default function Home() {
  // const [isAuthChecked, setIsAuthChecked] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       router.replace("/signIn");
  //     } else {
  //       setIsAuthChecked(true);
  //     }
  //   });
  
  //   return unsubscribe;
  // }, []);

  // if (!isAuthChecked) {
  //   return (
  //     <Loading />
  //   );
  // }

  return (
    <>
      <HomeHeader />
      <Calendar />
      {/* <OpenModal /> */}
      <NotificationModal />
    </>
  );
}