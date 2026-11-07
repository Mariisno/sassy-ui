---
navn: Dato
gruppe: utils
status: new
sidenVersjon: 0.7.0
side: https://mariisno.github.io/sassy-ui/komponenter/dato/
typer: dist/utils/dato.d.ts
---

# Dato

Datoer på norsk, og på engelsk for engelske flater: funksjoner uten rammeverk og uten avhengigheter, bygd på `Intl.DateTimeFormat` med nb-NO og en-GB, så månedsnavnene og rekkefølgen kommer fra nettleseren. `formatDato` gir «30. okt. 2026» eller «30. oktober 2026», `formatRelativ` «i dag», «i går» og «i morgen», `formatTid` «14:30» og `formatTidsrom` «14:30–15:15». En dato uten klokkeslett («2026-10-30», det `<input type="date">` og en datokolonne i en database gir) leses som en lokal kalenderdag, aldri som midnatt UTC, og dager sammenliknes på kalenderdato, så et bytte til eller fra sommertid flytter aldri en dato.

## Når du bruker den

- En dato i en liste eller et kort: «Sådd 14. mars», «30. okt. 2026».
- Når en oppføring skjedde: «i dag», «i går», ellers datoen.
- Et klokkeslett eller en økt fra–til: «14:30», «14:30–15:15».
- Fra en Date til `YYYY-MM-DD` for lagring, og tilbake.

## Når du ikke bruker den

- Varigheter («2 t 15 min») og nedtellinger: det regner appen selv.
- En kalender eller et ukeoppsett: det er oppsett, ikke formatering.
- Andre språk enn norsk og engelsk; da bruker du `Intl` direkte med det språket.
- Å regne med datoer (legge til dager, finne ukenummer): `tilDato` gir deg en Date, resten gjør appen.

## Gjør

- Send strengen rett inn: `formatDato('2026-10-30')`. `tilDato` leser den som en lokal dag.
- Bruk `formatRelativ` i logger og lister der «i dag» og «i går» sier mer enn datoen, og `formatDato` der datoen skal stå fast.
- Lagre dager som `tilIsoDato(d)` («2026-10-30») og klokkeslett som Date eller ISO med sone.
- Send `naa` i tester, så «i dag» er en fast dag.
- Send `lang: 'en'` på engelske flater; alt annet er likt.

## Ikke gjør

- Ikke `new Date('2026-10-30')` for en dag: det er midnatt UTC, og dagen før vest for Greenwich.
- Ikke regn «i går» som «for 24 timer siden»; dager er kalenderdager, også den som er 23 eller 25 timer lang.
- Ikke skriv månedsnavn eller «i dag» selv; da må de oversettes og holdes i takt.
- Ikke vis `''` som en dato: en verdi som ikke er en dato, gir tom streng, og da tar du linja bort.
- Ikke stol på andre formater enn «YYYY-MM-DD», «YYYY-MM-DDTHH:mm» og ISO med sone: alt annet går til Date-konstruktøren, som leser det ulikt fra nettleser til nettleser.

## Eksempel

```jsx
import { formatDato, formatRelativ, formatTid, formatTidsrom, tilDato, tilIsoDato } from 'sassy/components';

formatDato('2026-10-30');                        // «30. okt. 2026»
formatDato('2026-10-30', { stil: 'lang' });      // «30. oktober 2026»
formatDato('2026-10-30', { lang: 'en' });        // «30 Oct 2026»
formatDato('2026-10-30', { aar: 'auto' });       // «30. okt.» i år, «30. okt. 2025» i fjor
formatRelativ('2026-10-29');                     // «i går»; ellers «29. okt.»
formatTid('2026-10-30T14:30');                   // «14:30»
formatTidsrom('2026-10-30T14:30', '2026-10-30T15:15');   // «14:30–15:15»
tilIsoDato(new Date());                          // «2026-10-30»
tilDato('2026-02-30');                           // null

function Rad({ oppforing }) {
  return <span className="meta">{formatRelativ(oppforing.dato)} · {formatTid(oppforing.start)}</span>;
}
```

