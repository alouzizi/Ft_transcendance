import { Text, Avatar, Flex } from '@radix-ui/themes';
import { ThreeDots } from 'react-loader-spinner'
import { BsCheck2, BsCheck2All } from "react-icons/bs";

export function extractHoursAndM(time: number): string {

    const dt = new Date(time);
    const hours = dt.getHours().toString().padStart(2, '0');
    const minutes = dt.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function IsTypingMsg() {
    const cardStyles = {
        width: 50,
        borderRadius: 20,
        boxShadow: 'none',
        background: "#ddfdfd",
    };
    return (
        <div style={cardStyles} className='flex  items-center justify-center mt-2 ml-8'>
            <ThreeDots
                height="30"
                width="30"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                visible={true}
            />
        </div>
    );
}

export function MessageRight({ message }: { message: messageDto }) {
    const cardStyles = {
        width: 200,
        borderTopRightRadius: 0,
        padding: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 'auto',
        background: "#ddfdfd",
    };
    return (
        <div style={cardStyles} className='relative mb-2 mt-2'>
            <div className='mb-4 text-sm'> {message.contentMsg}</div>
            <Flex className='absolute bottom-1 right-2 mt-2 items-end'>
                <Text size="1" className='pr-1'>
                    {extractHoursAndM(message.createdAt)}
                </Text>
                {message.messageStatus === 'NotReceived' ?
                    <BsCheck2 /> :
                    <BsCheck2All />}
            </Flex>
        </div>
    );
}

export function MessageLeft({ message }: { message: messageDto }) {
    const cardStyles = {
        width: 200,
        borderTopRightRadius: 10,
        padding: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        background: "#ffffff",

    };

    return (
        <div className='flex'>
            <Avatar
                size="1"
                src={message.senderPic}
                radius="full"
                fallback="T"
            />
            <div className='pl-2'>
                <Text as="span" size="2" weight="bold">
                    {message.senderName}
                </Text>
                <div style={cardStyles} className='relative'>
                    <div className='mb-4  text-sm'> {message.contentMsg}</div>
                    <Text size="1" className='absolute bottom-1 right-2 mt-2'>
                        {extractHoursAndM(message.createdAt)}
                    </Text>
                </div>
            </div>
        </div>
    );
}

let lastPrint: number = 0;
function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}
function formatDateOnly(currentDate: number, inputDateString: number): string {
    const inputDate = new Date(inputDateString);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    if (isSameDay(new Date(currentDate), new Date(inputDateString)))
        return 'today';

    return `${year}-${month}-${day}`;
}

function showDays(currentDate: number, timeMsg: number) {

    const dt = new Date(timeMsg);
    const dt_zero = new Date(formatDateOnly(0, timeMsg));
    const dt_fixTime = new Date(lastPrint);


    const difference = dt_fixTime.getTime() - dt_zero.getTime();
    if (lastPrint === 0) {
        lastPrint = dt_zero.getTime() + 86400000;
        return { show: true, data: formatDateOnly(currentDate, timeMsg) };
    }

    if (difference <= 0) {
        lastPrint = dt_zero.getTime() + 86400000;
        return { show: true, data: `${formatDateOnly(currentDate, timeMsg)}` };
    }
    return { show: false, data: '' };
}

// 
// 
export function FirstMessage({ message, isOwner }: { message: messageDto, isOwner: Boolean }) {
    const cardStyles = {
        width: 200,
        padding: 5,
        borderRadius: 10,
        margin: 'auto',
        background: "#fefae0",
        display: 'flex', // Use flex display
        alignItems: 'center',
    };
    return (
        <div style={cardStyles} className='mb-2 mt-2'>
            <Text className='mb-4 text-sm text-center'>
                {isOwner ?
                    <Text>You created group</Text> :
                    <Text>{message.senderName} created group</Text>}
                {' '}"{message.receivedName}"
            </Text>
        </div>
    );
}

export function ShowMessages({ messages, user }: { messages: messageDto[], user: ownerDto }) {
    const currentDate = Date.now();
    lastPrint = 0;
    return messages.map((elm, index) => {
        const temp = showDays(currentDate, elm.createdAt);
        const tag =
            <div key={index}>
                {
                    temp.show ?
                        (
                            <div className="flex items-center pt-2 pb-2">
                                <div className="flex-grow h-px bg-gray-400 mx-4"></div>
                                <h2 className="text-sm">{temp.data}</h2>
                                <div className="flex-grow h-px bg-gray-400 mx-4"></div>
                            </div>
                        )
                        : (<></>)
                }

                {
                    (index === 0 && !elm.isDirectMsg) ?
                        <FirstMessage message={elm} isOwner={elm.OwnerChannelId === user.id} />
                        : ((elm.senderId == user.id) ? (
                            <MessageRight message={elm} />
                        ) : (
                            <MessageLeft message={elm} />
                        ))
                }
            </div>
        return tag;
    })

}