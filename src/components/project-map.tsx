"use client"

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

interface Project {
    title: string;
    lat: number;
    lng: number;
}

interface ProjectMapProps {
    projects: Project[];
}

export default function ProjectMap({ projects }: ProjectMapProps) {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return <div>Error: Google Maps API key is not configured.</div>
    }

    const center = projects.length > 0 
        ? { lat: projects[0].lat, lng: projects[0].lng } 
        : { lat: 24.7136, lng: 46.6753 }; // Default to Riyadh

    return (
        <Map
            mapId="achox-pro-map"
            style={{ width: '100%', height: '100%' }}
            defaultCenter={center}
            defaultZoom={5}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        >
            {projects.map((project, index) => (
                <AdvancedMarker key={index} position={{ lat: project.lat, lng: project.lng }} title={project.title}>
                    <Pin
                        background={'hsl(var(--primary))'}
                        borderColor={'hsl(var(--primary))'}
                        glyphColor={'hsl(var(--primary-foreground))'}
                    />
                </AdvancedMarker>
            ))}
        </Map>
    );
}
