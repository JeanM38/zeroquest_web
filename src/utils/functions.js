/**
 * @description Set a background image for a square
 * @param {string} room
 * @returns Url's image
 */
export const setSquareBg = (room) => {
    switch(room) {
        case "corridor":
            return "grey";
        case "r1":
            return "red"
        case "r2":
            return "blue"
        case "r3":
            return "green"
        case "r4":
            return "orange"
        case "r5":
            return "purple"
        case "r6":
            return "brown"
        case "r7":
            return "yellow"
        case "r8":
            return "pink"
        case "r9":
            return "black"
        case "r10":
            return "darkgrey"
        case "r11":
            return "darkorange"
        case "r12":
            return "darkblue"
        case "r13":
            return "aquamarine"
        case "r14":
            return "blueviolet"
        case "r15":
            return "cyan"
        case "r16":
            return "firebrick"
        case "r17":
            return "gold"
        case "r18":
            return "khaki"
        case "r18":
            return "orchid"
        case "r19":
            return "salmon"
        case "r20":
            return "tan"
        case "r21":
            return "teal"
        case "r22":
            return "stateblue"
        default:
            break;
    }   
}