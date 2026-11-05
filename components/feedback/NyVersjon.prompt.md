«Ny versjon»: a new version of the app is ready. A toast with «Oppdater» and «Senere», announced politely, no focus stolen.

```jsx
import { NyVersjon, startOppdatering, vedNyVersjon, oppdater } from 'sussi/components';

startOppdatering('/sw.js');                                   // once, at load; sw.js does skipWaiting + clients.claim
function Oppdatering() {
  const [vis, setVis] = useState(false);
  useEffect(() => vedNyVersjon(() => setVis(true)), []);
  return <NyVersjon open={vis} onUpdate={oppdater} onLater={() => setVis(false)} />;
}
```

- Keep it mounted from the start and open it with `open`: its ToastStack is the live region (`role="status"`, polite), and a region that arrives already filled is read by no one. Focus stays where it was.
- «Oppdater» calls `onUpdate` (a reload, `oppdater()`); «Senere» calls `onLater`, which closes it. Leave `onLater` out when the notice must stay.
- `updating` while the app waits for a save to finish before it reloads: «Oppdater» is disabled; say so in `description`.
- Norwegian by default. English surfaces pass `title="New version"`, `updateLabel="Update"`, `laterLabel="Later"` and `lang="en"`.
- It sits bottom right, above AppShell's tab bar on a phone and spans the width under 480 px. In an app with its own `ToastStack`, render it inside that stack with `stack={false}`. `stackProps` reaches the stack it renders (`stackProps={{ id: 'ny-versjon' }}`); `id`, `data-*`, `aria-*` and `lang` reach the toast.
- `startOppdatering(swUrl, { opptatt })` registers the service worker, asks for a new one when the app comes to the foreground and every 30 minutes, and on `controllerchange` reloads at once unless you are in the middle of something (focus or text in a field, an open dialog, or the app's own `opptatt()`), in which case `vedNyVersjon` listeners are told. `oppdater()` reloads once.
