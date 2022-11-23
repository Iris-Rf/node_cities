//TODO OK REVISADO

module.exports = (db) => {
  const citySchema = new db.Schema(
    {
      name: { type: String, required: true },
      country: { type: String, required: true },
      population: { type: String, required: true },
      mapImage: { type: String },
      history: { type: String },
      places: [{ type: db.Schema.Types.ObjectId, ref: 'Places' }],
    },
    {
      timestamps: true,
    }
  );
  return db.model('Cities', citySchema);
};
