import GitHub from "@/components/icons/GitHub";
import LinkedIn from "@/components/icons/LinkedIn";
import Email from "@/components/icons/Email";
import X from "@/components/icons/x";

export const GetIcons = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case "GitHub":
      return <GitHub />;
    case "LinkedIn":
      return <LinkedIn />;
    case "Email":
      return <Email />;
    case "X":
      return <X />;
    default:
      return null;
  }
};
