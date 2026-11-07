# Innhold og mikrotekst

Sassy høres ut som en rolig, kompetent kollega: en som kan psykologi, respekterer oppmerksomheten din og aldri får deg til å føle deg dum. Dette er reglene for all tekst i et Sassy-grensesnitt, på norsk først og engelsk som andrespråk. Hver komponent har et eget avsnitt «Innhold» i `docs/komponenter/`; dette er grunnlaget de bygger på.

## Stemmen

- **Person.** *Du* til den som bruker appen, *jeg* for eieren på personlige flater (en nettside, en om-side). *Vi* bare når produktet gjør noe på dine vegne: «Vi lagrer når nettet er tilbake.» Aldri «brukeren».
- **Setningsform.** Stor bokstav bare først i setningen, overalt: knapper, titler, faner, menypunkter. Aldri STORE BOKSTAVER. Metatekst i monospace er små bokstaver eller setningsform («oppdatert for 2 min siden»).
- **Kort.** Én tanke per setning. Stryk fyll: «bare», «vennligst», «merk at».
- **Lavt trykk.** Ingen tapte rekker, ingen falsk hast, ingen mørke mønstre. «Tre ting, ikke tretti.» «Ingen rekker, ingen skyld.»
- **Ingen emoji** i grensesnitt eller produkttekst. Bruk et ikon fra settet. Unicode er greit for tastaturhint (⌘K), piler (→) og skilletegn (·).
- **Tall og meta** i monospace: `12 / 30 oppgaver`, `v0.5.7`, `24. sep`.
- **Norsk først.** Offentlige flater er tospråklige med norsk som standard og engelsk som andrespråk. Tilby en tekstbryter (`NO` / `EN`), aldri flagg. Husk valget og sett `<html lang>`. Komponentenes innebygde tekst er norsk («Lukk», «Fjern …», «Valgfritt», «Hovedmeny», «Mer», «Hopp til innholdet», «Ny versjon», «Oppdater», «Senere»); engelske flater sender sine egne gjennom propsene.

## Knapper

- Knappen sier utfallet, med et verb først: «Slett prosjekt», «Legg til oppgave», «Behold».
- Aldri «OK», «Send», «Ja» eller «Nei».
- Den primære knappen i en dialog gjentar verbet fra tittelen. Alternativet sier hva som skjer i stedet.
- Ett til tre ord. Forklaringen hører hjemme i teksten over.

## Feilmeldinger

Mønsteret: **hva som skjedde + hva du gjør nå.** Aldri skyld, aldri koder, aldri utropstegn.

- «Det ser ikke ut som en e-post ennå.»
- «Kunne ikke laste opp bildet. Fila er over 20 MB.»
- «Navnet er i bruk. Prøv et annet.»
- «Velg en type.»

Ikke: «Ugyldig verdi!», «Feil 422», «Du har skrevet feil». Feilen står der feltet er (`error` på feltet), vises når feltet forlates eller skjemaet sendes, og leses opp når den dukker opp. «ennå» i en feilmelding sier at det går an å rette.

## Tomme tilstander

En tom liste er ikke en feil. Si hva som er tomt, så ett neste steg, så høyst én handling.

- «Ingen oppgaver ennå.» + «Legg til den første, så dukker den opp her.» + «Legg til oppgave».
- «Ingen treff.» + «Prøv et kortere ord, eller fjern et filter.»
- «Du er frakoblet.» + «Det du gjør nå, lagres når nettet er tilbake.»

Ikke «Oops», ikke «Kom i gang nå!», ikke «Du har ikke gjort noe ennå». «ennå» bare når det kommer noe senere.

## Bekreft eller angre

Angre slår «Er du sikker?». Det som kan gjøres om, skjer med en gang, og en toast tilbyr «Angre». En dialog brukes bare for det som ikke kan angres, og da sier den det rett ut.

| Situasjon | Gjør | Tekst |
| --- | --- | --- |
| Arkivere en oppgave | Arkiver, vis toast | «Oppgave arkivert» + «Angre» |
| Slette et prosjekt med innhold | Dialog | «Slette prosjektet?» / «Dette fjerner 12 oppgaver og kan ikke angres.» / «Behold» · «Slett prosjekt» |
| Endre en innstilling | Endre med en gang | Ingen tekst, eller «Endringer lagres etter hvert.» øverst |
| Forlate et skjema med endringer | Dialog | «Forkaste endringene?» / «Fortsett å redigere» · «Forkast» |

## Bekreftelser

Tilbakemelding etter hver handling, stille: «Lagret», «Oppgave arkivert», «Kopiert». Fortid, én linje, ingen «Suksess!». Et skjema som viser det lagrede trenger ingen toast.

## Ordliste

De vanlige ordene i et grensesnitt, slik Sassy bruker dem. Samme ord for samme ting over hele appen.

| Norsk | English | Brukes til |
| --- | --- | --- |
| Lagre | Save | Knapp som lagrer et skjema |
| Lagre endringer | Save changes | Når det finnes noe fra før |
| Avbryt | Cancel | Gå ut av et skjema uten å lagre |
| Behold | Keep it | Alternativet til en destruktiv handling |
| Fortsett å redigere | Keep editing | Alternativet til å forkaste endringer |
| Forkast | Discard | Forlate et skjema og miste endringene |
| Slett | Delete | Fjerne noe for godt; nevn objektet: «Slett prosjekt» |
| Fjern | Remove | Ta bort fra en liste eller et valg, ikke slette |
| Angre | Undo | Handlingen i en toast |
| Lukk | Close | Lukkeknappen i en dialog |
| Lukk | Dismiss | Lukkeknappen i en toast (engelsk skiller) |
| Legg til | Add | Nytt element; «Legg til oppgave» |
| Ny | New | Som adjektiv: «Nytt prosjekt» |
| Rediger | Edit | Åpne for endring |
| Ferdig | Done | Avslutte en modus, eller status |
| Neste | Next | Steg framover |
| Tilbake | Back | Steg bakover |
| Søk | Search | Felt og knapp |
| Filtrer | Filter | Snevre inn en liste |
| Innstillinger | Settings | Menypunkt og side |
| Mer | More | Overflyt i menyer |
| Hovedmeny | Main menu | Navnet på navigasjonen |
| Hopp til innholdet | Skip to content | Hopp-lenke |
| Valgfritt | optional | Merket etter en ledetekst |
| Velg … | Choose … | Plassholder i en nedtrekksliste: «Velg en type» |
| Velg fil | Choose file | Filknapp |
| Ta bilde | Take photo | Filknapp med kamera |
| Last opp | Upload | Sende en fil |
| Ny versjon | New version | Oppdateringsvarselet |
| Oppdater | Update | Ta i bruk ny versjon |
| Senere | Later | Utsette |
| Laster | Loading | Ubestemt framdrift |
| Lagrer | Saving | Mens noe lagres |
| Lagret | Saved | Bekreftelse |
| Kopiert | Copied | Bekreftelse |
| Frakoblet | Offline | Uten nett |
| Ingen treff | No results | Søk uten resultat |
| Ingen … ennå | No … yet | Tom liste som skal fylles |
| Prøv igjen | Try again | Etter en feil som kan gjentas |
| Logg inn | Sign in | Konto |
| Logg ut | Sign out | Konto |
| I dag | Today | Dagens visning |
| Denne uka | This week | Ukesvisning |
