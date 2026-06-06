export interface ProjectAmenity {
  name: string;
  icon: string; // Will map to a Lucide icon key
}

export interface ProjectDetailItem {
  label: string;
  value: string;
}

export interface NearbyPlace {
  place: string;
  distance: string;
}

export interface ProjectData {
  slug: string;
  name: string;
  category: string;
  status: string;
  locationName: string;
  googleMapUrl: string; // Iframe src URL
  googleMapExternalUrl?: string; // Short or direct URL to open in external browser
  contactNumber: string;
  tagline: string;
  description: string;
  visionTitle?: string;
  heroImage: string;
  galleryImages: string[];
  details: ProjectDetailItem[];
  amenities: ProjectAmenity[];
  amenitiesSubtitle?: string;
  nearbyPlaces: NearbyPlace[];
}

export const duplexProject: ProjectData = {
  slug: "duplex-shree-haricity",
  name: "Shreehari City",
  category: "Duplex",
  status: "Available / Ready to Move",
  locationName: "722, Malatipatpur Rd, Chandanpur, Odisha 752012",
  googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.243545199679!2d85.8361099!3d19.8398436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19c7dc576ce189%3A0x34dd09d1bf4855f6!2sShreehari+City+-+Luxury+Duplex+Homes+and+Flats+For+sale+in+Puri!5e0!3m2!1sen!2sin!4v1716912845678!5m2!1sen!2sin",
  contactNumber: "+91 7205522303",
  tagline: "Uncompromising Elegance & Private Comfort",
  description: `In the sacred city of Puri, where spirituality, culture, and timeless traditions come together, Shree Hari City emerges as a destination designed for those who seek more than just a home. Nestled in the serene surroundings of Malatipatpur, this thoughtfully planned residential township offers an exceptional blend of peace, comfort, and modern living.

Created for families who value space, security, and a meaningful lifestyle, Shree Hari City presents premium duplex bungalows amidst a vibrant community enriched with modern amenities and spiritual charm. Every aspect of the township has been carefully envisioned to provide residents with a life of convenience, wellness, and belonging.

More than a residential address, Shree Hari City is a place where cherished memories are created, generations grow together, and every day begins with the blessings and tranquility that only Puri can offer.`,
  heroImage: "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780308424/Top_View_Of_Landscape.jpg_co1taz.jpg",
  galleryImages: [
    "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780308173/South_Facing_Duplex.jpg_wi4vnw.jpg",
    "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780308173/Street_View.jpg_zi78x5.jpg",
    "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780308173/Street_View_2.jpg_z6eqnp.jpg",
    "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780308174/temple.jpg_gzlyyw.jpg",
  ],
  details: [
    { label: "Project Type", value: "Premium Duplex Bungalow (G+1)" },
    { label: "Configuration", value: "3 BHK & 4 BHK" },
    { label: "Built-up Area", value: "3 BHK — approx. 1,800–2,000 Sq.Ft. | 4 BHK — approx. 2,264 – 2,423 Sq.Ft. (e.g. Bungalow 63: Ground 1132 + 1st Floor 1132 + Head Room 159 = 2,423 Sq.Ft.)" },
    { label: "Facing", value: "South / East / West / North facing available (all 4 directions offered)" },
    { label: "Approved By", value: "PKDA, Puri" },
    { label: "Location", value: "Malatipatpur, Puri, Odisha – 752002" },
    { label: "Structure", value: "RCC Frame, G+1 (Ground + 1st Floor + Head Room), Each floor height 9'10\"" },
  ],
  amenities: [
    { name: "24/7 Premium Security", icon: "ShieldCheck" },
    { name: "Continuous Water Supply", icon: "Droplets" },
    { name: "100% Power Backup", icon: "Zap" },
    { name: "Broad Intercom System", icon: "PhoneCall" },
    { name: "Landscaped Gardens", icon: "Trees" },
    { name: "Wide Tarred Internal Roads", icon: "Navigation" },
  ],
  nearbyPlaces: [
    { place: "Malatipatpur Railway Station", distance: "3 Mins" },
    { place: "Shree Jagannath Temple", distance: "12 Mins" },
    { place: "Puri Sea Beach", distance: "15 Mins" },
    { place: "Bhubaneswar-Puri Highway", distance: "5 Mins" },
  ]
};

