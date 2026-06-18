import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <div className="relative flex items-center justify-center bg-primary-400 text-slate-900 p-1 rounded-xl shadow-sm border-2 border-slate-900 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
        <Image
          src="/imgs/logo.png"
          alt="Rich Cavagnaro Logo"
          width={40}
          height={40}
        />{" "}
      </div>
      <div className="flex flex-col leading-none mt-1">
        <span className="font-display font-black text-2xl tracking-tighter">
          Rich <span className="text-secondary-600">Cavagnaro</span>
        </span>
      </div>
    </Link>
  );
}
