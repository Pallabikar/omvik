"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { farmhouseProjects } from "@/utils/projectData";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectGallery from "@/components/project/ProjectGallery";
import ProjectAbout from "@/components/project/ProjectAbout";
import ProjectDetails from "@/components/project/ProjectDetails";
import ProjectAmenities from "@/components/project/ProjectAmenities";
import ProjectLocation from "@/components/project/ProjectLocation";
import ProjectContact from "@/components/project/ProjectContact";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export default function FarmhouseProjectDetailPage({ params }: PageProps) {
  const { slug } = use(params);

  // Retrieve the specific project data
  const project = farmhouseProjects[slug];

  // If the project doesn't exist in our data registry, invoke Next.js not-found handler
  if (!project) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#FDFCFB]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 1. Hero Banner (Links back to Farmhouse index page) */}
        <ProjectHero
          name={project.name}
          category={project.category}
          status={project.status}
          locationName={project.locationName}
          tagline={project.tagline}
          heroImage={project.heroImage}
          backUrl="/services/farmhouse"
          backLabel="Back to Farmhouses"
        />

        {/* 2. About Project */}
        <ProjectAbout
          name={project.name}
          tagline={project.tagline}
          description={project.description}
          visionTitle={project.visionTitle}
        />

        {/* 3. Property Details (Specifications) */}
        <ProjectDetails details={project.details} />

        {/* 4. Image Gallery */}
        <ProjectGallery images={[project.heroImage, ...project.galleryImages]} name={project.name} />

        {/* 5. Features & Amenities */}
        <ProjectAmenities amenities={project.amenities} subtitle={project.amenitiesSubtitle} />

        {/* 6. Location & Connectivity */}
        <ProjectLocation
          locationName={project.locationName}
          googleMapUrl={project.googleMapUrl}
          googleMapExternalUrl={project.googleMapExternalUrl}
          nearbyPlaces={project.nearbyPlaces}
        />

        {/* 7. Contact Section */}
        <ProjectContact name={project.name} contactNumber={project.contactNumber} />
      </motion.div>
    </main>
  );
}
