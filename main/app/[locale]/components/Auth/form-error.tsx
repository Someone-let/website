import { AlertCircle } from "lucide-react";


export const FormError = ({message} : {message: string}) => {
    if(!message) return null;

    return(
        <div className="bg-destructive text-secondary-foreground p-3 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}