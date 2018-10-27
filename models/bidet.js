module.exports = (sequelize, DataTypes) => {
  const Bidet = sequelize.define("Bidet", {
    buildingName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    toiletType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extraDetails: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
return Bidet;
};
