"use server"


import { db } from "..";
import { posts } from "../schema";
import {eq} from "drizzle-orm";

export async function deletePost(postId: string) { 
    if(!db){
         return { success: false, error: "Database is not configured" };
    }
   
    try{
        await db.delete(posts).where(eq(posts.id, postId));
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }

} 