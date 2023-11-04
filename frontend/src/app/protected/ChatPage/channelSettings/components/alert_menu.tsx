'use client';

import { useGlobalContext } from '@/app/context/store';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { changeStatusAdmin, kickMember } from '../../api/fetch-channel';

const options1 = [
    'Make Group Admin',
    'kick from Group',
    'ban from Group',
    'Mute'
];
const options2 = [
    'Remove Group Admin',
    'kick from Group',
    'ban from Group',
    'Mute'
];

const ITEM_HEIGHT = 48;

export default function LongMenu({ member }: { member: memberChannelDto }) {
    const [options, setOptions] = React.useState<string[]>([]);
    const { geust, user, setGeust } = useGlobalContext();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {
        console.log(member);
        if (member.status === 'Admin') setOptions(options2);
        else setOptions(options1);
        return (() => { setOptions([]) })
    }, [geust.lastSee, open]);

    const handleClose = async (e: any) => {
        if (options[0] === e) {
            const result = await changeStatusAdmin(user.id, geust.id, member.userId);
            setGeust((preGeust: geustDto) => {
                return { ...preGeust, lastSee: preGeust.lastSee + 1 }
            });
        } else if (options[1] === e) {
            const result = await kickMember(user.id, geust.id, member.userId);
            setGeust((preGeust: geustDto) => {
                return { ...preGeust, lastSee: preGeust.lastSee + 1 }
            });
        }
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
                    <div   >
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