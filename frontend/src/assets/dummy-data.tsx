import {
  UploadCloudIcon,
  SparklesIcon,
  SlidersHorizontalIcon
} from "lucide-react";

export const featuresData = [
  {
    icon: <UploadCloudIcon className="w-6 h-6" />,
    title: "Upload Your Content",
    desc: "Upload an image or enter your video title and niche so the AI understands your content."
  },
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    title: "Standout Thumbnails",
    desc: "Create bright, high-impact designs that grab attention instantly."
  },
  {
    icon: <SlidersHorizontalIcon className="w-6 h-6" />,
    title: "Complete Customization",
    desc: "Receive fully editable layers so you can fine-tune every detail."
  }
];

export const plansData = [
  {
    name: "Starter",
    price: "₹0",
    credits: "10 thumbnails / month",
    desc: "Perfect for beginners testing AI-powered thumbnail generation.",
    features: [
      "AI thumbnail generation",
      "Basic thumbnail templates",
      "Standard resolution exports",
      "Community support"
    ],
    popular: false
  },
  {
    name: "Creator",
    price: "₹499",
    credits: "100 thumbnails / month",
    desc: "Best for YouTubers and content creators growing their channel.",
    features: [
      "Advanced AI thumbnail generation",
      "High-contrast, click-optimized designs",
      "Full customization & layered exports",
      "Priority generation speed",
      "Email support"
    ],
    popular: true
  },
  {
    name: "Pro",
    price: "₹999",
    credits: "Unlimited thumbnails",
    desc: "Built for agencies and professional creators at scale.",
    features: [
      "Unlimited AI thumbnails",
      "Premium thumbnail templates",
      "Ultra HD exports",
      "Brand presets & style saving",
      "Priority support"
    ],
    popular: false
  }
];

export const faqData = [
    {
        question: 'What is Thumbnail Generator AI?',
        answer: 'Thumbnail Generator AI uses artificial intelligence to create high-converting thumbnails for YouTube and social platforms.'
    },
    {
        question: 'Do I need design skills?',
        answer: 'No design skills are required. The AI handles everything and you can customize with a few clicks.'
    },
    {
        question: 'Which platforms are supported?',
        answer: 'You can generate thumbnails for YouTube, Instagram, Facebook ads, shorts, and reels.'
    },
    {
        question: 'Can I edit or regenerate thumbnails?',
        answer: 'Yes. You can regenerate, edit, and customize thumbnails before downloading.'
    }
];
export const footerLinks = [
    {
        title: "Product",
        links: [
            { name: "Features", url: "#" },
            { name: "Pricing", url: "#" },
            { name: "Templates", url: "#" },
            { name: "AI Generator", url: "#" }
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" }
        ]
    },
    {
        title: "Connect",
        links: [
            { name: "Twitter", url: "#" },
            { name: "LinkedIn", url: "#" },
            { name: "GitHub", url: "#" }
        ]
    }
];
export interface IUser{
  name:string;
  email:string;
  password?:string;
  createdAt?:Date;
  updatedAt?:Date;
}

export interface IThumbnail {
  _id: string;
  userId:string;
  title:string;
  description: string;
  style: "Bold& Graphics"| "Tech/Futuristic" | "Minimalist"| "Photorealistic" | "Illustrated";
  aspect_ratio?: "16:9" | "1:1" | "9:16";
  color_scheme?: "vibrant" | "sunset" | "forest" | "neon" | "purple" | "monochrome" | "ocean" | "pastel";
  text_overlay ?: boolean;
  image_url?: string;
  prompt_used?: string;
  user_prompt?: string;
  isGenerating?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  imageUrl: string;
}
