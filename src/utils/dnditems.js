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
        parent: [1],
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
        parent: [25],
        type: "furniture",
        subtype: "table",
        properties: {
            width: 3,
            height: 2,
            rotate: 0
        }
    },
    {
        index: "table2",
        parent: [192, 193, 194, 218, 219, 220],
        type: "furniture",
        subtype: "table",
        properties: {
            width: 3,
            height: 2,
            rotate: 0
        }
    },
    {
        index: "chest1",
        parent: ["r9"],
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
        parent: [5],
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
        parent: [10],
        type: "trap",
        subtype: "trap",
        properties : {
            width: 2,
            height: 1,
            rotate: 0
        }
    },
    {
        index: "trap3",
        parent: [25],
        type: "trap",
        subtype: "trap",
        properties : {
            width: 3,
            height: 1,
            rotate: 0
        }
    },
    {
        index: "door1",
        parent: ["door"],
        type: "door",
        properties : {
            width: 1,
            height: 1,
            rotate: 1
        }
    },
    {
        index: "door1",
        parent: ["door"],
        type: "door",
        properties : {
            width: 1,
            height: 1,
            rotate: 3
        }
    },
    {
        index: "spawn1",
        parent: ["spawn"],
        type: "spawn",
        subtype: "stairs",
        properties : {
            width: 2,
            height: 2,
            rotate: 0
        }
    },
    {
        index: "spawn2",
        parent: ["spawn"],
        type: "spawn",
        subtype: "indeSpawn",
        properties : {
            width: 1,
            height: 1,
            rotate: 0
        }
    },
];