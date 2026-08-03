import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/[locale]/components/ui/card";
import Socials from "@/app/[locale]/components/Auth/socials";
import { BackButton } from "@/app/[locale]/components/Auth/back-button";

type CardWrapperProps = {
    children: React.ReactNode;
    cardTitle: string;
    backButtonHref: string;
    backButtonLabel: string;
    showSocial?: boolean;
}

export const AuthCard = ({
    children,
    cardTitle,
    backButtonHref,
    backButtonLabel,
    showSocial,

}: CardWrapperProps) => {
    return(
      <Card className="w-full max-w-[28rem]">
      <CardHeader>
        <CardTitle >{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter className="border-none">
            <Socials/>
        </CardFooter>
      )}
        <CardFooter className="border-none">
            <BackButton href={backButtonHref} label={backButtonLabel}/>
        </CardFooter>
        
    </Card>
    )
}