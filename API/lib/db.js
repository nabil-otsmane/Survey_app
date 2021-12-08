const path = require('path');
const fs = require('fs');

/**
 * 
 * @param {Object} options
 * 
 * available options:
 * - path: the path to the directory where database files are located
 * - single_file: true/false put everything in a single file or not.
 * 
 */
function Database(options) {
    this.path = options.path || "./";

    this.single_file = options.single_file || false;

    this.file_name = this.single_file && "db.json";
}

Database.prototype.entity = function(){
    if (this.single_file && !fs.existsSync(this.absolute())) {
        fs.writeFileSync(this.absolute(), "[]");
    }

    return new Entity(this, ...arguments);
}

Database.prototype.absolute = function() {
    if (this.file_name !== false)
        return path.resolve(this.path, this.file_name);
    else 
        return path.resolve(this.path);
}

function Entity(parent, name, schema) {
    this._db = parent;
    this.name = name;

    if (this._db.single_file) {
        this.file_name = this._db.absolute();
    } else {
        this.file_name = path.resolve(this._db.absolute(), name.toLowerCase() + ".json")
    }

    this.schema = { id : "int", ...schema };

    if (!fs.existsSync(this.file_name)) {
        try {
            fs.appendFileSync(this.file_name, "[]");
        } catch (e) {
            console.log(e)
        }
    }
}

Entity.prototype.getContent = function () {
    return JSON.parse(fs.readFileSync(this.file_name).toString());
}

Entity.prototype.saveContent = function (data) {
    fs.writeFileSync(this.file_name, JSON.stringify(data));
}

Entity.prototype.get = function(filter) {
    filter = filter || {};
    // probably not safe to use require directly in here
    let data = this.getContent();

    // some filtering can occur here
    for (let i in filter) {
        data = data.filter(e => e[i] == filter[i]);
    }

    return data;
}

Entity.prototype.add = function(entry) {
    let data = this.getContent();

    let id = data.length > 0? data[data.length - 1].id + 1: 0;

    entry = { ...entry, id };

    data = [ ...data, entry ];

    this.saveContent(data);

    return id;
}

Entity.prototype.alter = function (entry) {
    let data = this.getContent();

    let id = data.findIndex(e => e.id === entry.id);

    if (id === -1) {
        throw "index not found."
    } else {
        data[id] = entry;
    }

    this.saveContent(data);
}

Entity.prototype.remove = function({ id }) {
    let data = this.getContent();

    data = data.filter(e => e.id !== id)

    this.saveContent(data)
}

module.exports = Database;