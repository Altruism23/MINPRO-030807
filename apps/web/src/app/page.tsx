import Buble from "@/components-home/buble";
import Card from "@/components-home/card";
import Descrip from "@/components-home/descrip";
import Navcrot from "@/components-home/navcrot";




export default function Page() {
  return (
    <div className="h-[200vh]">
      <div>
        <Navcrot />
      </div>
      <div className="flex justify-between items-end mx-2 bg-latar-pattern h-[60vh] my-5 mt-44"
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}>
        <p className="absolute top-72 font-extrabold text-3xl w-96 mx-10 ">
          Come to your event party
          From our to you
        </p>
        <button className="mb-20 mx-10 border w-80 flex
   rounded-xl h-20 hover:bg-orange-700
   justify-center items-center bg-orange-800 font-extrabold text-xl ">

          Find Yours Event
        </button>
        <div>
          {/* kosong karna pembagi */}
        </div>
        <img src="pict/logo.jpeg" alt="show" className="h-[60vh] sm:w-64 md:w-72 lg:w-80 xl:w-96  mt-2" />
      </div>
      <div>
        <Buble />
      </div>
      <div className="my-10">
        <Card />
      </div>
      <div>
        <Descrip/>
      </div>
    </div>
  )
}