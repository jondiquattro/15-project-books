'use strict';

class SQLModel {
    constructor(schema) {
        this.schema = schema;
    }

    get(_id) {
        //if _id is true qObj = _id else {}
        let queryObject = _id ? {_id} : {};
        return this.schema.find(queryObject);
    }

    post(record) {
        let newRecord = new this.schema(record);
        return newRecord.save();
     
    }

    put(_id, entry) {
        this.schema.findByIdAndUpdate(_id, entry);
    }

    delete(id) {
        this.schema.findByIdAndDelete(_id);
    }
}
module.exports = SQLModel;