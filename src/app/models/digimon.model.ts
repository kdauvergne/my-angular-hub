export interface Digimon {
  id: number;
  name: string;
  href: string;
  image: string;
}

export interface DigimonResponse {
  content: Digimon[];
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
  };
}