## Props

Typene står i `dist/utils/dato.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/dato/).

Alle funksjonene tar en `DatoVerdi`: en Date, et tidsstempel i ms, eller en streng. «YYYY-MM-DD» og «YYYY-MM-DDTHH:mm[:ss]» uten sone er lokale; alt annet (ISO med sone) går til Date-konstruktøren. `tilDato(verdi)` gir en Date eller `null`; `tilIsoDato(verdi)` gir «YYYY-MM-DD» for den lokale dagen; `erSammeDag(a, b)` sammenlikner kalenderdager. `formatDato`, `formatDatoTid` og `formatRelativ` tar valgene under; `formatTid` bare `lang`; `formatTidsrom(fra, til, valg)` i tillegg `dato`. En verdi som ikke er en dato, gir tom streng. Enhetstestet, også under `TZ=Europe/Oslo` og `TZ=America/Los_Angeles`.

<!-- props: DatoValg -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `lang` | `'nb' \| 'en'` | `'nb'` | Språket: «nb» (nb-NO) eller «en» (en-GB). Standard «nb». |
| `stil` | `'kort' \| 'lang'` | `'kort'` | «kort» er «30. okt. 2026», «lang» er «30. oktober 2026» (en «30 Oct 2026», «30 October 2026»). Standard «kort». |
| `aar` | `boolean \| 'auto'` | – | Årstallet: `true` alltid, `false` aldri, `'auto'` bare når det ikke er i år. Standard true; formatRelativ bruker 'auto'. |
| `naa` | `DatoVerdi` | – | Hva «nå» er, for «i dag» og `aar: 'auto'`. Standard klokka; en test sender en fast dato. |
<!-- /props -->

<!-- props: TidsromValg -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `dato` | `boolean` | – | Sett datoen foran et tidsrom på én dag: «30. okt. 2026 kl. 14:30–15:15». Standard false; et tidsrom over flere dager har alltid datoene. |

Pluss alle propsene til `DatoValg`.
<!-- /props -->

## Tilgjengelighet

Hjelperen rendrer ingenting; det som gjelder, er teksten den gir.

- **Lesbarhet.** «30. okt. 2026» og «i går» leses av en skjermleser som vanlig tekst i sidas språk. Sett `lang` på elementet når en engelsk dato står på en norsk side, eller omvendt.
- **Forkortelser.** «okt.» er Intl sin forkortelse. Der plassen tillater det, gir `stil: 'lang'` hele navnet, som er lettere å høre.
- **Tidsrom.** Tankestreken i «14:30–15:15» leses som «til» av de fleste skjermlesere; skriv «fra 14:30 til 15:15» i en setning der det teller.
- **Relativt.** «i dag» sier ingenting om hvilken dag det er; gi datoen et annet sted (en `title`, en overskrift) der folk kan komme tilbake til lista senere.
- **Kjente grenser.** Ingen ukedag, ingen varigheter, ingen `<time datetime>`; sett `dateTime={tilIsoDato(d)}` selv på et `<time>`. Månedsnavnene kommer fra nettleserens ICU og kan skille seg litt (en-GB gir «Sept» i noen og «Sep» i andre), så en forhåndsrendret side formaterer datoer etter hydrering, ellers kan teksten hoppe. Andre strengformater enn de tre over går til Date-konstruktøren og leses ulikt fra nettleser til nettleser.

## Innhold

- Kort form i lister og kort: «30. okt. 2026». Lang form i en overskrift eller en setning: «30. oktober 2026».
- Årstall bare når det ikke er i år: `aar: 'auto'`.
- «i dag», «i går», «i morgen» med liten forbokstav, som Intl gir dem; stor bare først i en setning.
- Klokkeslett med kolon, «14:30», i begge språk. Tidsrom på én dag uten mellomrom rundt streken: «14:30–15:15».
- På engelsk: «30 Oct 2026», «30 October 2026», «today», «yesterday», «14:30».
