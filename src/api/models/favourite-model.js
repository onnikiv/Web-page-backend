import promisePool from '../../utils/database.js';

const listAllFavourites = async () => {
  const [rows] = await promisePool.execute(
    'SELECT wsk_favourites.favourite_id, wsk_users.name AS user, wsk_favourites.restaurantid FROM wsk_favourites JOIN wsk_users ON wsk_favourites.user = wsk_users.user_id'
  );
  console.log('rows', rows);
  return rows;
};

const addFavourite = async (favourite) => {
  const {user_id, restaurantid} = favourite;
  const sql = `INSERT INTO wsk_favourites (user, restaurantid) VALUES (?, ?)`;
  const params = [user_id, restaurantid];
  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {favourite_id: rows.insertId};
};

const findFavouriteByUserId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT wsk_favourites.favourite_id, wsk_users.name as "user", wsk_favourites.restaurantid FROM wsk_favourites JOIN wsk_users ON wsk_favourites.user = wsk_users.user_id WHERE wsk_favourites.user = ?',
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const removeFavourite = async (user_id, restaurantid) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_favourites WHERE user = ? AND restaurantid = ?',
    [user_id, restaurantid]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

export {
  listAllFavourites,
  addFavourite,
  findFavouriteByUserId,
  removeFavourite,
};
