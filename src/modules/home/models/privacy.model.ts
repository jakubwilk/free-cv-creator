export interface IPrivacyPoint {
  title: string;
  description: string;
}

export const PRIVACY_POINTS: IPrivacyPoint[] = [
  {
    title: 'Brak serwera, brak bazy danych',
    description:
      'Aplikacja nie posiada backendu. Dane zapisywane są wyłącznie w localStorage Twojej przeglądarki.',
  },
  {
    title: 'Zero konta, zero e-maila',
    description: 'Nie pytamy Cię o żadne dane kontaktowe. Zaczynasz tworzyć CV od razu.',
  },
  {
    title: 'Dane znikają po pobraniu PDF',
    description:
      'Po wygenerowaniu pliku PDF localStorage jest automatycznie czyszczony — lub możesz zapisać dane jako JSON.',
  },
];
