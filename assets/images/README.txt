Put all website images in this folder.

Default expected filenames:
- profile-photo.jpg
- project1.jpg
- project2.jpg
- project3.jpg
- project4.jpg
- project5.jpg
- project6.jpg

How it works:
- `src/lib/placeholder-images.json` maps each image `id` to a filename.
- Filename is served from `/api/images/<filename>`.
- If file is missing, app shows a generated "Image Not Found" placeholder.
- You can tune framing per image with:
  - `objectFit`: `cover` or `contain`
  - `objectPosition`: CSS object-position value (e.g. `center`, `top`, `50% 20%`)

Tips:
- Use `.jpg` or `.webp` for better performance.
- Keep a consistent ratio:
  - profile photo: portrait (e.g. 4:5)
  - project image: landscape (e.g. 4:3)
- If image still looks old in browser: hard refresh (`Ctrl+F5`).
