"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];

  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden rounded-lg shadow-lg border-gray-300 bg-white">
      {/* SHAPES BACKGROUND */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 opacity-30 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 opacity-20 rounded-full blur-xl"></div>
      <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-purple-500 opacity-25 rotate-45 skew-y-12"></div>

      <div className="flex flex-row items-center relative z-10">
        {/* TEKS PRODUK */}
        <CardContent className="w-1/2 p-8">
          <CardTitle
            className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text drop-shadow-lg animate-fadeIn"
          >
            {currentProduct.name}
          </CardTitle>
          {price && price.unit_amount && (
            <p className="text-2xl font-semibold text-gray-600 mt-2 animate-slideIn">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </CardContent>

        {/* GAMBAR PRODUK */}
        <div className="w-1/2 flex justify-center items-center relative">
          {currentProduct.images && currentProduct.images[0] && (
            <Image
              src={currentProduct.images[0]}
              alt={currentProduct.name}
              width={300}
              height={300}
              objectFit="contain"
              className="transition-transform duration-500 ease-in-out hover:scale-105"
            />
          )}
        </div>
      </div>
    </Card>
  );
};
