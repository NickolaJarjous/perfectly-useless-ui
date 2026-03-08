import { useState, useCallback, type FC } from "react";
import ItemNav from "./ItemNav";
import logo from "../../../assets/images/logo.svg";
import { Bell, ChevronDown } from "lucide-react";
import { useAppContext } from "../../../context/app/AppContext";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  items: { text: string; route: string }[];
}

const SELECTED_ROUTE = "/";

const NavBar: FC<NavBarProps> = ({ items: initialItems }) => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const [items, setItems] = useState(initialItems);

  const handleItemHover = useCallback((hoveredIndex: number) => {
    setItems((currentItems) => {
      // Find the selected item index
      const selectedIndex = currentItems.findIndex(
        (item) => item.route === SELECTED_ROUTE,
      );

      // Don't swap if hovering the selected item
      if (currentItems[hoveredIndex].route === SELECTED_ROUTE)
        return currentItems;

      const newItems = [...currentItems];
      // Swap hovered item with selected item
      [newItems[hoveredIndex], newItems[selectedIndex]] = [
        newItems[selectedIndex],
        newItems[hoveredIndex],
      ];

      return newItems;
    });
  }, []);

  return (
    <header className="fixed bg-card border-b border-border px-6 py-3 flex w-full items-center shadow-lg justify-between">
      <div className="flex items-center gap-6">
        <img src={logo} alt="Logo" className="h-12 object-cover" />
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {items.map((item, index) => (
            <ItemNav
              key={item.route}
              text={item.text}
              isSelected={item.route === SELECTED_ROUTE}
              onHover={() => handleItemHover(index)}
            />
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground">
          <Bell size={18} className="cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
            AH
          </div>
          <span className="hidden md:inline text-foreground font-medium">
            Dr. Adam
          </span>
          <ChevronDown
            size={14}
            className="text-muted-foreground cursor-pointer"
            onClick={() => {
              setUser(undefined);
              navigate("/login");
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
