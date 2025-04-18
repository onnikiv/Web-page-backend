import promisePool from '../../utils/database.js';

const listAllThumbnails = async () => {
  const [rows] = await promisePool.execute(
    'SELECT wsk_thumbnails.img_id, wsk_thumbnails.user, wsk_thumbnails.filename, wsk_users.name as "user" FROM wsk_thumbnails JOIN wsk_users ON wsk_thumbnails.user = wsk_users.user_id'
  );
  console.log('rows', rows);
  return rows;
};

const findThumbnailByUserId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT wsk_thumbnails.*, wsk_users.name as "user" FROM wsk_thumbnails JOIN wsk_users ON wsk_thumbnails.user = wsk_users.user_id WHERE wsk_thumbnails.user = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addThumbnail = async (thumbnail) => {
  const {user_id, filename} = thumbnail;
  const sql = `INSERT INTO wsk_thumbnails (user, filename) VALUES (?, ?)`;
  const params = [user_id, filename + '_thumb.jpg'];
  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {img_id: rows.insertId};
};

const modifyThumbnail = async (thumbnail, id) => {
  const sql = promisePool.format(
    `UPDATE wsk_thumbnails SET ? WHERE img_id = ?`,
    [thumbnail, id]
  );
  const [rows] = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'Thumbnail updated successfully'};
};

const removeThumbnail = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_thumbnails WHERE img_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

export {
  listAllThumbnails,
  findThumbnailByUserId,
  addThumbnail,
  modifyThumbnail,
  removeThumbnail,
};
