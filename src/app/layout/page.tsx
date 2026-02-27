'use client';
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Header } from "@/app/layout/header"; // Assuming header is in this path
import { Footer } from "@/app/layout/footer"; // Assuming you have a footer

const queryClient = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="p-4 pb-24">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </div>
      <Footer />
    </>
  );
}