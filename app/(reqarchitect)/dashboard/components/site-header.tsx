import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SiteHeaderProps {
  title?: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
  buttonSize?: "sm" | "default" | "lg" | "icon";
  useOriginalButtonStyle?: boolean;
}

export function SiteHeader({
  title = "ReqArchitect Dashboard",
  buttonText = "Add Component",
  buttonIcon = <CirclePlus />,
  onButtonClick,
  buttonSize = "sm",
  useOriginalButtonStyle = false
}: SiteHeaderProps) {
  return (
    <header className="bg-background/90 sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {useOriginalButtonStyle ? (
            <Button size={buttonSize} onClick={onButtonClick}>
              {buttonIcon}
              <span>{buttonText}</span>
            </Button>
          ) : (
            <Button size="sm" className="hidden h-7 sm:flex" onClick={onButtonClick}>
              {buttonIcon}
              <span>{buttonText}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}