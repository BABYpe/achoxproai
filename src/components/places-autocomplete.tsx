
"use client"

import { useRef, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PlacesAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
    defaultValue?: string;
}

export function PlacesAutocomplete({ onPlaceSelect, defaultValue = "" }: PlacesAutocompleteProps) {
    const places = useMapsLibrary('places');
    const inputRef = useRef<HTMLInputElement>(null);
    const autocomplete = useRef<google.maps.places.Autocomplete | null>(null);

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ['geometry.location', 'name', 'formatted_address']
        };

        autocomplete.current = new places.Autocomplete(inputRef.current, options);

        const listener = autocomplete.current.addListener('place_changed', () => {
            onPlaceSelect(autocomplete.current?.getPlace() ?? null);
        });

        return () => {
            if (autocomplete.current) {
                google.maps.event.clearInstanceListeners(autocomplete.current);
            }
        };
    }, [places, onPlaceSelect]);
    
     useEffect(() => {
        // Set the input's value if a defaultValue is provided
        if (inputRef.current && defaultValue) {
            inputRef.current.value = defaultValue;
        }
    }, [defaultValue]);

    return (
        <div className="relative">
             <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                ref={inputRef}
                id="location"
                name="location"
                placeholder="ابحث عن مدينة أو عنوان..."
                className="pr-10"
                defaultValue={defaultValue}
            />
        </div>
    );
}
