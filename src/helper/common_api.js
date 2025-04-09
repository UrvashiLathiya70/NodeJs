const fs = require('fs');

exports.getAllData = async (query, model) => {
    const get_data = await model.find(query);
    try {
        return { data: get_data };
    } catch (error) {
        return { error: error };
    }
};

exports.createData = async (body, model, transaction = null) => {
    const newUser = new model(body);
    const userData = await newUser.save();

    try {
        return { data: userData };
    } catch (error) {
        
        return { error: error };
    }
};












