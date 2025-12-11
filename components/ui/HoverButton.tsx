import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface HoverButtonProps {
  text?: string
  className?: string
  onClick?: () => void
}

export function HoverButton({ 
  text = "Contact Me",
  className,
  onClick
}: HoverButtonProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const buttonVariants = {
    idle: {
      backgroundColor: isDark ? "rgb(64, 64, 64)" : "rgb(243, 244, 246)",
      color: isDark ? "white" : "black",
      scale: 1,
    },
  }

  return (
    <div className="relative">
      <motion.button
        onClick={onClick}
        animate="idle"
        variants={buttonVariants}
        className={cn(
          "group relative grid overflow-hidden rounded-full px-6 py-2 transition-all duration-200",
          "shadow-[0_1000px_0_0_hsl(0_0%_85%)_inset] dark:shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset]",
          "hover:shadow-lg",
          className
        )}
        style={{ minWidth: "150px" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span
          className={cn(
            "spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full",
            "[mask:linear-gradient(black,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,black_360deg)]",
            "before:rotate-[-90deg] before:animate-rotate dark:before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]",
            "before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%] dark:[mask:linear-gradient(white,_transparent_50%)]",
          )}
        />
        <span
          className={cn(
            "backdrop absolute inset-px rounded-[22px] transition-colors duration-200",
            "bg-neutral-100 group-hover:bg-neutral-200 dark:bg-neutral-950 dark:group-hover:bg-neutral-900"
          )}
        />
        <span className="z-10 flex items-center justify-center gap-2 text-sm font-medium">
          {text}
        </span>
      </motion.button>
    </div>
  )
}
