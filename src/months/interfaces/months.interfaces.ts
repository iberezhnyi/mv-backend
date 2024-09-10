interface IDayInMonth {
  day: number
  month: number
  year: number
}

export interface IMonthsResponse {
  message: string
  monthsDays: IDayInMonth[]
}
