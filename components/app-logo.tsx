import Image from "next/image"
import { cn } from "@/lib/utils"

interface AppLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function AppLogo({ size = "md", className }: AppLogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  }

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center",
        "bg-gradient-to-r from-blue-500 to-blue-600",
        "shadow-lg shadow-blue-500/25",
        sizes[size],
        className,
      )}
    >
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3401741878062_.pic.jpg-NDpGjFLxuoYowkdXvIYbQh23PEyL59.jpeg"
        alt="YANYUZHINENG Logo"
        width={size === "lg" ? 60 : size === "md" ? 36 : 24}
        height={size === "lg" ? 60 : size === "md" ? 36 : 24}
        className="object-contain"
      />
      <div className="absolute inset-0 rounded-full bg-blue-400/20 backdrop-blur-sm"></div>
      <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
    </div>
  )
}
