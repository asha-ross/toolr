/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Add some tools with different owners (assuming you have a users table set up)
  await knex('tools').insert([
    {
      tool_name: 'Bosch Brushless 18V Hammer Drill',
      tool_owner: 'Janeway', // Replace with user name
      tool_owner_id: 1,
      description:
        'A powerful electric drill perfect for a variety of DIY projects.',
      image: '/images/Bosch Brushless 18V Hammer Drill.png',
      availability: true,
      category: 'Small Power Tools',
    },
    {
      tool_name: 'Ozito 1200W 305mm Lawn Mower',
      tool_owner: 'Chakotay', // Replace with user name
      tool_owner_id: 2,
      description: 'Battery-powered lawnmower for keeping your lawn tidy.',
      image: '/images/Ozito 1200W 305mm Lawn Mower.png',
      availability: false, // Set availability to false for a rented tool
      category: 'Yard & Garden',
    },
    {
      tool_name: 'Morrison 45cc Petrol Chainsaw',
      tool_owner: 'Seven of Nine', // Replace with user name
      tool_owner_id: 3,
      description:
        'A great all-rounder, this powerful 45cc chainsaw with 18" (450mm) bar and Oregon chain is ideal for pruning and felling small trees.',
      image: '/images/Morrison 45cc Petrol Chainsaw.png',
      availability: false,
      category: 'Outdoor Tools',
    },
    {
      tool_name: "Makita 18V LXT Cordless Impact Driver",
      tool_owner: "Paris",
      tool_owner_id: 4,
      description: "Lightweight impact driver with high torque for tough tasks.",
      image: "/images/Makita 18V LXT Cordless Impact Driver.png",
      availability: true,
      category: "Small Power Tools"
    },
    {
      tool_name: "Ryobi 2000W Electric Chainsaw",
      tool_owner: "Kim",
      tool_owner_id: 5,
      description: "Compact and easy to use, ideal for cutting branches and logs.",
      image: "/images/Ryobi 2000W Electric Chainsaw.png",
      availability: true,
      category: "Outdoor Tools"
    },
    {
      tool_name: "DeWalt 18V Cordless Circular Saw",
      tool_owner: "Tuvok",
      tool_owner_id: 6,
      description: "Powerful circular saw for fast and accurate cutting.",
      image: "/images/DeWalt 18V Cordless Circular Saw.png",
      availability: false,
      category: "Small Power Tools"
    },
    {
      tool_name: "Ozito 750W Angle Grinder",
      tool_owner: "Neelix",
      tool_owner_id: 7,
      description: "A versatile grinder for cutting, grinding, and polishing tasks.",
      image: "/images/Ozito 750W Angle Grinder.png",
      availability: true,
      category: "Small Power Tools"
    },
    {
      tool_name: "Worx 20V Cordless Leaf Blower",
      tool_owner: "The Doctor",
      tool_owner_id: 8,
      description: "Lightweight and efficient blower for clearing leaves and debris.",
      image: "/images/Worx 20V Cordless Leaf Blower.png",
      availability: false,
      category: "Yard & Garden"
    },
    {
      tool_name: "Stihl FS 55 Petrol Brush Cutter",
      tool_owner: "Janeway",
      tool_owner_id: 1,
      description: "Powerful petrol-powered brush cutter for tough garden tasks.",
      image: "/images/Stihl FS 55 Petrol Brush Cutter.png",
      availability: true,
      category: "Outdoor Tools"
    },
    {
      tool_name: "Bosch Advanced Hedge Trimmer",
      tool_owner: "Chakotay",
      tool_owner_id: 2,
      description: "Perfect for maintaining hedges with precision and ease.",
      image: "/images/Bosch Advanced Hedge Trimmer.png",
      availability: false,
      category: "Yard & Garden"
    },
    {
      tool_name: "Ozito 600W Corded Electric Planer",
      tool_owner: "Seven of Nine",
      tool_owner_id: 3,
      description: "Ideal for smooth planing and trimming edges of wooden surfaces.",
      image: "/images/Ozito 600W Corded Electric Planer.png",
      availability: true,
      category: "Carpentry Tools"
    },
    {
      tool_name: "Karcher High-Pressure Washer",
      tool_owner: "Paris",
      tool_owner_id: 4,
      description: "Efficient high-pressure washer for cleaning cars, driveways, and patios.",
      image: "/images/Karcher High-Pressure Washer.png",
      availability: false,
      category: "Cleaning Tools"
    },
    {
      tool_name: "Makita Cordless Jigsaw",
      tool_owner: "Kim",
      tool_owner_id: 5,
      description: "Portable jigsaw for intricate cutting tasks.",
      image: "/images/Makita Cordless Jigsaw.png",
      availability: true,
      category: "Carpentry Tools"
    },
    {
      tool_name: "Stanley 500W Corded Electric Drill",
      tool_owner: "Tuvok",
      tool_owner_id: 6,
      description: "Reliable drill for a variety of DIY tasks around the house.",
      image: "/images/Stanley 500W Corded Electric Drill.png",
      availability: true,
      category: "Small Power Tools"
    },
    {
      tool_name: "Ozito 1800W Electric Line Trimmer",
      tool_owner: "Neelix",
      tool_owner_id: 7,
      description: "Powerful line trimmer for trimming grass and light brush.",
      image: "/images/Ozito 1800W Electric Line Trimmer.png",
      availability: false,
      category: "Yard & Garden"
    },
    {
      tool_name: "Bosch 18V Cordless Multi-Tool",
      tool_owner: "The Doctor",
      tool_owner_id: 8,
      description: "Versatile tool for sanding, cutting, and grinding.",
      image: "/images/Bosch 18V Cordless Multi-Tool.png",
      availability: true,
      category: "Multi-Tools"
    },
    {
      tool_name: "DeWalt 240V Corded Hammer Drill",
      tool_owner: "Janeway",
      tool_owner_id: 1,
      description: "Durable hammer drill for drilling into concrete and masonry.",
      image: "/images/DeWalt 240V Corded Hammer Drill.png",
      availability: false,
      category: "Heavy Power Tools"
    },
    {
      tool_name: "Stihl MS 180 Petrol Chainsaw",
      tool_owner: "Chakotay",
      tool_owner_id: 2,
      description: "Compact chainsaw suitable for felling small trees and cutting firewood.",
      image: "/images/Stihl MS 180 Petrol Chainsaw.png",
      availability: true,
      category: "Outdoor Tools"
    },
    {
      tool_name: "Ryobi 18V Cordless Lawnmower",
      tool_owner: "Seven of Nine",
      tool_owner_id: 3,
      description: "Efficient cordless lawnmower for medium-sized lawns.",
      image: "/images/Ryobi 18V Cordless Lawnmower.png",
      availability: true,
      category: "Yard & Garden"
    },
    {
      tool_name: "Makita 18V Cordless Angle Grinder",
      tool_owner: "Paris",
      tool_owner_id: 4,
      description: "Cordless angle grinder for cutting and grinding in tight spaces.",
      image: "/images/Makita 18V Cordless Angle Grinder.png",
      availability: false,
      category: "Small Power Tools"
    },
    {
      tool_name: "Black & Decker Cordless Hedge Trimmer",
      tool_owner: "Kim",
      tool_owner_id: 5,
      description: "Cordless hedge trimmer for shaping and maintaining your hedges.",
      image: "/images/Black & Decker Cordless Hedge Trimmer.png",
      availability: true,
      category: "Yard & Garden"
    },
    {
      tool_name: "Ryobi 18V One+ Cordless Blower",
      tool_owner: "Tuvok",
      tool_owner_id: 6,
      description: "Lightweight and powerful blower for clearing leaves and debris.",
      image: "/images/Ryobi 18V One+ Cordless Blower.png",
      availability: true,
      category: "Yard & Garden"
    },
    {
      tool_name: "Bosch Rotary Hammer Drill",
      tool_owner: "Neelix",
      tool_owner_id: 7,
      description: "Heavy-duty rotary hammer drill for masonry and concrete work.",
      image: "/images/Bosch Rotary Hammer Drill.png",
      availability: false,
      category: "Heavy Power Tools"
    }
    
  ])
}
