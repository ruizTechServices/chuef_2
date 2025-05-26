"use client";
import React, { useState } from "react";
import {
  NavigationMenu as ShadNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "../../components/ui/navigation-menu";
import { Menu } from "lucide-react";

export default function NavigationMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleNavLinkClick() {
    setMobileMenuOpen(false);
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <span className="font-bold text-lg">Chuef</span>
        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <ShadNavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="px-3 py-2">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-3 py-2">About</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-3 py-2">Contact</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/chatbot" className="px-3 py-2">Chatbot</NavigationMenuLink>
              </NavigationMenuItem> 
            </NavigationMenuList>
          </ShadNavigationMenu>
        </div>
        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t animate-fade-in-down">
          <ShadNavigationMenu>
            <NavigationMenuList className="flex flex-col py-2">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="px-4 py-2 block w-full" onClick={handleNavLinkClick}>
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 block w-full" onClick={handleNavLinkClick}>
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 block w-full" onClick={handleNavLinkClick}>
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/chatbot" className="px-4 py-2 block w-full" onClick={handleNavLinkClick}>
                  Chatbot
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </ShadNavigationMenu>
        </div>
      )}
    </nav>
  );
}
