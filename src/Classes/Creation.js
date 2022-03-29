export class Creation {
    constructor(
        id, 
        title,
        author,
        isPrivate, 
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
        this.title = title;
        this.author = author;
        this.isPrivate = isPrivate;
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