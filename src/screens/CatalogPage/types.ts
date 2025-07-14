export interface FilterOption {
  id: number;
  name: string;
}

export interface FilterLabels {
  catalog: string;
  rooms: string;
  colors: string;
  shapes: string;
  styles: string;
}

export interface FilterOptions {
  rooms: FilterOption[];
  colors: FilterOption[];
  shapes: FilterOption[];
  styles: FilterOption[];
  labels: FilterLabels;
}