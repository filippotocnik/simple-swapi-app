interface PersonDetails {
  hair_color?: string
  birth_year?: string
  eye_color?: string
}

interface PlanetDetails {
  diameter?: string
  climate?: string
  terrain?: string
}

interface StarshipDetails {
  manufacturer?: string
  max_atmosphering_speed?: string
  hyperdrive_rating?: string
}

export interface ICategoryItem extends PersonDetails, PlanetDetails, StarshipDetails {
  name: string
  type: string
  hasOpenDetails?: boolean
}

export interface CategoryRes {
  count: number
  next: string
  previous: string
  results: ICategoryItem[]
}

export interface ISelectedFilters {
  [key: string]: string[]
}
