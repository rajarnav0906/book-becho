// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";
// import { Card, CardContent } from "@/components/ui/card";
// import { CheckCircle } from "lucide-react";

// const steps = [
//   { title: "Sign Up", description: "Create an account to get started.", image: "/images/signup.png" },
//   { title: "Verify Email", description: "Confirm your email address.", image: "/images/verify.png" },
//   { title: "Set Profile", description: "Customize your profile settings.", image: "/images/profile.png" },
// ];

// const AuthStepsSlider = () => {
//   return (
//     <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="w-full max-w-lg">
//       {steps.map((step, index) => (
//         <SwiperSlide key={index}>
//           <Card className="p-4 flex flex-col items-center shadow-xl rounded-2xl">
//             <img src={step.image} alt={step.title} className="w-32 h-32 object-cover rounded-lg" />
//             <CardContent className="text-center mt-4">
//               <h3 className="text-lg font-bold flex items-center gap-2">
//                 <CheckCircle className="text-green-500" size={20} /> {step.title}
//               </h3>
//               <p className="text-gray-600 mt-2">{step.description}</p>
//             </CardContent>
//           </Card>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default AuthStepsSlider;
