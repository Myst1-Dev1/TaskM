import { Calendar } from "@/components/home/calendar";
import { HomeHeader } from "@/components/home/homeHeader";
import { OpenModal } from "@/components/home/openModal";
import { Tasks } from "@/components/home/tasks";

export default function Home() {
    return (
        <>
            <HomeHeader />
            <Calendar />
            <Tasks />
            <OpenModal />
        </>
    )
}