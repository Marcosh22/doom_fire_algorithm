/* All necessary RGB color to render the fire */
const fireColorsPalette = [
    {
        r: 7,
        g: 7,
        b: 7
    },
    {
        r: 31,
        g: 7,
        b: 7
    },
    {
        r: 47,
        g: 15,
        b: 7
    },
    {
        r: 71,
        g: 15,
        b: 7
    },
    {
        r: 87,
        g: 23,
        b: 7
    },
    {
        r: 103,
        g: 31,
        b: 7
    },
    {
        r: 119,
        g: 31,
        b: 7
    },
    {
        r: 143,
        g: 39,
        b: 7
    },
    {
        r: 159,
        g: 47,
        b: 7
    },
    {
        r: 175,
        g: 63,
        b: 7
    },
    {
        r: 191,
        g: 71,
        b: 7
    },
    {
        r: 199,
        g: 71,
        b: 7
    },
    {
        r: 223,
        g: 79,
        b: 7
    },
    {
        r: 223,
        g: 87,
        b: 7
    },
    {
        r: 223,
        g: 87,
        b: 7
    },
    {
        r: 215,
        g: 95,
        b: 7
    },
    {
        r: 215,
        g: 95,
        b: 7
    },
    {
        r: 215,
        g: 103,
        b: 15
    },
    {
        r: 207,
        g: 111,
        b: 15
    },
    {
        r: 207,
        g: 119,
        b: 15
    },
    {
        r: 207,
        g: 127,
        b: 15
    },
    {
        r: 207,
        g: 135,
        b: 23
    },
    {
        r: 199,
        g: 135,
        b: 23
    },
    {
        r: 199,
        g: 143,
        b: 23
    },
    {
        r: 199,
        g: 151,
        b: 31
    },
    {
        r: 191,
        g: 159,
        b: 31
    },
    {
        r: 191,
        g: 159,
        b: 31
    },
    {
        r: 191,
        g: 167,
        b: 39
    },
    {
        r: 191,
        g: 167,
        b: 39
    },
    {
        r: 191,
        g: 175,
        b: 47
    },
    {
        r: 183,
        g: 175,
        b: 47
    },
    {
        r: 183,
        g: 183,
        b: 47
    },
    {
        r: 183,
        g: 183,
        b: 55
    },
    {
        r: 207,
        g: 207,
        b: 111
    },
    {
        r: 223,
        g: 223,
        b: 159
    },
    {
        r: 239,
        g: 239,
        b: 199
    },
    {
        r: 255,
        g: 255,
        b: 255
    }
]

let fireHeight = 40
let fireWidth = 60
let firePropagation = 5
let pixelFireIntensity = []

function startFire() {
    createFireDataStructure();
    setInterval(function () {
        renderFire()
    }, 50);
}

/* Sets all the table cells with the fire intensity 36 (index of color pallete array)  */
function createFireDataStructure() {

    let quantPixels = fireHeight * fireWidth

    for (let i = 0; i < quantPixels; i++) {
        pixelFireIntensity[i] = 36;
    }
}

/* Update cells fire intensity value according to the bellow cell fire intensity value */
function updatePixelFireIntensity(pixelIndex) {

    const belowPixelIndex = pixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * firePropagation)
    const belowPixelFireIntensity = pixelFireIntensity[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    pixelFireIntensity[pixelIndex - decay] = newFireIntensity
}


/* Render the table with the color cells according to each fire intensity index value */
function renderFire() {

    let table = document.getElementById('table')
    let tableHtml = ''
    let pixelIndex = 0

    for (let x = 1; x <= fireHeight; x++) {
        tableHtml += '<tr>'

        for (let y = 1; y <= fireWidth; y++) {

            updatePixelFireIntensity(pixelIndex)

            let color = fireColorsPalette[pixelFireIntensity[pixelIndex]]

            tableHtml += '<td class="pixel" style="background-color: rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')"></td>'
            pixelIndex++
        }

        tableHtml += '</tr>'
    }

    table.innerHTML = tableHtml
}

/* Weaken the fire propagation */
function weakenFire() {
    if (firePropagation + 1 <= 10) {
        firePropagation ++
    } else {
        firePropagation = 10
    }
}

function strengthenFire() {
    if (firePropagation - 1 >= 2) {
        firePropagation--
    } else {
        firePropagation = 2
    }
}

function minFire() {
    firePropagation = 10
}

/* Strengthen the fire propagation */
function maxFire() {
   firePropagation = 2
}

startFire();