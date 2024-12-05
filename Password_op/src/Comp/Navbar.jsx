const Navbar = () => {
  return (
    <nav className="bg-neutral-900 text-white h-20 ">
      <div className="mycontainer flex justify-between items-center px-4 py-10 h-14">
        <div className="logo font-extrabold text-white text-2xl ">
          <span className="text-lime-600 font-bold text-5xl my-3 " > Dashboard</span>
        </div>

        <button className="text-white  bg-neutral-700 h-12   w-56 my-8 rounded-full flex justify-center items-center ">
          <img className="invert w-12 p-1" src="./git.png" />
          <span className="font-bold px-2 text-xl  ">Github</span>
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
