import { Button } from "@/components/button";
import { IconPlus } from "@tabler/icons-react-native";
import { useState } from 'react';
import { Modal } from "../modal";

export function OpenModal() {
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    return (
        <>
            <Button onPress={() => setIsVisibleModal(true)} style={{position:'absolute', right:10, bottom:20, width:40, height:40, borderRadius:50}}>
                <Button.Icon icon={IconPlus}/>
            </Button>
            <Modal isVisibleModal={isVisibleModal} setIsVisibleModal={setIsVisibleModal} />
        </>
    )
}