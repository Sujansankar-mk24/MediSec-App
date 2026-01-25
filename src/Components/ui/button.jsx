import { cn } from "../../lib/utils";

export function Button({ children, onClick, variant = "primary", className, size = "lg" }) {
  const variants = {
    primary: "bg-[#0fabc0] hover:bg-[#0d97aa] text-white",
    outline: "border-2 border-[#0fabc0] text-[#0fabc0] hover:bg-[#0fabc0]/10",
    danger: "bg-[#890909] hover:bg-[#700707] text-white",
  };

  // NEW: Larger sizing classes
  const sizes = {
    md: "px-6 py-2.5 text-base",
    lg: "px-12 py-5 text-2xl", // Significant size increase
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-[30px] font-black uppercase italic transition-all duration-200 active:scale-95 shadow-xl hover:shadow-2xl tracking-wider",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}