import HomeNav from "./components/HomeNav";

export default function Home() {
  return (
    <div className="w-screen flex flex-col items-center gap-3">
      <div className="w-full min-h-screen lg:w-[40vw] flex flex-col items-center border-x-1 border-zinc-800">
        <HomeNav/>
        <div>
          Real stuff
        </div>
      </div>
    </div>
  );
}
