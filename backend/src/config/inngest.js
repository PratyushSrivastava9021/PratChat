import { Inngest } from "inngest";
import { connectDB } from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "pratchat" });

const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event:"clerk/user.created"},
    async ({event}) => {
        await connectDB();
        const {id, email_addresses, first_name, last_name,imageUrl} = event.data;
        
        const newUser = {
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            image: imageUrl
        }

        await User.create(newUser);
    }
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user"},
    {event:"clerk/user.deleted"},
    async ({event}) => {
        const {id} = event.data;
        await User.deleteOne({clerkId: id});
        await deleteStreamUser(id.toString());
    }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];