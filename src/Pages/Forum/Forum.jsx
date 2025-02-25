import { useState, useEffect, useRef, useContext } from "react";
import Post from "../../Components/Post/Post";
import { BiSolidSend } from "react-icons/bi";
import { AppContext } from "../../App";
import { FaReplyAll } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Forum() {
    const { replyKeeper, setReplyKeeper, replyIdKeeper, setReplyIdKeeper, senderKeeper, theme, setTheme } = useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");
    const postsContainerRef = useRef(null);
    const inputRef = useRef(null);
    const postRefs = useRef([]);
    const navigate = useNavigate();
    let previousSender = "";

    const onSendClick = () => {
        if (input.trim() === "") return;
        const newPost = { id: Date.now(), replyId: replyIdKeeper, sender: senderKeeper, content: input, reply: replyKeeper };
        setPosts(prevPosts => {
            const updatedPosts = [...prevPosts, newPost];
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
            return updatedPosts;
        });
        setInput("");
        setReplyKeeper("");
        setReplyIdKeeper(0);
    };

    const onInputEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onSendClick();
        }
    };

    const handleReplyClick = (replyId) => {
        const postElement = postRefs.current.find(ref => ref && ref.id === String(replyId));
        if (postElement) {
            postElement.scrollIntoView({ behavior: "smooth", block: "center" });
            postElement.style.borderRadius = "0.5rem";
            postElement.style.backgroundColor = "oklch(0.929 0.013 255.508)";
        }

        setTimeout(() => {
            postElement.style.backgroundColor = "";
        }, 1500);
    };

    useEffect(() => {
        const savedPosts = (localStorage.getItem("posts")) ? JSON.parse(localStorage.getItem("posts")) : [];
        setPosts(savedPosts);
        const savedTheme = localStorage.getItem("theme");
        setTheme(savedTheme ? JSON.parse(savedTheme) : true);
        if (!senderKeeper) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);


    useEffect(() => {
        if (postsContainerRef.current) {
            postsContainerRef.current.scrollTop = postsContainerRef.current.scrollHeight;
        }
    }, [posts]);

    useEffect(() => {
        if (inputRef.current && replyKeeper) {
            inputRef.current.focus();
        }
    }, [replyKeeper])

    return (
        <div className={`w-screen h-screen flex flex-col justify-center items-center bg-slate-300`}>
            <div className={`w-[32rem] h-[37rem] ${theme ? "bg-white" : "bg-slate-700"} border-[1px] border-slate-500 rounded-lg overflow-hidden`}>
                <div className={`w-full h-20 px-6 flex flex-row justify-start items-center ${theme ? "bg-slate-600" : "bg-slate-800"}`}>
                    <div className={`w-12 h-12 text-orange-100 bg-orange-400 flex justify-center items-center text-2xl font-bold rounded-full cursor-pointer`}>{senderKeeper[0]?.toUpperCase()}</div>
                    <h2 className="text-xl ml-2 text-slate-100">{senderKeeper}</h2>
                    {(theme)
                        ? <IoMoon onClick={() => { setTheme(false) }} className="w-11 h-11 p-2 ml-auto text-xs text-slate-100 cursor-pointer" />
                        : <IoSunny onClick={() => { setTheme(true) }} className="w-11 h-11 p-2 ml-auto text-xs text-slate-100 cursor-pointer" />
                    }
                </div>
                <div ref={postsContainerRef} className="w-full flex flex-col items-center h-[28rem] p-4 overflow-y-auto">
                    {(posts.length === 0) && (<p className="inline px-2 py-[0.15rem] mx-auto bg-slate-200 border-2 border-slate-300 text-sm text-center text-slate-400 rounded-lg">Start a new chat!</p>)}
                    {posts.map((post, index) => {
                        let isNewSender = post.sender !== previousSender;
                        if (isNewSender) {
                            previousSender = post.sender;
                        }

                        return (
                            <div className="w-full"
                                key={index}
                                ref={element => postRefs.current[index] = element}
                                id={String(post.id)}
                            >
                                <Post
                                    id={post.id}
                                    profile={isNewSender}
                                    sender={post.sender}
                                    content={post.content}
                                    reply={post.reply && (
                                        <div
                                            className={`w-full flex p-1 mb-2 ${theme ? "bg-white border-l-slate-400 hover:bg-slate-50" : "bg-slate-300 border-l-slate-700 hover:bg-slate-200"} border-l-4 rounded-md cursor-pointer`}
                                            onClick={() => handleReplyClick(post.replyId)}
                                        >
                                            <FaReplyAll className={`w-4 h-4 mr-[0.3rem] ${theme ? "text-slate-400" : "text-slate-700"}`} />
                                            <p className={`w-11/12 text-xs truncate  ${theme ? "text-slate-400" : "text-slate-700"}`}>{post.reply}</p>
                                        </div>
                                    )}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className={`w-full h-16 relative p-3 flex justify-between items-center ${theme ? "bg-slate-400" : "bg-slate-600"}`}>
                    <div className={`${(!replyKeeper) && "hidden"} ${theme ? "bg-white border-l-slate-400" : "bg-slate-300 border-l-slate-700"} w-full absolute -top-6 left-0 flex p-1 border-t-[1px] border-t-slate-600 border-l-4`}>
                        <FaReplyAll className={`w-4 h-4 mr-[0.3rem] ${theme ? "text-slate-400" : "text-slate-800"}`} />
                        <p className={`w-10/12 text-xs px-2 truncate ${theme ? "text-slate-400" : "text-slate-800"}`}>{replyKeeper}</p>
                        <MdCancel onClick={() => { setReplyKeeper("") }} className={`w-4 h-4 ml-auto ${theme ? "text-slate-400 hover:text-slate-500" : "text-slate-800 hover:text-slate-700"} cursor-pointer`} />
                    </div>
                    <input ref={inputRef} onKeyDown={onInputEnter} value={input} placeholder="message..." onChange={(event) => { setInput(event.target.value) }} className="h-10 px-3 text-sm outline-none bg-slate-100 border-[1px] border-slate-500 focus:bg-slate-200 focus:border-[2px] focus:border-slate-600 rounded-lg" style={{ width: "calc(100% - 3rem)", }} />
                    <button onClick={onSendClick} className={`w-10 h-10 flex justify-center items-center rounded-lg ${theme ? "bg-slate-600 hover:bg-slate-700 hover:border-slate-600" : "bg-slate-100 hover:bg-slate-200 hover:border-slate-300"}  hover:border-2`}>
                        <BiSolidSend className={`${theme ? "text-slate-100" : "text-slate-800"}`} />
                    </button>
                </div>
            </div>
            <p className="mt-1 text-xs text-slate-600 font-light">Created by MTvkl23</p>
        </div>
    )
}

export default Forum;