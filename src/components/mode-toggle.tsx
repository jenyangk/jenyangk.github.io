import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
        } else if (theme === 'light') {
            setTheme('dark')
        } else {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            setTheme(systemTheme === "dark" ? "light" : "dark")
        }
    }

    return (
        <Button
            variant="outline"
            size="icon"
            className="bg-bw border-border text-text hover:bg-main/90 hover:translate-x-0 hover:translate-y-0 hover:shadow-shadow"
            onClick={toggleTheme}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
