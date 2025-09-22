import { Button } from "@/components/ui/button"

interface SignInButtonProps {
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export default function SignInButton({ onClick, disabled, children }: SignInButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled} className="w-full">
      {children || "Sign in"}
    </Button>
  )
}
