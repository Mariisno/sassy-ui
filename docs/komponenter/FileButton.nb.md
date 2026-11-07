---
navn: FileButton
gruppe: buttons
status: new
sidenVersjon: 0.5.7
side: https://mariisno.github.io/sassy-ui/komponenter/filebutton/
typer: dist/buttons/FileButton.d.ts
---

# FileButton

En knapp som åpner filvelgeren. Den ser ut som [Button](Button.nb.md) med de samme variantene og størrelsene, men er en `<label class="s-btn">` rundt et visuelt skjult `<input type="file">`. Feltet står i tabrekkefølgen, så Tab lander på det og etiketten viser fokusringen. `onFiles` får filene som ble valgt, og feltet nullstilles etter hvert valg.

## Når du bruker den

- Ta eller velge et bilde: `accept="image/*"`, og `capture="environment"` for kameraet bak på telefon.
- Hente en sikkerhetskopi eller en eksportfil: `accept=".json,application/json"`.
- Flere filer om gangen med `multiple`.

## Når du ikke bruker den

- Dra og slipp eller en hel opplastingsflate: det er appens egen komponent. FileButton er bare knappen.
- En handling som ikke åpner filvelgeren: [Button](Button.nb.md).
- Vise hvor langt en opplasting er kommet: [Progress](Progress.nb.md).

## Gjør

- Si utfallet i teksten: «Ta bilde», «Velg fil», «Hent fra sikkerhetskopi». Aldri «Bla gjennom».
- Sett `accept`, så velgeren bare viser det som passer.
- Gi tilbakemelding etter valget (navnet på fila, et forhåndsvisningsbilde, en toast). Knappen selv viser ingenting.
- Bruk `ref.current.click()` når appen vil åpne velgeren fra et annet sted; `ref` når feltet.

## Ikke gjør

- Ikke legg en `Button` inni en `FileButton`. Det blir en knapp i en etikett.
- Ikke stol på `capture` på skrivebordet; der åpner velgeren som vanlig.
- Ikke utelat teksten. Det finnes ingen innebygd.
- Ikke `disabled` uten en forklaring ved siden av.

## Eksempel

```jsx
import { FileButton } from 'sassy/components';

<FileButton iconLeft="image" accept="image/*" capture="environment" onFiles={([fil]) => taBilde(fil)}>Ta bilde</FileButton>
<FileButton variant="secondary" iconLeft="image" accept="image/*" multiple onFiles={leggTil}>Velg bilder</FileButton>
<FileButton variant="ghost" size="sm" accept=".json,application/json" onFiles={([fil]) => gjenopprett(fil)}>Hent fra sikkerhetskopi</FileButton>
```

## Props

Typene står i `dist/buttons/FileButton.d.ts`. Et levende eksempel står på [sida på dokumentasjonssiden](https://mariisno.github.io/sassy-ui/komponenter/filebutton/).

<!-- props: FileButtonProps -->
| Prop | Type | Standard | Beskrivelse |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'ghost' \| 'danger'` | `'primary'` | Samme varianter som Button. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Samme størrelser som Button. |
| `iconLeft` | `string` | – | Lucide-ikon foran teksten, f.eks. «image» eller «upload». |
| `iconRight` | `string` | – | Lucide-ikon etter teksten. |
| `fullWidth` | `boolean` | `false` | Fyller bredden. |
| `accept` | `string` | – | Hva velgeren tilbyr, f.eks. «image/*» eller «.json,application/json». |
| `capture` | `'user' \| 'environment'` | – | På telefon: åpne kameraet i stedet for biblioteket. «environment» er kameraet bak, «user» det foran. |
| `multiple` | `boolean` | `false` | Flere filer om gangen. |
| `disabled` | `boolean` | `false` | Slått av: tar verken fokus eller klikk. |
| `onFiles` | `(files: File[]) => void` | – | Filene som ble valgt, aldri tom. Feltet nullstilles etter hvert valg, så samme fil to ganger gir to kall. |
| `className` | `string` | – | Går til `<label>`, ikke til feltet. |
| `style` | `React.CSSProperties` | – | Går til `<label>`, ikke til feltet. |
| `children` | `React.ReactNode` | – | Teksten på knappen. |

Pluss alle attributtene til `<input>` (`React.InputHTMLAttributes<HTMLInputElement>`), unntatt `type`, `size`, `value`, `children`.
<!-- /props -->

`className` og `style` går til etiketten. Alt annet (`id`, `name`, `aria-describedby`) går til feltet, og `ref` når feltet.

## Tilgjengelighet

Oppførselen er testet i nettleseren, reglene i enhetstester.

- **Element og rolle.** En `<label>` med knappeklassene rundt et `<input type="file">`. Feltet er skjult med `clip`, ikke `display:none`, så det beholder tastaturfokus.
- **Tastatur.** Tab lander på feltet. Enter åpner velgeren (testet; mellomrom er nettleserens vanlige oppførsel for et filfelt). Et slått av felt hoppes over av Tab.
- **Navn.** Etikettens tekst, altså `children`, gjennom `<label>`. Ikonene er dekorative.
- **Fokus.** Etiketten viser en 2 px ring i `--focus-color` med 2 px avstand når feltet har tastaturfokus (`:has(:focus-visible)`), som Button. Med mus vises ingen ring.
- **Tilstand.** `disabled` setter `disabled` på feltet og gir etiketten 50 % gjennomsiktighet, `not-allowed`-peker og `pointer-events:none`. Et klikk åpner ingenting.
- **Valg.** `onFiles` kalles bare med en ikke-tom liste. Feltet nullstilles, så samme fil to ganger på rad gir to kall.
- **Mål og kontrast.** Som Button: 30/38/46 px, samme fyll og tekst.
- **Innebygd tekst.** Ingen. Teksten er din.
- **Kjent grense.** Fokusringen bruker `:has()`, som trenger en nettleser som støtter det.

## Innhold

- Verbet først: «Ta bilde», «Velg fil», «Last opp bilde».
- Nevn hva som velges når det ikke er opplagt: «Velg bilder», «Hent sikkerhetskopi (.json)».
- Si hva som skjer etterpå et annet sted, i en toast eller ved forhåndsvisningen: «Bildet er lagt til».
- Avvist fil? Forklar hvorfor, uten skyld: «Fila er over 20 MB. Prøv en mindre.»
