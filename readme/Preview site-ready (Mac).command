#!/bin/bash
# Previews site-ready-23-nov in your browser at http://localhost:8010
# (not uploaded to GitHub: it sits outside the site folder).
cd "$(dirname "$0")/site-ready-23-nov" || exit 1
chmod -R u+rwX . 2>/dev/null
xattr -rc . 2>/dev/null
echo "Previewing your website at http://localhost:8010"
echo "Close this window (or press Ctrl+C) to stop."
(sleep 1; open "http://localhost:8010") &
python3 -m http.server 8010
