import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)
    return (
      <>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-gray-900 text-white rounded-lg shadow-lg p-6 w-[400px] relative">
            {/* Close Button */}
            <form method="dialog">
              <Link to = "/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-400 hover:text-white">✕</Link>
            </form>
  
            {/* Modal Header */}
            <h3 className="text-2xl font-semibold text-[#b6d07a] text-center">Login</h3>
            <p className="text-gray-400 text-center text-sm mt-1">Welcome back! Please log in to continue.</p>
  
            {/* Login Form */}
            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]" placeholder="Enter your email" {...register("email", { required: true })} />
                {errors.email && <span className="text-red-500 text-sm mt-1">This field is required</span>}
              </div>
  
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-[#b6d07a]" placeholder="Enter your password" {...register("password", { required: true })} />
                {errors.password && <span className="text-red-500 text-sm mt-1">This field is required</span>}
              </div>
  
              {/* Login Button */}
              <button type="submit" className="w-full bg-[#b6d07a] text-black font-semibold py-2 rounded-md hover:bg-[#a5c068] transition">
                Log In
              </button>
            </form>
  
            {/* Sign-Up Link */}
            <p className="text-sm mt-4 text-center">
              Don't have an account? <a href="/signup" className="text-[#b6d07a] hover:underline">Sign Up</a>
            </p>
          </div>
        </dialog>
      </>
    );
  };
  
  export default Login;