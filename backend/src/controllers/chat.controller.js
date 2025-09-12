import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async  (req, res) => {
    try{
        const token = await generateStreamToken(req.auth().userId);

        res.status(200).json({token});
    }catch(error){
        console.log("Error getting Stream token:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}