export const apartmentProject: ProjectData = {
  slug: "apartment-shree-hari-malini",
  name: "Shreehari Malini",
  category: "Apartment",
  status: "Available / Under Construction",
  locationName: "Malatipatpur, Puri, Odisha",
  googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14991.688329606888!2d85.8277259528026!3d20.074606792945283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19bcf879483fb3%3A0xbe9f4cbba8ec8e0f!2sMalatipatpur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1716912445678!5m2!1sen!2sin",
  contactNumber: "+91 7205522303",
  tagline: "Sophisticated Urban Living with Heritage Soul",
  description: `In the sacred city of Puri, where the divine grace of Lord Jagannath permeates every corner and the Malini River's timeless legacy flows through the very soul of the land, Shreehari Malini emerges as a residence crafted for those who seek harmony between spiritual living and modern comfort. Nestled in the serene surroundings of Malatipatpur, this masterfully planned apartment community offers an exceptional blend of tranquility, elegance, and contemporary convenience — just moments away from the iconic Jagannath Temple and the golden shores of the Bay of Bengal.

Created for families who value thoughtfully designed spaces, robust security, and a life enriched with purpose, Shreehari Malini presents premium 1, 2, and 3 BHK apartments within a vibrant, self-sufficient community. From lush landscaped gardens and a dedicated children's play area to a modern gymnasium, community hall, and round-the-clock security — every amenity has been envisioned to nurture wellness, togetherness, and everyday joy.

More than a residential address, Shreehari Malini is a place where cherished memories take root, where families grow stronger with every passing season, and where every morning begins with the quiet blessings and profound peace that only the sacred land of Puri can offer.`,
  heroImage: "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780377603/d85f2025-4f0e-44fd-a3a8-5818fba00312-0_kxasm2.jpg",
  galleryImages: [
    "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780377670/cca80345-1b50-4533-8278-09635385c23e-1_i3ir6s.jpg",
    "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780377737/a442be75-1f2d-4bb6-b138-f807970f8a7a-1_scvtcn.jpg",
    "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780377797/c5b8b064-d80e-4323-bf1b-70991b7b6542-0_qupztl.jpg",
  ],
  details: [
    { label: "Project Type", value: "Premium Apartment Complex" },
    { label: "Configuration", value: "1 BHK, 2 BHK & 3 BHK" },
    { label: "SQ Range", value: "894 – 2,175 Sq.Ft." },
    { label: "Total Floors", value: "Basement + Stilt + 5 Upper Floors" },
    { label: "Approved By", value: "PKDA, Puri" },
    { label: "Location", value: "Malatipatpur, Puri, Odisha – 752002" },
    { label: "Bank Loans", value: "Available from all leading banks" },
  ],
  amenities: [
    { name: "Rooftop Infinity Deck", icon: "Compass" },
    { name: "Modern Fitness Center", icon: "Activity" },
    { name: "Dedicated Children's Play Area", icon: "Smile" },
    { name: "Rainwater Harvesting", icon: "CloudRain" },
    { name: "Advanced Fire Fighting System", icon: "FlameKindling" },
    { name: "Dual Elevator Lift System", icon: "ArrowUpDown" },
  ],
  nearbyPlaces: [
    { place: "Malatipatpur Railway Station", distance: "3 Mins" },
    { place: "Shree Jagannath Temple", distance: "12 Mins" },
    { place: "Puri Sea Beach", distance: "15 Mins" },
    { place: "Bhubaneswar-Puri Highway", distance: "5 Mins" },
  ]
};

