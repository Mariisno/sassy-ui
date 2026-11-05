«Tilbake»: a standalone Link with a chevron before the text, at the top of a page that was opened from another. Built on Link, so `href`, or `as` with `to` for a router.

```jsx
<BackLink href="/planter" />                                  {/* «Tilbake» */}
<BackLink href="/planter">Tilbake til planter</BackLink>
<BackLink as={RouterLink} to="/uke" />                        {/* React Router keeps client-side routing */}
<BackLink href="/plants">Back</BackLink>                      {/* English surfaces */}
```

- The default text is «Tilbake»; name the place when the page has more than one way back: «Tilbake til planter».
- It goes to a known place, never `history.back()`: a link has an `href`, and the back link works when the page was opened from a bookmark too. A step back in a flow on the page is a `Button` with `onClick`.
- One per page, first in the content, before the heading. The chevron is decorative; the text carries the meaning.
- `as={RouterLink}` with `to` in an app with React Router. The ref reaches the `<a>`.
- Medium weight and at least 24 px tall, the accent text colour and the underline from base.css: on `--bg`, `--surface-1` or `--surface-2`, where the colour holds 4.5:1.
