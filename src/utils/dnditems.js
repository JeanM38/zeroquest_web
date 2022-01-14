export const itemsTest = [
    {
        name: "Orc", 
        index: "orc1",
        parent: ["enemy"],
        type: "enemy",
        subtype: "orc"
    }, 
    {
        name: "Orc", 
        index: "orc2",
        parent: ["r1"],
        type: "enemy",
        subtype: "orc"
    },
    {
        name: "Orc", 
        index: "orc3",
        parent: ["enemy"],
        type: "enemy",
        subtype: "orc"
    },
    {
        index: "table1",
        parent: ["r2"],
        type: "furniture",
        subtype: "table",
        properties : {
            width: 3,
            height: 2,
            rotate: 0
        }
    },
    {
        index: "chest1",
        parent: ["r3"],
        type: "furniture",
        subtype: "chest",
        properties : {
            width: 1,
            height: 1,
            rotate: 0
        }
    },
    {
        index: "trap1",
        parent: ["r4"],
        type: "trap",
        subtype: "trap",
        properties : {
            width: 2,
            height: 1,
            rotate: 0
        }
    },
    {
        index: "trap2",
        parent: ["r5"],
        type: "trap",
        subtype: "trap",
        properties : {
            width: 2,
            height: 1,
            rotate: 0
        }
    },
];