"use client";

import { motion } from "framer-motion";
import { duplexProject } from "@/utils/projectData";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectAbout from "@/components/project/ProjectAbout";
import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import ProjectLocation from "@/components/project/ProjectLocation";
import ProjectContact from "@/components/project/ProjectContact";

export default function DuplexServicePage() {
  const p = duplexProject;

  return (
    <main className="w-full min-h-screen bg-[#FDFCFB]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 1. Hero Banner */}
        <ProjectHero
          name={p.name}
          category={p.category}
          status={p.status}
          locationName={p.locationName}
          tagline={p.tagline}
          heroImage={p.heroImage}
        />

        {/* 2. About Project */}
        <ProjectAbout
          name={p.name}
          tagline={p.tagline}
          description={p.description}
          showVision={false}
          visionTitle={p.visionTitle}
        />

        {/* 3. Property Details (Specifications) */}
        <ProjectDetails details={p.details} />

        {/* 4. Image Gallery */}
        <ProjectGallery images={[p.heroImage, ...p.galleryImages]} name={p.name} />

        {/* 5. Features & Amenities */}
        <ProjectAmenities amenities={p.amenities} subtitle={p.amenitiesSubtitle} />

        {/* 6. Location & Connectivity */}
        <ProjectLocation
          locationName={p.locationName}
          googleMapUrl={p.googleMapUrl}
          googleMapExternalUrl={p.googleMapExternalUrl}
          nearbyPlaces={p.nearbyPlaces}
        />

        {/* 7. Contact Section */}
        <ProjectContact name={p.name} contactNumber={p.contactNumber} />
      </motion.div>
    </main>
  );
}
