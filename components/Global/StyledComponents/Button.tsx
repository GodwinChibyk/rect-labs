import tw from "tailwind-styled-components"

interface ButtonProps {
    $primary: boolean,
    className?: string
 }
 
 export const Button = tw.button<ButtonProps>`
     flex justify-center items-center rounded-lg
     ${(p:ButtonProps) => (p.$primary ? "bg-primaryColor" : "bg-gray-300 hover:bg-gray-300/80")}
 `