'use client';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
  children?: React.ReactNode;
}

const BackButton = ({ 
  variant = "outline", 
  className = "flex items-center gap-2",
  children = (
    <>
      <ArrowLeft className="h-4 w-4" />
      Back to Catalog
    </>
  )
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button 
      variant={variant}
      className={className}
      onClick={() => router.back()}
    >
      {children}
    </Button>
  );
};

export default BackButton;
