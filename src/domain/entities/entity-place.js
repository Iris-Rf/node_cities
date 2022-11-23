//TODO OK REVISADO
//db es el parametro, que luego será mongoose en nuestro caso

module.exports = (db) => {
  const placeSchema = new db.Schema(
    {
      name: { type: String, required: true, unique: true },
      image: { type: String, required: true },
      comments: [{ type: db.Schema.Types.ObjectId, ref: 'Comments' }],
    },
    {
      timestamps: true,
    }
  );
  return db.model('Places', placeSchema);
};
