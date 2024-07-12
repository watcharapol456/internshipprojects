"use clinet"
import { Card, CardContent,CardHeader,CardFooter } from "@/components/ui/card";
import { Header } from "./header";
import { BackButton } from "./backbutton";

interface CardWrapperProps{
    children : React.ReactNode;
    headerLabel : string;
    backButtonLabel:string;
    backButtonHref:string;
   
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,

}:CardWrapperProps) =>{
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headerLabel}></Header>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
          <CardFooter>
            <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
          </CardFooter>
        </Card>
    )
}