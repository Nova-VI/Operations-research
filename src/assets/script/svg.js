function getSVG(x, width = 250, height = 250) {
    svg = "";
    switch (x) {
        case "thunder":
            svg = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" style="height:${width}px;width:${height}px;"
                        viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                        <path
                            d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z" />
                    </svg>
            `;
            break;
        case "plus":
            svg = `
            <?xml version="1.0" encoding="utf-8"?>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  style="height:${width}px;width:${height}px;" >
            <path d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782Z" fill="#FFFFFF" style="stroke: black; stroke-width:.2px"/>
            </svg>
            `;
            break;
        case "city":
            svg = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" style="height:${width}px;width:${height}px;"
                    viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M480 48c0-26.5-21.5-48-48-48L336 0c-26.5 0-48 21.5-48 48l0 48-64 0 0-72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 72-64 0 0-72c0-13.3-10.7-24-24-24S64 10.7 64 24l0 72L48 96C21.5 96 0 117.5 0 144l0 96L0 464c0 26.5 21.5 48 48 48l256 0 32 0 96 0 160 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48l-112 0 0-144zm96 320l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM240 416l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM560 256c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 176l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 304c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM112 320l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zm304-48l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zm16 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16z" />
                </svg>
            `;
            break;
        case "person":
            svg = ` 
            <?xml version="1.0" encoding="UTF-8"?>
            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg class="icon" style="height:${width}px;width:${height}px;">
                <path fill="white" style="stroke-width:.2px;stroke:black" d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"/>
            </svg>
            `;
            break;
        case "transmitter":
            svg = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="icon" style="height:${width}px;width:${height}px;"
	 viewBox="0 0 512 512"  xml:space="preserve">
<g>
	<path class="st0" d="M510.827,231.327c-5.502-57.391-30.323-113.33-74.334-157.025l-19.511,19.632
		c44.885,44.598,67.314,103.252,67.331,162.053c0,3.642-0.09,7.283-0.262,10.924c-2.596,54.586-24.555,108.328-65.994,150.062
		l19.649,19.502c43.342-43.621,67.736-99.143,73.142-156.049c0.771-8.128,1.156-16.288,1.152-24.44
		C512.004,247.762,511.61,239.528,510.827,231.327z"/>
	<path class="st0" d="M363.598,303.34c6.614-15.073,10.038-31.213,10.034-47.353c0.008-30.212-11.596-60.548-34.698-83.486
		l-19.511,19.65c17.682,17.574,26.498,40.628,26.522,63.836c-0.024,22.996-8.677,45.868-26.104,63.428l19.642,19.51h0.004h0.004
		C349.98,328.362,357.944,316.24,363.598,303.34z"/>
	<path class="st0" d="M387.713,123.393l-19.511,19.65c31.279,31.082,46.91,71.939,46.926,112.944
		c-0.016,40.645-15.369,81.166-46.188,112.208l19.658,19.51c36.143-36.388,54.226-84.127,54.218-131.718
		C442.824,207.978,424.413,159.838,387.713,123.393z"/>
	<path class="st0" d="M27.949,245.063c2.596-54.594,24.554-108.327,65.994-150.054L74.302,75.498
		C24.767,125.345-0.017,190.74,0,255.987c-0.017,65.806,25.21,131.742,75.507,181.711l19.511-19.641
		c-44.885-44.598-67.315-103.268-67.331-162.07C27.687,252.346,27.777,248.697,27.949,245.063z"/>
	<path class="st0" d="M143.051,143.781l-19.642-19.502c-36.142,36.364-54.233,84.11-54.216,131.709
		c0,6.004,0.283,12.006,0.856,17.985c4.014,41.875,22.127,82.716,54.238,114.61l19.518-19.65
		c-31.295-31.081-46.91-71.94-46.926-112.945C96.896,215.343,112.239,174.814,143.051,143.781z"/>
	<path class="st0" d="M166.055,255.987c0.025-22.996,8.685-45.86,26.104-63.41l-19.642-19.518
		c-22.758,22.881-34.157,52.979-34.149,82.929c-0.008,30.205,11.596,60.54,34.698,83.487l19.518-19.634
		c-15.479-15.401-24.164-34.977-26.108-55.168C166.198,261.786,166.059,258.883,166.055,255.987z"/>
	<path class="st0" d="M255.889,221.387c-19.117,0.057-34.559,15.607-34.494,34.724c0.066,19.116,15.607,34.559,34.723,34.502
		c19.117-0.065,34.559-15.615,34.494-34.732C290.547,236.764,275.006,221.33,255.889,221.387z"/>
</g>
</svg>
            `;
            break;

        case "trash":
            svg = `
                <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="height:${width}px;width:${height}px;" >
                    <path d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                `
            break;
        default:
            svg = "";
    }
    return svg;
}