const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-amber-900">
      <div className="w-10 h-10 bg-gray-400 rounded-full"></div>

      <ul className="flex gap-10 text-sm font-semibold">
        <li>MENU</li>
        <li>HISTORY</li>
      </ul>
    </nav>
  );
};

export default Navbar;