export const townshipProjects: Record<string, ProjectData> = {
  "infogreencity": {
    slug: "infogreencity",
    name: "Infogreen City",
    category: "Township Project",
    status: "Plot Booking Open",
    locationName: "Mendhasala square, Beside idco Sea food park South Bhubaneswar, Odisha 752054",
    googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29941.79055238953!2d85.65677367431637!3d20.270285700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a90027bb8bd7%3A0x8df5f0955cef4782!2sINFOGREEN%20CITY%20BY%20MYCITY%20ODISHA!5e0!3m2!1sen!2sus!4v1780554763227!5m2!1sen!2sus",
    googleMapExternalUrl: "https://maps.app.goo.gl/naWQtRgcYjNRu4EW9?g_st=awb",
    contactNumber: "+91 7205522303",
    tagline: "The Future of Sustainable Urban Integration",
    description: `Nestled in the rapidly evolving landscape of Mendhasala, Bhubaneswar, Infogreen City is a thoughtfully envisioned integrated township that brings together modern infrastructure, natural surroundings, and the promise of a brighter future. Designed for families, professionals, and investors alike, the township offers a harmonious blend of residential spaces, 70+ contemporary amenities, and seamless connectivity within a vibrant and sustainable community.

Surrounded by expansive green spaces and planned with a future-forward vision, Infogreen City features wide internal roads, eco-conscious infrastructure, efficient water management systems, and thoughtfully designed public areas that encourage a healthier and more balanced way of life. Its strategic location provides convenient access to educational institutions, healthcare facilities, commercial centers, and the city's growing technology and business hubs, ensuring that every essential remains within easy reach.

More than a real estate development, Infogreen City is a destination where Odisha's rich heritage meets modern urban planning. Every element has been carefully crafted to create a secure, welcoming, and future-ready environment where families can grow, aspirations can flourish, and lasting memories can be built.

Welcome to Infogreen City — where nature, community, and opportunity come together to create a life of purpose and possibility.`,
    heroImage: "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780033649/INFOGREEN-CITY_xnede4.png",
    galleryImages: [
      "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780033649/INFOGREEN-CITY-2_dbtj5s.png",
    ],
    details: [
      { label: "Township Category", value: "Eco-Smart Township" },
      { label: "Plot Sizes Available", value: "1,500 - 10,000 Sq.Ft." },
      { label: "Total Area", value: "190+ Acres Development" },
      { label: "Booking Status", value: "80% Registered, Phase-II Booking Ongoing" },
      { label: "Major USP", value: "Litigation free land, Nearest to Infovalley II" },
    ],
    amenities: [
      { name: "40 Ft Main Road", icon: "Milestone" },
      { name: "3-Phase Electrification", icon: "Zap" },
      { name: "Underground Drainage", icon: "Waves" },
      { name: "24/7 Security", icon: "ShieldCheck" },
      { name: "Jagannath Temple", icon: "Landmark" },
      { name: "Community Hall", icon: "Users" },
      { name: "Artificial Lake with Boating Facility", icon: "Anchor" },
      { name: "Gym", icon: "Dumbbell" },
      { name: "Gazebo Sitting", icon: "Sofa" },
      { name: "Mall with Cinema Hall", icon: "Film" },
      { name: "Street Light with Plantation", icon: "Lightbulb" },
    ],
    amenitiesSubtitle: "70+ World Class",
    nearbyPlaces: [
      { place: "Infovalley II (IT City, New Bhubaneswar)", distance: "6 Mins" },
      { place: "Mount Litera Zee School", distance: "7 Mins" },
      { place: "Sum Hospital", distance: "10 Mins" },
      { place: "RBI Data Center", distance: "6 Mins" },
    ]
  },
  "acre-bhoomi-1": {
    slug: "acre-bhoomi-1",
    name: "Acre Bhoomi 1",
    category: "Township Project",
    status: "Plots Ready for Construction",
    locationName: "Mendhasala square, Beside idco Sea food park South Bhubaneswar, Odisha 752054",
    googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.7238190486914!2d85.69488249999999!3d20.2702857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a90027bb8bd7%3A0x8df5f0955cef4782!2sINFOGREEN%20CITY%20BY%20MYCITY%20ODISHA!5e0!3m2!1sen!2sus!4v1780564459400!5m2!1sen!2sus",
    googleMapExternalUrl: "https://maps.app.goo.gl/naWQtRgcYjNRu4EW9?g_st=awb",
    contactNumber: "+91 7205522303",
    tagline: "Planned Residential Enclave Near Tech Corridor",
    description: `Set amidst the serene and fast-evolving landscape of Mendhasala, Acre Bhoomi 1 is a distinctive land development designed for those who seek space, freedom, and long-term value. Offered exclusively in acres, it presents a unique opportunity for individuals, families, and investors to own a larger piece of land in one of Bhubaneswar's most promising growth corridors.

Surrounded by natural greenery and supported by developing infrastructure, Acre Bhoomi 1 offers the perfect setting for creating something truly your own—whether it's a private retreat, a future residence, or a legacy investment. Its strategic location ensures easy access to the city's key destinations while preserving the tranquility of a peaceful environment.

More than just land, Acre Bhoomi 1 is an opportunity to be part of a region poised for growth and transformation. Here, every acre represents possibility, every investment holds potential, and every vision has the space to come to life.`,
    visionTitle: "",
    heroImage: "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780033649/ACRE_BHOOMI_1_stxnmz.jpg",
    galleryImages: [],
    details: [
      { label: "Development Type", value: "Gated Acre Community" },
      { label: "Plot Dimensions", value: "Minimum 1 Acre" },
      { label: "Road Widths", value: "40ft Main & 30ft Sub Roads" },
      { label: "Booking Status", value: "Limited Plots Available" },
      { label: "Water Source", value: "Precastinated Underground Drainage System" },
      { label: "Possession Status", value: "Ready for Registration" },
    ],
    amenities: [
      { name: "40 Ft Main Road", icon: "Milestone" },
      { name: "3-Phase Electrification", icon: "Zap" },
      { name: "Underground Drainage", icon: "Waves" },
      { name: "24/7 Security", icon: "ShieldCheck" },
      { name: "Jagannath Temple", icon: "Landmark" },
      { name: "Community Hall", icon: "Users" },
      { name: "Artificial Lake with Boating Facility", icon: "Anchor" },
      { name: "Gym", icon: "Dumbbell" },
      { name: "Gazebo Sitting", icon: "Sofa" },
      { name: "Mall with Cinema Hall", icon: "Film" },
      { name: "Street Light with Plantation", icon: "Lightbulb" },
    ],
    amenitiesSubtitle: "70+ World Class",
    nearbyPlaces: [
      { place: "Infovalley II (IT City, New Bhubaneswar)", distance: "6 Mins" },
      { place: "Mount Litera Zee School", distance: "7 Mins" },
      { place: "Sum Hospital", distance: "10 Mins" },
      { place: "RBI Data Center", distance: "6 Mins" },
    ]
  },
  "acre-bhoomi-2": {
    slug: "acre-bhoomi-2",
    name: "Acre Bhoomi 2",
    category: "Township Project",
    status: "New Phase Booking Open",
    locationName: "Acre Bhoomi Phase 2, 3HQ3+J92, Malipada, Odisha 752018",
    googleMapUrl: "https://maps.google.com/maps?q=Acre%20Bhoomi%20Phase%202,%203HQ3%2BJ92,%20Malipada,%20Odisha%20752018&t=&z=14&ie=UTF8&iwloc=&output=embed",
    contactNumber: "+91 7205522303",
    tagline: "Exclusive Masterplanned Community Expansion",
    visionTitle: "The Next Chapter of Growth, Rooted in Trust with, Designed for Legacy at Acre Bhoomi II",
    description: `Built on the trust and success of one of Odisha's most celebrated township developments, *Acre Bhoomi Phase II* marks the next chapter in My City Odisha's vision of creating future-ready communities. Following the remarkable journey of over 900 families becoming part of our thriving township ecosystem, this new development at Malipada, Khordha, carries forward a legacy of growth, trust, and long-term value.

Nestled amidst peaceful surroundings and emerging infrastructure, *Acre Bhoomi Phase II* offers thoughtfully planned land parcels within a secure gated community. Designed for those who seek both investment potential and a place to build their future, the project combines strategic location advantages with the promise of appreciation, connectivity, and a better quality of life.

More than an investment, Acre Bhoomi Phase II is an opportunity to own a part of tomorrow. It is a place where aspirations take shape, generations create lasting legacies, and every acre holds the promise of growth, security, and endless possibilities.`,
    heroImage: "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780033649/ACRE_BHOOMI_2_qsjozs.jpg",
    galleryImages: [],
    details: [
      { label: "Development Type", value: "Gated Township Community" },
      { label: "Plot Sizes", value: "2000-15000 sq.Ft." },
      { label: "Internal Road Widths", value: "30ft Paved Road" },
      { label: "Booking Status", value: "Pre-launch Booking Open" },
      { label: "Utility Layout", value: "Underground drainage, power & road connectivity" },
      { label: "Possession Timeline", value: "Immediate" },
    ],
    amenities: [
      { name: "Grand Archway Security Gate", icon: "Lock" },
      { name: "Open-Air Amphitheatre", icon: "Mic" },
      { name: "Eco Yoga & Meditation Deck", icon: "Heart" },
      { name: "Jogging & Cycle Tracks", icon: "Activity" },
      { name: "40 Ft Main Road", icon: "Milestone" },
      { name: "3-Phase Electrification", icon: "Zap" },
      { name: "Underground Drainage", icon: "Waves" },
      { name: "24/7 Security", icon: "ShieldCheck" },
      { name: "Jagannath Temple", icon: "Landmark" },
      { name: "Community Hall", icon: "Users" },
      { name: "Artificial Lake with Boating Facility", icon: "Anchor" },
      { name: "Gym", icon: "Dumbbell" },
      { name: "Gazebo Sitting", icon: "Sofa" },
      { name: "Mall with Cinema Hall", icon: "Film" },
      { name: "Street Light with Plantation", icon: "Lightbulb" },
    ],
    amenitiesSubtitle: "70+ World Class",
    nearbyPlaces: [
      { place: "NH 16", distance: "2 Mins" },
      { place: "New Khordha Industrial Area (Nestle, Beverages, etc.)", distance: "5 Mins" },
      { place: "Khordha Tower", distance: "15 Mins" },
      { place: "Tapang Railway Station", distance: "5 Mins" },
    ]
  },
  "community-farmland": {
    slug: "community-farmland",
    name: "Community Farmland",
    category: "Township Project",
    status: "Phase-I Booking Open",
    locationName: "Pipili Eco-Zone Outer Limits, Puri District Boundary, Odisha",
    googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14988.665792440332!2d85.81938955278072!3d20.106207192667104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19bce3d0526019%3A0xe510a95ff07149a4!2sPipili%2C%20Odisha!5e0!3m2!1sen!2sin!4v1716912745678!5m2!1sen!2sin",
    contactNumber: "+91 7205522303",
    tagline: "Own a Piece of Earth. Build Your Eco-Retreat.",
    description: "Community Farmland offers an escape to a serene, organic agrarian community. Located on the green outskirt coordinates of Pipili, near the bypass path connecting Bhubaneswar and Puri, it gives city families a chance to own large farm parcels. Designed for weekend retreats, organic farming, and eco-sustainable holiday cabins, this managed farmland township features shared farming staff, organic orchards, and a rustic community clubhouse.",
    heroImage: "https://res.cloudinary.com/dqlmblh5i/image/upload/v1780033648/FARMLAND_mvha6j.png",
    galleryImages: [],
    details: [
      { label: "Farmland Category", value: "Managed Eco-Farmland" },
      { label: "Parcel Size Available", value: "5,000 - 10,000 Sq.Ft." },
      { label: "Orchard Fruit Varieties", value: "Mango, Coconut, Guava, Lemon" },
      { label: "Soil Quality Status", value: "Highly Fertile Alluvial Soil" },
      { label: "Possession Timeline", value: "Ready for Organic Farming Setup" },
      { label: "Managed Services", value: "Inhouse Horticulturists & Guards" },
    ],
    amenities: [
      { name: "Rustic Community Clubhouse", icon: "Home" },
      { name: "24/7 Security & CCTV Perimeter", icon: "Lock" },
      { name: "Drip Irrigation Pipeline System", icon: "Droplets" },
      { name: "Organic Compost Yard", icon: "Leaf" },
      { name: "Shared Farming Support Staff", icon: "Users" },
      { name: "Aesthetic Country Roads", icon: "Compass" },
    ],
    nearbyPlaces: [
      { place: "Pipili Bypass Junction", distance: "8 Mins" },
      { place: "Bhubaneswar (Uttara Square)", distance: "18 Mins" },
      { place: "Dhauli Peace Pagoda", distance: "15 Mins" },
      { place: "Puri Golden Beach", distance: "35 Mins" },
    ]
  }
};

