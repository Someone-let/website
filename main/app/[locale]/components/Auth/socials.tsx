'use client';

import { Button } from "@/app/[locale]/components/ui/button"
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Socials(){
    return(
        <div className="flex justify-center w-full">
            <Button className="w-full bg-[#fff] text-[#000000] rounded-[4px] border-gray-300 hover:text-white " onClick={() => signIn("google",  
            {
                
                callbackUrl: "/",})
                }>
                    <p>Sign in with Google</p>
                    <FcGoogle className="ml-1" size={20} />
                </Button>
        </div>
    )
}