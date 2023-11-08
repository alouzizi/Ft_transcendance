'use client';
import { useGlobalContext } from '@/app/context/store';
import Alert from '@mui/material/Alert';
import { Text } from '@radix-ui/themes';
import { useEffect } from 'react';



export default function AlertSave() {

    const { user, geust, saveChanges, setSaveChanges } = useGlobalContext();

    useEffect(() => {
        console.log("useEffect called from AlertSaved")
    }, [saveChanges]);

    return (
        <div className="flex justify-center">
            {(saveChanges !== 1 ?
                <div className='bg-black text-white w-1/2 p-1.5  rounded-md'>

                    <div className='flex items-center justify-between'>

                        <Text size='2' >
                            Careful - you have unsaved changes!
                        </Text>

                        <div >
                            <Text size='2' className='hover:underline cursor-pointer'
                                onClick={() => { setSaveChanges(-1) }}>
                                Rest
                            </Text>

                            <button onClick={async () => { }}
                                className="rounded-sm text-white bg-green-500 ml-2 px-1
                        hover:bg-green-900   hover:">
                                <Text size='2' > Save Changes</Text>

                            </button>
                        </div>
                    </div>

                </div>
                : <></>)}
        </div>
    );
}