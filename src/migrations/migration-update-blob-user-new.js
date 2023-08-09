
//update type image theo kiểu blob để lưu 
module.exports = {
    up: (queryInterface, Sequelize) => { //thực hiện thay đổi trên db
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', { //table name  //colum
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => { //hoàn tác
        return Promise.all([
            queryInterface.changeColumn('Users', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};