# Content and microcopy

Sassy sounds like a calm, competent colleague: someone who knows psychology, respects your attention and never makes you feel stupid. These are the rules for every piece of text in a Sassy interface, Norwegian first and English as the second language. Every component has its own "Content" section in `docs/komponenter/`; this is the ground they build on.

## The voice

- **Person.** *You* for the person using the app, *I* for the owner on personal surfaces (a website, an about page). *We* only when the product does something on your behalf: "We'll save when you're back." Never "the user".
- **Sentence case.** A capital only at the start of the sentence, everywhere: buttons, titles, tabs, menu items. Never ALL CAPS. Meta text in monospace is lower case or sentence case ("updated 2 min ago").
- **Short.** One idea per sentence. Cut filler: "simply", "just", "please note".
- **Low pressure.** No streaks lost, no fake urgency, no dark patterns. "Three things, not thirty." "No streaks, no guilt."
- **No emoji** in the interface or product copy. Use an icon from the set. Unicode is fine for keyboard hints (⌘K), arrows (→) and separators (·).
- **Numbers and meta** in monospace: `12 / 30 tasks`, `v0.5.7`, `24 Sep`.
- **Norwegian first.** Public surfaces are bilingual with Norwegian as the default and English as the second language. Offer a text toggle (`NO` / `EN`), never flags. Remember the choice and set `<html lang>`. The components' built-in text is Norwegian ("Lukk", "Fjern …", "Valgfritt", "Hovedmeny", "Mer", "Hopp til innholdet", "Ny versjon", "Oppdater", "Senere"); English surfaces pass their own through the props.

## Buttons

- The button names the outcome, verb first: "Delete project", "Add task", "Keep it".
- Never "OK", "Submit", "Yes" or "No".
- The primary button in a dialog repeats the verb from the title. The alternative says what happens instead.
- One to three words. The explanation belongs in the text above.

## Error messages

The pattern: **what happened + what to do now.** Never blame, never codes, never exclamation marks.

- "That doesn't look like an email yet."
- "Couldn't upload the picture. The file is over 20 MB."
- "That name is taken. Try another."
- "Choose a type."

Not: "Invalid value!", "Error 422", "You typed it wrong". The error sits where the field is (`error` on the field), shows on blur or on submit, and is announced when it appears. "yet" in an error says it can be fixed.

## Empty states

An empty list is not an error. Say what is empty, then one next step, then at most one action.

- "No tasks yet." + "Add the first one and it shows up here." + "Add task".
- "No results." + "Try a shorter word, or clear a filter."
- "You're offline." + "What you do now is saved when the network is back."

Not "Oops", not "Get started now!", not "You haven't done anything yet". "yet" only when something will come later.

## Confirm or undo

Undo beats "Are you sure?". What can be reversed happens at once, and a toast offers "Undo". A dialog is used only for what cannot be undone, and then it says so plainly.

| Situation | Do | Text |
| --- | --- | --- |
| Archive a task | Archive, show a toast | "Task archived" + "Undo" |
| Delete a project with content | Dialog | "Delete the project?" / "This removes 12 tasks and can't be undone." / "Keep it" · "Delete project" |
| Change a setting | Change at once | No text, or "Changes save as you go." at the top |
| Leave a form with changes | Dialog | "Discard the changes?" / "Keep editing" · "Discard" |

## Confirmations

Feedback after every action, quietly: "Saved", "Task archived", "Copied". Past tense, one line, no "Success!". A form that shows what was saved needs no toast.

## Word list

The common words in an interface, as Sassy uses them. The same word for the same thing across the app.

| Norsk | English | Used for |
| --- | --- | --- |
| Lagre | Save | A button that saves a form |
| Lagre endringer | Save changes | When something existed before |
| Avbryt | Cancel | Leave a form without saving |
| Behold | Keep it | The alternative to a destructive action |
| Fortsett å redigere | Keep editing | The alternative to discarding changes |
| Forkast | Discard | Leave a form and lose the changes |
| Slett | Delete | Remove something for good; name the object: "Delete project" |
| Fjern | Remove | Take out of a list or a selection, not delete |
| Angre | Undo | The action in a toast |
| Lukk | Close | The close button of a dialog |
| Lukk | Dismiss | The close button of a toast (English tells them apart) |
| Legg til | Add | A new item; "Add task" |
| Ny | New | As an adjective: "New project" |
| Rediger | Edit | Open for change |
| Ferdig | Done | Leave a mode, or a status |
| Neste | Next | A step forward |
| Tilbake | Back | A step back |
| Søk | Search | Field and button |
| Filtrer | Filter | Narrow a list |
| Innstillinger | Settings | Menu item and page |
| Mer | More | Overflow in menus |
| Hovedmeny | Main menu | The name of the navigation |
| Hopp til innholdet | Skip to content | The skip link |
| Valgfritt | optional | The marker after a label |
| Velg … | Choose … | A placeholder in a dropdown: "Choose a type" |
| Velg fil | Choose file | A file button |
| Ta bilde | Take photo | A file button with the camera |
| Last opp | Upload | Sending a file |
| Ny versjon | New version | The update notice |
| Oppdater | Update | Apply the new version |
| Senere | Later | Postpone |
| Laster | Loading | Indeterminate progress |
| Lagrer | Saving | While something saves |
| Lagret | Saved | A confirmation |
| Kopiert | Copied | A confirmation |
| Frakoblet | Offline | No network |
| Ingen treff | No results | A search with nothing found |
| Ingen … ennå | No … yet | An empty list that will be filled |
| Prøv igjen | Try again | After an error that can be repeated |
| Logg inn | Sign in | Account |
| Logg ut | Sign out | Account |
| I dag | Today | The day view |
| Denne uka | This week | The week view |
