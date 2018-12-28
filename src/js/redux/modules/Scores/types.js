export type Game = {
  active: Boolean,
    created_at: string,
    event_id: string,
    home: {
      batting: Boolean,
      name: string,
      overs: string,
      score: string,
      wickets: string
    },
    updated_at: string,
    visitor: {
      batting: Boolean,
      name: string,
      overs: string,
      score: string,
      wickets: string,
    }
}

export type Scores = {
  loading: Boolean,
  error: string,
  games: Array<Game>,
}
