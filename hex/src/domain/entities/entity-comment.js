//TODO OK REVISADO

module.exports = (db) => {
  const commentSchema = new db.Schema(
    {
      title: { type: String, required: true },
      text: { type: String, required: true },
      author: {
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return db.model('Comments', commentSchema);
};
