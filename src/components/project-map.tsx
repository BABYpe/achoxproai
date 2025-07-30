
"use client"

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { useState } from "react";
import type { Project } from "@/hooks/use-project-store";

interface ProjectMapProps {
    projects: Project[];
}

export default function ProjectMap({ projects }: ProjectMapProps) {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        return <div>Error: Google Maps API key is not configured.</div>
    }

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const center = projects.length > 0 && projects[0].latitude && projects[0].longitude
        ? { lat: projects[0].latitude, lng: projects[0].longitude } 
        : { lat: 24.7136, lng: 46.6753 }; // Default to Riyadh

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY}>
            <Map
                mapId="achox-pro-map"
                style={{ width: '100%', height: '100%' }}
                defaultCenter={center}
                defaultZoom={5}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                {projects.map((project) => (
                    project.latitude && project.longitude && (
                        <AdvancedMarker 
                            key={project.id} 
                            position={{ lat: project.latitude, lng: project.longitude }} 
                            title={project.title}
                            onClick={() => setSelectedProject(project)}
                        >
                            <Pin
                                background={'hsl(var(--primary))'}
                                borderColor={'hsl(var(--primary))'}
                                glyphColor={'hsl(var(--primary-foreground))'}
                            />
                        </AdvancedMarker>
                    )
                ))}
                {selectedProject && (
                    <InfoWindow
                        position={{ lat: selectedProject.latitude!, lng: selectedProject.longitude! }}
                        onCloseClick={() => setSelectedProject(null)}
                    >
                        <div className="p-2">
                            <h3 className="font-bold">{selectedProject.title}</h3>
                            <p className="text-sm text-muted-foreground">{selectedProject.location}</p>
                        </div>
                    </InfoWindow>
                )}
            </Map>
        </APIProvider>
    );
}
