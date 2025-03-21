"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full h-16 flex items-center z-50 transition-all duration-300 border-b border-gray-200 ${
          scrolling ? "bg-white shadow-lg" : "bg-white"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* LOGO */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="S-Mart Logo" width={40} height={40} />
              <span className="text-2xl font-bold text-blue-600">S-Mart</span>
            </div>
          </Link>

          {/* NAVIGATION LINKS */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Beranda", href: "/" },
              { name: "Produk", href: "/products" },
              { name: "Checkout", href: "/checkout" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CART & MOBILE MENU BUTTON */}
          <div className="flex items-center space-x-6">
            {/* KERANJANG */}
            <Link href="/checkout" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-all duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* HAMBURGER MENU */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Beri jarak agar konten tidak tertabrak navbar */}
      <div className="h-16"></div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md border-t border-gray-200">
          <ul className="flex flex-col p-4 space-y-2">
            {[
              { name: "Beranda", href: "/" },
              { name: "Produk", href: "/products" },
              { name: "Checkout", href: "/checkout" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 px-4 text-lg font-medium text-gray-700 hover:bg-blue-100 transition-all duration-300 rounded-lg"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};
