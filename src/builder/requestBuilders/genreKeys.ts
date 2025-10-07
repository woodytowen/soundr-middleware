export enum TicketMasterGenreKeys {
  DRUM_AND_BASS = 'KZazBEonSMnZfZ7vAEd',
  DRILL_AND_BASS = 'KZazBEonSMnZfZ7vAEe',
  INDUSTRIAL_DRUM_AND_BASS = 'KZazBEonSMnZfZ7vAIa',
  JUNGLE = 'KZazBEonSMnZfZ7vAIE',
  EXPERIMENTAL_JUNGLE = 'KZazBEonSMnZfZ7vAEE',
  TECHNO_BASS = 'KZazBEonSMnZfZ7vAtJ',
  TECHNO = 'KZazBEonSMnZfZ7vAt1',
  DANCE_AND_ELECTRONIC = 'KnvZfZ7vAvF',
}

export enum SkiddleGenreKeys {
  DRUM_AND_BASS = '8',
  JUNGLE = '80',
  UK_GARAGE = '3',
  TECHNO = '9',
  BASSLINE = '69',
}

export const skiddleGenreMap: Record<string, string> = {
  DRUM_AND_BASS: SkiddleGenreKeys.DRUM_AND_BASS,
  JUNGLE: SkiddleGenreKeys.JUNGLE,
  UK_GARAGE: SkiddleGenreKeys.UK_GARAGE,
  TECHNO: SkiddleGenreKeys.TECHNO,
  BASSLINE: SkiddleGenreKeys.BASSLINE,
};

export const ticketMasterGenreMap: Record<string, string> = {
  DRUM_AND_BASS: TicketMasterGenreKeys.DRUM_AND_BASS,
  DRILL_AND_BASS: TicketMasterGenreKeys.DRILL_AND_BASS,
  INDUSTRIAL_DRUM_AND_BASS: TicketMasterGenreKeys.INDUSTRIAL_DRUM_AND_BASS,
  JUNGLE: TicketMasterGenreKeys.JUNGLE,
  EXPERIMENTAL_JUNGLE: TicketMasterGenreKeys.EXPERIMENTAL_JUNGLE,
  TECHNO_BASS: TicketMasterGenreKeys.TECHNO_BASS,
  TECHNO: TicketMasterGenreKeys.TECHNO,
  DANCE_AND_ELECTRONIC: TicketMasterGenreKeys.DANCE_AND_ELECTRONIC,
};
