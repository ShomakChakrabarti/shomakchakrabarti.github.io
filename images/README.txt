portrait.jpg    -> photo beside your name, 4:5 portrait crop, about 800 x 1000 px.
                   In index.html (SITE block):  portrait: "images/portrait.jpg"
background.jpg  -> full-screen photo behind every page, seen through the purple tint. About 2400 px wide, under 600 KB.
                   In index.html (SITE block):  background: "images/background.jpg"
photos/         -> photographs for the Photos page, named 01.jpg, 02.jpg, ... (about 2000 px long edge).
                   On each entry in SITE.photos:  src: "images/photos/01.jpg"
How much of the photo shows through: change --overlay-top / --overlay-mid / --overlay-bottom near the top of the <style> (lower % = more photo).
