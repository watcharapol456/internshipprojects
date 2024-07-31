import { auth, signOut } from "@/auth";
import NewBlogForm from "@/components/blog/NewBlogFrom";
import { Button } from "@/components/ui/button";



const AddBlogPage = async () =>{
    const session = await auth();
    return (
        <div className="w-full">

            <NewBlogForm />

        
            <form action={async () =>{
                "use server";
                await signOut();
            }}>
                <div className="flex justify-center w-full mt-16">
                <Button type="submit" className="w-[450px] h-12 bg-red-500">
                   <h1 className="text-2xl">Sign out</h1> 
                </Button>
                </div>
                
            </form>


        </div>
    );
}

export default AddBlogPage