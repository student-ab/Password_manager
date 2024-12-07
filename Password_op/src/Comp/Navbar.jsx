const Navbar = () => {
  return (
    <nav className="bg-neutral-900 text-white h-20 ">
      <div className="mycontainer flex justify-between items-center px-4 py-10 h-16">
        <div className="logo font-extrabold text-white flex ">
          <span className="text-5xl text-blue-300  ml-3 " >PASS</span>
          {/* <span className="text-lime-600 font-bold text-5xl my-3 " > Dashboard</span> */}
         <span> <img src="/icons/lock.png" alt="" className="mx-3" width={51} height={48} /></span>
        </div>

        <button className="text-white  bg-neutral-700 h-12   w-56 my-8 rounded-full flex justify-center items-center ">
          <img className="invert w-12 p-1" src="/icons/git.png" />
          <span className="font-bold px-2 text-xl  "> <a href="https://github.com/student-ab/Password_manager" target="_blank" >Github</a> </span>
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
