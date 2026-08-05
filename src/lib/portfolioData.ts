export enum ProjectCategory {
  Software = 'Software',
  Hardware = 'Hardware',
  // Electrical = 'Electrical',
  // Random = 'Random',
}

export const portfolioItems: {
  title: string
  description: string
  imageUrl: string
  link: string
  category: ProjectCategory
  date?: string
}[] = [
    {
      title: "Art Theives",
      description: "React Native application developed using Expo with an Express.js backend",
      imageUrl: "/images/projects/art_thieves.png", 
      link: "https://github.com/Lo3wer/art-thieves", 
      category: ProjectCategory.Software, 
      date: "August 2026" 
    },
    { 
      title: "Lox Interpreters Rust", 
      description: "Treewalk interpreter and bytecode virtual machine written in Rust", 
      imageUrl: "/images/projects/crafting-interpreters.png", 
      link: "https://github.com/Lo3wer/lox-interpreters-rust", 
      category: ProjectCategory.Software, 
      date: "July 2026"
    },
    {
      title: "Tiny Renderer",
      description: "Graphics rasterizer written in C++",
      imageUrl: "/images/projects/rasterizer.png",
      link: "https://github.com/Lo3wer/TinyRendererClass",
      category: ProjectCategory.Software,
      date: "January 2026"
    },
    { 
      title: "Chip-8 Emulator", 
      description: "IBM Chip-8 emulator written in C, and displayed with SDL", 
      imageUrl: "/images/projects/chip-8_ibm_logo.png", 
      link: "https://github.com/Lo3wer/chip-8", 
      category: ProjectCategory.Software, 
      date: "December 2025" 
    },
    { 
      title: "NewsMapper", 
      description: "Next.js website with Springboot backend. NWHacks 2025", 
      imageUrl: "/images/projects/newsmapper.png", 
      link: "https://devpost.com/software/news-mapper", 
      category: ProjectCategory.Software, 
      date: "January 2025" 
    },
    { 
      title: "Pantry Patrol", 
      description: "Java Swing application with Springboot backend. CPEN221A Group Project", 
      imageUrl: "/images/projects/pantry_patrol_otherpage.png", 
      link: "https://github.com/u759/PantryPatrol", 
      category: ProjectCategory.Software, 
      date: "December 2024" 
    },
    { title: "Verilog RISC Processor", 
      description: "16-bit RISC processor on DE1-SOC FPGA written in System Verilog. CPEN211 Lab", 
      imageUrl: "/images/projects/de1soc.jpg", 
      link: "https://github.com/Lo3wer/cpen211-risc-cpu", 
      category: ProjectCategory.Hardware, 
      date: "December 2024" 
    },
  ];
