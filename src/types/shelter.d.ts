type Shelter = {
    id?: number;
    name?: string;
    startYear?: number;
    endYear?: number;
    description?: string;
    slug?: string;
    longitude?: number;
    latitude?: number;
    altitude?: number;
    defaultPhotoId?: number;
    isGMC?: boolean;
    architecture?: string;
    category?: string;
    builtBy?: string;
    notes?: string;
    photos?: Photo[]
    akas?: AKA[]
    isExtant?: boolean;
    created?: string;
    updated?: string;
}

