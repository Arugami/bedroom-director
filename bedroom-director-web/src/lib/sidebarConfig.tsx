import { Film, Image, Mic, Music, Clock, Heart, TrendingUp, Sparkles, Bookmark, Star } from "lucide-react";
import { SidebarSection } from "@/components/layout/DirectorSidebar";

// Prompts Page - "Quick Draw" Mode
export const getPromptsSidebarConfig = (
  selectedCategory: string,
  sortBy: string,
  onCategoryChange: (category: string) => void,
  onSortChange: (sort: string) => void
): SidebarSection[] => {
  return [
    {
      title: "Categories",
      items: [
        {
          id: "all",
          label: "All Prompts",
          icon: <Sparkles className="w-5 h-5" />,
          onClick: () => onCategoryChange("all"),
          active: selectedCategory === "all",
        },
        {
          id: "video",
          label: "Video",
          icon: <Film className="w-5 h-5" />,
          onClick: () => onCategoryChange("video"),
          active: selectedCategory === "video",
          color: "text-bedroom-purple",
        },
        {
          id: "image",
          label: "Image",
          icon: <Image className="w-5 h-5" />,
          onClick: () => onCategoryChange("image"),
          active: selectedCategory === "image",
          color: "text-[#FF8C42]",
        },
        {
          id: "voice",
          label: "Voice",
          icon: <Mic className="w-5 h-5" />,
          onClick: () => onCategoryChange("voice"),
          active: selectedCategory === "voice",
          color: "text-[#00CED1]",
        },
        {
          id: "music",
          label: "Music",
          icon: <Music className="w-5 h-5" />,
          onClick: () => onCategoryChange("music"),
          active: selectedCategory === "music",
          color: "text-[#FCD34D]",
        },
      ],
    },
    {
      title: "Sort By",
      items: [
        {
          id: "newest",
          label: "Newest",
          icon: <Clock className="w-5 h-5" />,
          onClick: () => onSortChange("newest"),
          active: sortBy === "newest",
        },
        {
          id: "most-liked",
          label: "Most Liked",
          icon: <Heart className="w-5 h-5" />,
          onClick: () => onSortChange("most-liked"),
          active: sortBy === "most-liked",
        },
        {
          id: "most-viewed",
          label: "Trending",
          icon: <TrendingUp className="w-5 h-5" />,
          onClick: () => onSortChange("most-viewed"),
          active: sortBy === "most-viewed",
        },
      ],
    },
  ];
};

// Showcase Page - "Gallery" Mode
export const getShowcaseSidebarConfig = (
  selectedCategory: string,
  onCategoryChange: (category: string) => void
): SidebarSection[] => {
  return [
    {
      title: "Categories",
      items: [
        {
          id: "all",
          label: "All",
          icon: <Sparkles className="w-5 h-5" />,
          onClick: () => onCategoryChange("all"),
          active: selectedCategory === "all",
        },
        {
          id: "video",
          label: "Video",
          icon: <Film className="w-5 h-5" />,
          onClick: () => onCategoryChange("video"),
          active: selectedCategory === "video",
          color: "text-bedroom-purple",
        },
        {
          id: "image",
          label: "Image",
          icon: <Image className="w-5 h-5" />,
          onClick: () => onCategoryChange("image"),
          active: selectedCategory === "image",
          color: "text-[#FF8C42]",
        },
        {
          id: "voice",
          label: "Voice",
          icon: <Mic className="w-5 h-5" />,
          onClick: () => onCategoryChange("voice"),
          active: selectedCategory === "voice",
          color: "text-[#00CED1]",
        },
        {
          id: "music",
          label: "Music",
          icon: <Music className="w-5 h-5" />,
          onClick: () => onCategoryChange("music"),
          active: selectedCategory === "music",
          color: "text-[#FCD34D]",
        },
      ],
    },
    {
      title: "Quick Filters",
      items: [
        {
          id: "featured",
          label: "Featured",
          icon: <Star className="w-5 h-5" />,
          onClick: () => {}, // Will implement featured filter
          active: false,
          color: "text-[#FF8C42]",
        },
        {
          id: "bookmarked",
          label: "Bookmarked",
          icon: <Bookmark className="w-5 h-5" />,
          onClick: () => {}, // Will implement bookmarks later
          active: false,
        },
      ],
    },
  ];
};
