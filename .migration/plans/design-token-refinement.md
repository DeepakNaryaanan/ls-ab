# Update Navigation Content & Open in DA.live

## Status: READY FOR EXECUTION

Navigation content is already migrated. To open in DA.live for editing, the DA organization and site name are needed from the user.

> **Execution requires Execute mode.** Once the DA org/site is provided, the workflow will push the `nav.md` and `footer.md` content to DA.live and open the editor.

---

## Current Navigation Content

### Header (`nav.md` / `fragments/nav/header.html`)

```
Brand:    Ensure Logo → /home
Links:    Products | Sign Up & Save | Recipes | Health Articles
Tools:    Buy Now → /where-to-buy-ensure
```

### Footer (`footer.md` / `fragments/nav/footer.html`)

```
Columns:  Site Pages (6) | Abbott (3) | Abbott Brands (3)
Legal:    Unsubscribe | Privacy Policy | Terms of Use | Your Privacy Choices
Copyright: © 2026 Abbott. All rights reserved.
```

---

## DA.live Workflow

To open navigation in DA.live for editing:

1. **Confirm DA org/site** — User provides `org/site` identifier (e.g., `aemdemos/ensure`)
2. **Push nav.md to DA** — Upload navigation markdown to DA.live storage
3. **Open DA editor** — Navigate browser to `https://da.live/edit#/{org}/{site}/nav`
4. **Push footer.md to DA** — Upload footer markdown to DA.live storage
5. **Open footer editor** — Navigate to `https://da.live/edit#/{org}/{site}/footer`

---

## Checklist

- [x] Navigation content created (nav.md + fragments/nav/header.html)
- [x] Footer content created (footer.md + fragments/nav/footer.html)
- [ ] Get DA org/site name from user
- [ ] Push nav.md content to DA.live
- [ ] Open nav in DA.live editor for editing
- [ ] Push footer.md content to DA.live
- [ ] Open footer in DA.live editor for editing
- [ ] Preview updated navigation on live site

---

## Information Needed

| Item | Status |
|------|--------|
| DA organization name | ⏳ User to provide (e.g., `aemdemos`) |
| DA site name | ⏳ User to provide (e.g., `ensure`) |
| DA.live URL format | `https://da.live/edit#/{org}/{site}/nav` |

---

## Notes

- DA.live provides a visual editor for markdown content — authors can update navigation links without touching code
- After editing in DA.live, content is published and the header/footer auto-update on the live site
- The `fragments/nav/header.html` file is the runtime version used by the local dev server; DA.live manages the production version via `nav.md`
- To proceed with execution, switch to Execute mode and provide the DA org/site identifier
