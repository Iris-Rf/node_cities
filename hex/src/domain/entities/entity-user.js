const bcrypt = require('bcrypt');

module.exports = (db) => {
  const userSchema = new db.Schema(
    {
      name: { type: String, required: true },
      nickname: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String },
      avatar: { type: String },
      role: { type: String, default: 'normal' },
      comments: [{ type: db.Schema.Types.ObjectId, ref: 'Comments' }],
    },
    {
      timestamps: true,
    }
  );

  return db.model('Users', userSchema);
};
