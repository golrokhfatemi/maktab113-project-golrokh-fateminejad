
// import {useLogin} from '../../hooks/useLogin'
// import Cookies from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

// export default function Login() {
//   // const [phone ,setPhone] = useState("")
//   // const [password ,setPassword] = useState("")
//   const {mutate , isPending} = useLogin()
//   const navigate = useNavigate()


//   const handleLogin =(e)=>{
  
//     e.preventDefault()
//     console.log("hi");
    
//     const values ={
//       name : e.target["username"]. value ,
//       password : e.target["password"].value
//     }
//     mutate(values ,{
//       onSuccess : (res) => {
//         console.log(res)
//         Cookies.set("accessToken" , res.data.access)
//         Cookies.set("refreshToken" , res.data.refresh)
//         navigate('/')
//       }
//     })
//   }
//   return (
//     <div className='flex justify-center items-center flex-col h-screen '>
//       Login
//       <form onSubmit={handleLogin} className='flex flex-col justify-center items-center gap-3 border-2 bg-sky-950 text-white p-10  w-96 rounded-3xl '>
//         <label>
//           username
//           </label>
//           <input className='bg-slate-200 rounded-md mx-4 p-2 w-full text-black' 
//           type='text' 
//           id="username" 
//           placeholder='Enter your username'
          
//           />
//         <label>
//           password
//           </label>
//           <input className='bg-slate-200 rounded-md mx-4 p-2 w-full text-black' 
//           type='password' 
//           placeholder='Enter your password'
//           id="password" 
          
//           />
//         <button type='submit' className='bg-slate-200 text-sky-950 px-3 py-1 rounded-md'>
//           {
//             isPending ? "Loading..." : "Login"
//           }
//         </button>

//       </form>
//     </div>
//   )
// }
