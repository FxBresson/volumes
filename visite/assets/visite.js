class Visite {
    constructor() {
        const t = this

        console.warn('START VISITE CLASS')
        t.$panorama = document.getElementById("panorama")
        t.$popup = document.getElementById("popup")

        t.$close = document.getElementById('close')

        t.createView()
    }

    createView(){
        const t = this

        pannellum.viewer('panorama', {
            "type": "equirectangular",
            "panorama": "assets/foodlab_color.jpg",
            "autoLoad": true,
            "showControls": false,
            "vaov": 120,
            "haov": 360,
            "hotSpots": [
                {
                    "pitch": -10, // vertical
                    "yaw": -11, // horizontal
                    "cssClass": "hotspot",
                    "createTooltipFunc": t.bindEvents.bind(t),
                },
                {
                    "pitch": 0, // vertical
                    "yaw": -150, // horizontal
                    "cssClass": "hotspot",
                    "createTooltipFunc": t.bindEvents.bind(t),
                }
            ]
        })
    }

    bindEvents(event) {
        const t = this

        event.addEventListener('click', t.showPopUp.bind(t))

        t.$close.addEventListener('click', t.closePopUp.bind(t))
    }

    showPopUp() {
        const t = this

        t.$popup.style.display = "block"

    }

    closePopUp() {
        const t = this

        t.$popup.style.display = "none"
    }
}
