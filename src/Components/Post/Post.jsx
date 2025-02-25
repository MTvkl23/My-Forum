import { FaReplyAll } from "react-icons/fa6";
import { AppContext } from "../../App";
import { useContext } from "react";

function Post({ id, profile, sender, content, reply }) {
    const { setReplyKeeper, setReplyIdKeeper, senderKeeper, theme } = useContext(AppContext);
    let senderFlag = (sender === senderKeeper);

    return (
        <div className={`w-full relative flex ${(senderFlag) ? "flex-row mr-auto" : "flex-row-reverse ml-auto"} my-1 justify-between items-start`} style={{ maxWidth: "80%" }}>
            {(profile) &&
                <div className={`w-12 h-12 mt-1 absolute ${(senderFlag) ? "left-0 text-orange-100 bg-orange-400" : "right-0 text-blue-100 bg-blue-400"} top-0 flex justify-center items-center text-2xl font-bold rounded-full cursor-pointer`}>{sender[0].toUpperCase()}</div>}
            <div className={`p-2 flex flex-col ${(senderFlag) ? `ml-auto ${theme?"bg-slate-100 border-slate-200":"bg-slate-600 border-slate-500"}` : `mr-auto ${theme?"bg-blue-100 border-blue-200":"bg-slate-400 border-slate-300"}`} justify-center items-start border-[1px] rounded-lg`} style={{ width: "calc(100% - 6rem)" }}>
                {reply}
                <p className={`max-w-full text-sm ${theme?"text-slate-600":"text-slate-200"} break-words whitespace-pre-wrap`}>{content}</p>
            </div>
            <div onClick={() => { setReplyKeeper(content); setReplyIdKeeper(id); }} className={`w-8 h-8 my-auto ${(senderFlag) ? "ml-2" : "mr-2"} flex justify-center items-center ${theme?"bg-slate-600 hover:bg-slate-700 hover:border-slate-600":"bg-slate-200 hover:bg-slate-300 hover:border-slate-400"} hover:border-2 rounded-full cursor-pointer`}>
                <FaReplyAll className={`w-4 h-4 ${theme?"text-slate-100":"text-slate-800"}`} />
            </div>
        </div>
    );
}

export default Post;