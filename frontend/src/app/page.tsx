import LoginComponent from '@/components/LoginComponent';
import RegistrationComponent from '../components/RegistrationComponent';
import EditProfile from '@/components/EditProfile';


export default function Home() {
  return (
    <div className='h-screen flex items-center justify-center'>
    {/* <RegistrationComponent /> */}
    {/* <LoginComponent/> */}
    <EditProfile/>
   </div>
  )
}
