'use client';

import { useGlobalContext } from '@/app/context/store';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { ChangeStatusBanned, changeStatusAdmin, kickMember } from '../../api/fetch-channel';


const allOptions = {
    "regulerNotAdmin": [
        'Make Group Admin',
        'kick from Group',
        'ban from Group',
        'Mute'
    ],
    "regulerAdmin": [
        'Remove Group Admin',
        'kick from Group',
        'ban from Group',
        'Mute'
    ],
    "banned": [
        'unban from Group'
    ]
}
const ITEM_HEIGHT = 48;

export default function LongMenu({ member, banned }: { member: memberChannelDto, banned: boolean }) {
    const [options, setOptions] = React.useState<string[]>([]);
    const { geust, user, setGeust, socket } = useGlobalContext();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {

        if (banned) setOptions(allOptions['banned']);
        else if (member.status === 'Admin') setOptions(allOptions['regulerAdmin']);
        else setOptions(allOptions['regulerNotAdmin']);


        return (() => { setOptions([]) })
    }, [geust.lastSee, open]);

    const handleClose = async (e: any) => {
        if ('Make Group Admin' === e || 'Remove Group Admin' === e) {
            const result = await changeStatusAdmin(user.id, geust.id, member.userId);
            setGeust((preGeust: geustDto) => {
                return { ...preGeust, lastSee: preGeust.lastSee + 1 }
            });
        } else if ('ban from Group' === e || 'unban from Group' === e) {
            const result = await ChangeStatusBanned(user.id, geust.id, member.userId);
            setGeust((preGeust: geustDto) => {
                return { ...preGeust, lastSee: preGeust.lastSee + 1 }
            });
        } else if ('kick from Group' === e) {
            const result = await kickMember(user.id, geust.id, member.userId);
            setGeust((preGeust: geustDto) => {
                return { ...preGeust, lastSee: preGeust.lastSee + 1 }
            });
        }
        socket?.emit('updateData', {
            content: '',
            senderId: user.id,
            isDirectMessage: false,
            receivedId: geust.id,
        });
        setAnchorEl(null);
    };

    return (
        <div >
            <div onClick={handleClick} >  <MoreVertIcon /></div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option, index) => (
                    <div key={index} >
                        <MenuItem sx={{ fontSize: 16 }}
                            key={index} onClick={() => { handleClose(option) }}>
                            {option}
                        </MenuItem>
                    </div>
                ))}
            </Menu>
        </div>
    );
}