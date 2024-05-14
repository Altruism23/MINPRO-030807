import { FaCompactDisc, FaMasksTheater } from "react-icons/fa6";
import { GiConsoleController, GiOldMicrophone } from "react-icons/gi";

export default function Buble() {
    return (
        <div>
            <div className="flex-col sm:justify-between md:justify-center xl:justify-center xl:items-center">
                <button>
                    <div className="border bg-orange-700 w-32 h-32 flex flex-col
            justify-center items-center rounded-full mx-5">
                        <GiOldMicrophone className="h-10 w-10" />
                        <p className="mt-2">
                            music
                        </p>
                    </div>
                </button>
                <button>
                    <div className="border bg-orange-700 w-32 h-32 flex flex-col
            justify-center items-center rounded-full mx-5">
                        <FaCompactDisc className="h-10 w-10" />
                        <p className="mt-2">
                            nigh life
                        </p>
                    </div>
                </button>
                <button>
                    <div className="border bg-orange-700 w-32 h-32 flex flex-col
            justify-center items-center rounded-full mx-5">
                        <FaMasksTheater className="h-10 w-10" />
                        <p className="mt-2">
                            performing art
                        </p>
                    </div>
                </button>
                <button>
                    <div className="border bg-orange-700 w-32 h-32 flex flex-col
            justify-center items-center rounded-full mx-5">
                        <GiConsoleController className="h-10 w-10" />
                        <p className="mt-2">
                            hobbies
                        </p>
                    </div>
                </button>
            </div>
        </div>
    )
}