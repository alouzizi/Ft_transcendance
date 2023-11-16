'use client';
import { useGlobalContext } from '@/app/context/store';
import Alert from '@mui/material/Alert';
import { Text } from '@radix-ui/themes';
import { useEffect } from 'react';



export default function AlertSave() {

    const { saveChanges, setSaveChanges } = useGlobalContext();


    return (
        <div className="flex justify-center items-center pt-20">
            {(saveChanges !== 1 ?
                <div className=' text-white w-[50%] p-2  rounded-md shadow-sm shadow-white  max-w-xl'>

                    <div className='flex items-center justify-between'>

                        <Text size='3' className='hidden md:block' >
                            Careful - you have unsaved changes!
                        </Text>

                        <div className='flex flex-grow items-center justify-between  md:flex-none' >
                            <Text size='3' className='hover:underline cursor-pointer'
                                onClick={() => { setSaveChanges(-1) }}>
                                Rest
                            </Text>

                            <button onClick={() => { setSaveChanges((pre) => { return pre - 50000 }) }}
                                className="rounded-sm text-white bg-[#254BD6] ml-3 p-1">
                                {/* hover:bg-green-900 */}
                                <Text size='3' > Save Changes</Text>

                            </button>
                        </div>
                    </div>

                </div >
                : <></>)
            }
        </div >
    );
}