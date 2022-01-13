export const enemies = [
    {
        /* Stock a name, usefull on special enemies */
        name: "Orc", 
        /* Will be stored in a parent element, set it to filled or not.
		   Used for target the element in this array */
        index: "orc1",
        /* Stored his grid (or deck) position,
		   in this case, will be in the "enemy" deck */
        parent: ["enemy"],
        /* Item category, usefull for conditions, for example:
           An enemy can't be dropped inside the "trap" deck
        */
        type: "enemy",
        /* Used to construct image url (.../{item.subtype}/png)
           and to store enemy subtype in db
        */
        subtype: "orc"
    }, 
    {
        name: "Orc", 
        index: "orc2",
        parent: ["enemy"],
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
        name: "Orc", 
        index: "orc4",
        parent: ["enemy"],
        type: "enemy",
        subtype: "orc"
    }, 
    {
        name: "Orc", 
        index: "orc5",
        parent: ["enemy"],
        type: "enemy",
        subtype: "orc"
    }, 
    {
        name: "Orc", 
        index: "orc6",
        parent: ["enemy"],
        type: "enemy",
        subtype: "orc"
    }, 
    {
        name: "Orc", 
        index: "orc7",
        parent: ["enemy"],
        type: "enemy",
        subtype: "orc"
    }, 
    {
        name: "Orc", 
        index: "orc8",
        parent: ["enemy"],
        type: "enemy",
        subtype: "orc"
    }, 
    {
        name: "Mummy", 
        index: "mummy1",
        parent: ["enemy"],
        type: "enemy",
        subtype: "mummy"
    },
    {
        name: "Mummy", 
        index: "mummy2",
        parent: ["enemy"],
        type: "enemy",
        subtype: "mummy"
    },
    {
        name: "Chaos warrior", 
        index: "chaos_warrior1",
        parent: ["enemy"],
        type: "enemy",
        subtype: "chaos_warrior"
    }, 
    {
        name: "Chaos warrior", 
        index: "chaos_warrior2",
        parent: ["enemy"],
        type: "enemy",
        subtype: "chaos_warrior"
    }, 
    {
        name: "Chaos warrior", 
        index: "chaos_warrior3",
        parent: ["enemy"],
        type: "enemy",
        subtype: "chaos_warrior"
    }, 
    {
        name: "Chaos warrior", 
        index: "chaos_warrior4",
        parent: ["enemy"],
        type: "enemy",
        subtype: "chaos_warrior"
    },
    {
        name: "Fimmir",
        index: "fimmir1", 
        parent: ["enemy"],
        type: "enemy",
        subtype: "fimmir"
    },
    {
        name: "Fimmir",
        index: "fimmir2", 
        parent: ["enemy"],
        type: "enemy",
        subtype: "fimmir"
    },
    {
        name: "Fimmir",
        index: "fimmir3", 
        parent: ["enemy"],
        type: "enemy",
        subtype: "fimmir"
    },
    {
        name: "Gargoyle", 
        index: "gargoyle",
        parent: ["enemy"],
        type: "enemy",
        subtype: "gargoyle"
    }, 
    {
        name: "Goblin", 
        index: "goblin1",
        parent: ["enemy"],
        type: "enemy",
        subtype: "goblin"
    },
    {
        name: "Goblin", 
        index: "goblin2",
        parent: ["enemy"],
        type: "enemy",
        subtype: "goblin"
    },
    {
        name: "Goblin", 
        index: "goblin3",
        parent: ["enemy"],
        type: "enemy",
        subtype: "goblin"
    },
    {
        name: "Goblin", 
        index: "goblin4",
        parent: ["enemy"],
        type: "enemy",
        subtype: "goblin"
    },
    {
        name: "Goblin", 
        index: "goblin5",
        parent: ["enemy"],
        type: "enemy",
        subtype: "goblin"
    },
    {
        name: "Goblin", 
        index: "goblin6",
        parent: ["enemy"],
        type: "enemy",
        subtype: "goblin"
    },
    {
        name: "Skeleton", 
        index: "skeleton1",
        parent: ["enemy"],
        type: "enemy",
        subtype: "skeleton"
    }, 
    {
        name: "Skeleton", 
        index: "skeleton2",
        parent: ["enemy"],
        type: "enemy",
        subtype: "skeleton"
    }, 
    {
        name: "Skeleton", 
        index: "skeleton3",
        parent: ["enemy"],
        type: "enemy",
        subtype: "skeleton"
    }, 
    {
        name: "Skeleton", 
        index: "skeleton4",
        parent: ["enemy"],
        type: "enemy",
        subtype: "skeleton"
    }, 
    {
        name: "Zombie", 
        index: "zombie1",
        parent: ["enemy"],
        type: "enemy",
        subtype: "zombie"
    },
    {
        name: "Zombie", 
        index: "zombie2",
        parent: ["enemy"],
        type: "enemy",
        subtype: "zombie"
    },
]