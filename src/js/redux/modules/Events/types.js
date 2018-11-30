export type EventsType = {
    cover : {
        source : string,
      },
      description : string,
      division : string,
      game : Boolean,
      id : string,
      match_no : number,
      place : {
        name : string,
      },
      round_type : string,
      start_time : string,
      title : string,
      game_id: string,
};

export type Type = {
  loading: Boolean,
  error: string,
  items: Array<EventsType>,
}
