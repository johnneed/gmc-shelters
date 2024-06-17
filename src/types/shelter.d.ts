
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
    builtBy?: string;
    notes?: string;
    photos?: Photo[]
    aka?: AKA[]
}

