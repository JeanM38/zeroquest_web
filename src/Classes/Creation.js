export class Creation {
    constructor(
        id, 
        author_id,
        title,
        privateC, 
        description,
        notes,
        created_at,
        updated_at,
        enemies,
        traps,
        doors,
        spawns,
        furnitures
    ) {
        this.id = id;
        this.author_id = author_id;
        this.title = title;
        this.privateC = privateC;
        this.description = description;
        this.notes = notes;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.enemies = enemies;
        this.traps = traps;
        this.doors = doors;
        this.spawns = spawns;
        this.furnitures = furnitures
    }
}