export const farmhouseProjects: Record<string, ProjectData> = {
  "vasundhara": {
    slug: "vasundhara",
    name: "Vasundhara",
    category: "Farmhouse Plots",
    status: "Booking Open",
    locationName: "Pipili Eco-Zone, Puri Highway, Odisha",
    googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14988.665792440332!2d85.81938955278072!3d20.106207192667104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19bce3d0526019%3A0xe510a95ff07149a4!2sPipili%2C%20Odisha!5e0!3m2!1sen!2sin!4v1716912745678!5m2!1sen!2sin",
    contactNumber: "+91 7205522303",
    tagline: "Your Private Sanctuary of Green Luxury",
    visionTitle: "Odisha's First Community Living Farmland\nWhere Nature Feels Like Home",
    description: `In a world that rarely slows down, Vasundhara offers a chance to rediscover what truly matters. Nestled amidst nature on the outskirts of Bhubaneswar, this one-of-a-kind community living farmland is envisioned as a sanctuary where families can reconnect with the earth, embrace a healthier lifestyle, and experience the simple joys of life. Here, every sunrise feels calmer, every breath feels fresher, and every moment feels more meaningful.

Thoughtfully designed as a premium second-home destination, Vasundhara combines fertile farmland, charming farmhouse cottages, private leisure spaces, and thriving fruit orchards into a seamless living experience. Surrounded by mangoes, pineapples, guavas, sapodillas, water apple, coconut, berries, and lush greenery, residents can enjoy organic farming, peaceful walks, and the luxury of living close to nature without being far from the city.

More than a farmhouse or an investment, Vasundhara is a return to a way of life many have longed for—a life where children grow up amidst open spaces, weekends are spent under endless skies, and families create memories rooted in nature. It is a place where wellness, sustainability, and belonging come together to create a legacy that can be cherished for generations.

Welcome to Vasundhara —Where Nature Feels Like Home, and Every Day feels like a getaway.`,
    heroImage: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop",
    ],
    details: [
      { label: "Project Category", value: "Community living managed farmlands with cottage" },
      { label: "Plot Sizes", value: "5,000 Sq.Ft. - 1 Acre" },
      { label: "Road Width", value: "40ft paved main road, 30ft internal road" },
      { label: "Possession", value: "Ready for registration and construction" },
      { label: "Horticulture", value: "Mango, berries, coconut, guava, pineapple, sapodillas, lush greenery" },
    ],
    amenities: [
      { name: "Lake with Boating Facility", icon: "Anchor" },
      { name: "40ft Paved Main Road, 30ft Paved Internal Road", icon: "Milestone" },
      { name: "Fishing Point", icon: "Fish" },
      { name: "Watch Tower", icon: "Binoculars" },
      { name: "Bonfire Point", icon: "Flame" },
      { name: "Rainwater Harvesting", icon: "CloudRain" },
      { name: "Solar Street Lights", icon: "Lightbulb" },
      { name: "Yoga & Meditation Zone", icon: "Heart" },
      { name: "Gaming Zone", icon: "Gamepad2" },
      { name: "Organic Fruit Orchards", icon: "Trees" },
      { name: "24/7 Security", icon: "ShieldCheck" },
      { name: "Sitting Zones", icon: "Sofa" },
      { name: "Open Air", icon: "Wind" },
      { name: "Kids Play Area", icon: "Smile" },
      { name: "Meeting Zones", icon: "Users" },
    ],
    nearbyPlaces: [
      { place: "NH-57", distance: "8 Mins" },
      { place: "South Bhubaneswar", distance: "15 Mins Away" },
      { place: "Khordha Town", distance: "10 Mins Away" },
      { place: "Infovalley II", distance: "18 Mins Away" },
    ]
  }
};

