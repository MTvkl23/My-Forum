import { useContext, useState } from "react";
import { LuUsersRound } from "react-icons/lu";
import CommunicationImg from "../../Assets/Images/communication.jpg";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Login() {
    const { setSenderKeeper, theme} = useContext(AppContext);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const onLoginClick = () => {
        setSenderKeeper(input);
        navigate("/Forum");
    }

    const onInputEnter = (event) => {
        if (event.key === "Enter" && input) {
            event.preventDefault();
            onLoginClick();
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-300">
            <div className="w-[32rem] h-[25rem] flex flex-col bg-white border-[1px] border-slate-500 rounded-lg overflow-hidden">
                <div className="w-full h-64 py-2"><img className="w-full h-full object-contain" src={CommunicationImg} alt="communication" /></div>
                <div className={`w-full h-36 p-3 flex flex-col justify-between items-center ${theme?"bg-slate-400":"bg-slate-600"}`}>
                    <div className="w-full h-14 px-2 flex justify-between items-center outline-none bg-slate-100 border-[1px] border-slate-500 focus:bg-slate-200 focus:border-[2px] focus:border-slate-600 rounded-lg overflow-hidden">
                        <input onKeyDown={onInputEnter} value={input} placeholder="Username" onChange={(event) => { setInput(event.target.value) }} className="w-4/5 h-12 px-2 outline-none bg-slate-100" style={{ width: "calc(100% - 3rem)", }} />
                        <LuUsersRound className="w-10 h-10 p-2 text-slate-400" />
                    </div>
                    <button onClick={onLoginClick} disabled={!input} className={`w-full h-14 flex justify-center items-center text-slate-100 rounded-lg ${theme?"bg-slate-600 hover:bg-slate-700 hover:border-slate-600":"bg-slate-700 hover:bg-slate-800 hover:border-slate-700"} hover:border-2 ${(input) ? "cursor-pointer" : "cursor-not-allowed"}`}>
                        Login
                    </button>
                </div>
            </div>
            <p className="mt-1 text-xs text-slate-600 font-light">Created by MTvkl23</p>
        </div>
    )
}

export default Login;